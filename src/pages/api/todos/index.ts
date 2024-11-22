import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
  const { oltp } = locals.runtime.env;
  const todos = await oltp.prepare("select * from todo").all();
  const body = JSON.stringify(todos.results);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(body, options);
}

export async function POST({ locals, request }: APIContext) {
    const { oltp } = locals.runtime.env;
    const { id, status, description, tags } = await request.json();
    const insert = "insert into todo (id, status, description, tags) values (?1, ?2, ?3, ?4)";

    await oltp.prepare(insert).bind(id, status, description, tags).run();

    const body = JSON.stringify({ id, status, description, tags });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Response(body, options);
  }
