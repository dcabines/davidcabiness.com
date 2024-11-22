import type { APIContext } from "astro";

export async function GET({ params, request }: APIContext) {
  return new Response(
    JSON.stringify({
      name: "David Cabiness",
      url: "google.com",
    }),
  );
}
