import type { APIContext } from "astro";

export async function GET({ locals, params }: APIContext) {
  const { oltp } = locals.runtime.env;
  const sql = "select * from todo where id = ?";
  const todo = await oltp.prepare(sql).bind(params.id).first();

  if (!todo) {
    return new Response(null, { status: 404 });
  }

  const body = JSON.stringify(todo);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(body, options);
}

export async function DELETE({ locals, params }: APIContext) {
  const { oltp } = locals.runtime.env;
  const sql = "delete from todo where id = ?";
  await oltp.prepare(sql).bind(params.id).run();

  return new Response();
}

export async function PUT({ locals, params, request }: APIContext) {
  const { oltp } = locals.runtime.env;
  const { description } = await request.json();
  const sql = "update todo set description = ? where id = ?";
  await oltp.prepare(sql).bind(description, params.id).run();

  return new Response();
}
