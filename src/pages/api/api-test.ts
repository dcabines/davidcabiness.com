import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
  const { oltp, MY_KV } = locals.runtime.env;

  const value = await MY_KV.get("key");
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
