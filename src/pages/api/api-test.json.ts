import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
  const myKV = locals.runtime.env.MY_KV;
  const value = await myKV.get("key");

  const oltp = locals.runtime.env.oltp;
  const todos = await oltp.prepare("select * from todo").all();

  return new Response(
    JSON.stringify({
      name: "David Cabiness",
      url: "google.com",
      value,
      todos
    })
  );
}
