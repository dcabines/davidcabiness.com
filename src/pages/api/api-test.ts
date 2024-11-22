import type { APIContext } from "astro";

export async function GET({ locals, params, request }: APIContext) {
  const myKV = locals.runtime.env.MY_KV;
  const value = await myKV.get("key");

  return new Response(
    JSON.stringify({
      name: "David Cabiness",
      url: "google.com",
      value
    }),
  );
}
