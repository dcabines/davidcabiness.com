import type { APIContext } from "astro";

export async function GET({ locals, params }: APIContext) {
  const { oltp } = locals.runtime.env;
  const sql = "select * from todo where id = ?1";
  const todos = await oltp.prepare(sql).bind(params.id).all();
  const todo = todos.results[0];

  if (!todo) {
    return new Response(null, { status: 404 });
  }

  const body = JSON.stringify(todos.results[0]);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(body, options);
}

export async function DELETE({ locals, params }: APIContext) {
  const { oltp } = locals.runtime.env;
  const sql = "delete from todo where id = ?1";
  await oltp.prepare(sql).bind(params.id).all();
}

export async function PUT({ locals, params, request }: APIContext) {
  const { oltp } = locals.runtime.env;
  const { description } = await request.json();
  console.log(description);
  const sql = "update todo set description = '?1' where id = ?2";
  await oltp.prepare(sql).bind(description, params.id).all();
}
