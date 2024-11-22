import type { APIContext } from "astro";

export async function get({ params, request }: APIContext) {
  return new Response(
    JSON.stringify({
      name: "David Cabiness",
      url: "google.com",
    }),
  );
}
