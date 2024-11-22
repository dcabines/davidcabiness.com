import type { APIContext } from "astro";

export async function GET({ locals, params }: APIContext) {
  const { oltp } = locals.runtime.env;
  const todos = await oltp.prepare("select * from todo where id = ?1").bind(params.id).all();
  const body = JSON.stringify(todos.results[0]);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(body, options);
}
