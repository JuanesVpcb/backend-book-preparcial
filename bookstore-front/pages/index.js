import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/authors");
  }, [router]);

  return <p>Redirigiendo</p>;
}

