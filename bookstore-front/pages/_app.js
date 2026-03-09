import { AuthorsProvider } from "../context/AuthorsContext";

export default function MyApp({ Component: PageComponent, pageProps: page_props }) {
  return (
    <AuthorsProvider>
      <PageComponent {...page_props} />
    </AuthorsProvider>
  );
}
