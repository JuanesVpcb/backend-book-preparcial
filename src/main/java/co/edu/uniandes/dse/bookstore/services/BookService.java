/*
MIT License

Copyright (c) 2021 Universidad de los Andes - ISIS2603

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

package co.edu.uniandes.dse.bookstore.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.uniandes.dse.bookstore.entities.AuthorEntity;
import co.edu.uniandes.dse.bookstore.entities.BookEntity;
import co.edu.uniandes.dse.bookstore.entities.EditorialEntity;
import co.edu.uniandes.dse.bookstore.exceptions.EntityNotFoundException;
import co.edu.uniandes.dse.bookstore.exceptions.ErrorMessage;
import co.edu.uniandes.dse.bookstore.exceptions.IllegalOperationException;
import co.edu.uniandes.dse.bookstore.repositories.BookRepository;
import co.edu.uniandes.dse.bookstore.repositories.EditorialRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * Service layer for book business logic.
 */
@Slf4j
@Service
public class BookService {

	@Autowired
	BookRepository bookRepository;

	@Autowired
	EditorialRepository editorialRepository;
	
	@Transactional
	public BookEntity createBook(BookEntity book_entity) throws EntityNotFoundException, IllegalOperationException {
		log.info("Inicia proceso de creación del libro");
		
		if (book_entity.getEditorial() == null)
			throw new IllegalOperationException("Editorial is not valid");
		
		Optional<EditorialEntity> editorial_entity = editorialRepository.findById(book_entity.getEditorial().getId());
		if (editorial_entity.isEmpty())
			throw new IllegalOperationException("Editorial is not valid");

		if (!validate_isbn(book_entity.getIsbn()))
			throw new IllegalOperationException("ISBN is not valid");

		if (!bookRepository.findByIsbn(book_entity.getIsbn()).isEmpty())
			throw new IllegalOperationException("ISBN already exists");

		book_entity.setEditorial(editorial_entity.get());
		log.info("Termina proceso de creación del libro");
		return bookRepository.save(book_entity);
	}

	@Transactional
	public List<BookEntity> getBooks() {
		log.info("Inicia proceso de consultar todos los libros");
		return bookRepository.findAll();
	}

	@Transactional
	public BookEntity getBook(Long bookId) throws EntityNotFoundException {
		log.info("Inicia proceso de consultar el libro con id = {0}", bookId);
		Optional<BookEntity> book_entity = bookRepository.findById(bookId);
		if (book_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.BOOK_NOT_FOUND);
		log.info("Termina proceso de consultar el libro con id = {0}", bookId);
		return book_entity.get();
	}

	@Transactional
	public BookEntity updateBook(Long bookId, BookEntity book_payload)
			throws EntityNotFoundException, IllegalOperationException {
		log.info("Inicia proceso de actualizar el libro con id = {0}", bookId);
		Optional<BookEntity> book_entity = bookRepository.findById(bookId);
		if (book_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.BOOK_NOT_FOUND);

		if (!validate_isbn(book_payload.getIsbn()))
			throw new IllegalOperationException("ISBN is not valid");

		book_payload.setId(bookId);
		log.info("Termina proceso de actualizar el libro con id = {0}", bookId);
		return bookRepository.save(book_payload);
	}

	@Transactional
	public void deleteBook(Long bookId) throws EntityNotFoundException, IllegalOperationException {
		log.info("Inicia proceso de borrar el libro con id = {0}", bookId);
		Optional<BookEntity> book_entity = bookRepository.findById(bookId);
		if (book_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.BOOK_NOT_FOUND);

		List<AuthorEntity> author_list = book_entity.get().getAuthors();

		if (!author_list.isEmpty())
			throw new IllegalOperationException("Unable to delete book because it has associated authors");

		bookRepository.deleteById(bookId);
		log.info("Termina proceso de borrar el libro con id = {0}", bookId);
	}

	private boolean validate_isbn(String isbn) {
		return !(isbn == null || isbn.isEmpty());
	}
}
