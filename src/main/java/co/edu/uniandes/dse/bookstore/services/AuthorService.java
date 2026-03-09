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

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.uniandes.dse.bookstore.entities.AuthorEntity;
import co.edu.uniandes.dse.bookstore.entities.BookEntity;
import co.edu.uniandes.dse.bookstore.entities.PrizeEntity;
import co.edu.uniandes.dse.bookstore.exceptions.EntityNotFoundException;
import co.edu.uniandes.dse.bookstore.exceptions.ErrorMessage;
import co.edu.uniandes.dse.bookstore.exceptions.IllegalOperationException;
import co.edu.uniandes.dse.bookstore.repositories.AuthorRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * Service layer for author business logic.
 */

@Slf4j
@Service
public class AuthorService {

	@Autowired
	AuthorRepository authorRepository;
	
	@Transactional
	public AuthorEntity createAuthor(AuthorEntity author_payload) throws IllegalOperationException {
		log.info("Inicia proceso de creación del autor");
		Calendar current_calendar = Calendar.getInstance();
		if(author_payload.getBirthDate().compareTo(current_calendar.getTime()) > 0) {
			throw new IllegalOperationException("Birth date if ater current date");
	    }
		
		return authorRepository.save(author_payload);
	}

	@Transactional
	public List<AuthorEntity> getAuthors() {
		log.info("Inicia proceso de consultar todos los autores");
		return authorRepository.findAll();
	}

	@Transactional
	public AuthorEntity getAuthor(Long authorId) throws EntityNotFoundException {
		log.info("Inicia proceso de consultar el autor con id = {0}", authorId);
		Optional<AuthorEntity> author_entity = authorRepository.findById(authorId);
		if (author_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.AUTHOR_NOT_FOUND);
		log.info("Termina proceso de consultar el autor con id = {0}", authorId);
		return author_entity.get();
	}

	@Transactional
	public AuthorEntity updateAuthor(Long authorId, AuthorEntity author_payload) throws EntityNotFoundException {
		log.info("Inicia proceso de actualizar el autor con id = {0}", authorId);
		Optional<AuthorEntity> author_entity = authorRepository.findById(authorId);
		if (author_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.AUTHOR_NOT_FOUND);
		log.info("Termina proceso de actualizar el autor con id = {0}", authorId);
		author_payload.setId(authorId);
		return authorRepository.save(author_payload);
	}

	@Transactional
	public void deleteAuthor(Long authorId) throws IllegalOperationException, EntityNotFoundException {
		log.info("Inicia proceso de borrar el autor con id = {0}", authorId);
		Optional<AuthorEntity> author_entity = authorRepository.findById(authorId);
		if (author_entity.isEmpty())
			throw new EntityNotFoundException(ErrorMessage.AUTHOR_NOT_FOUND);

		List<BookEntity> book_list = author_entity.get().getBooks();
		if (!book_list.isEmpty())
			throw new IllegalOperationException("Unable to delete the author because he/she has associated books");

		List<PrizeEntity> prize_list = author_entity.get().getPrizes();
		if (!prize_list.isEmpty())
			throw new IllegalOperationException("Unable to delete the author because he/she has associated prizes");

		authorRepository.deleteById(authorId);
		log.info("Termina proceso de borrar el autor con id = {0}", authorId);
	}
}
