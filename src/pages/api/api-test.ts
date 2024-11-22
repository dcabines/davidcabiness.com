import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
  const myKV = locals.runtime.env.MY_KV;
  const value = await myKV.get("key");

  const oltp = locals.runtime.env.oltp;
  const todos = await oltp.prepare("select * from todo").all();

  const body = JSON.stringify({
    name: "David Cabiness",
    url: "google.com",
    kv: { key: value },
    todos: todos.results,
  });

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(body, options);
}
