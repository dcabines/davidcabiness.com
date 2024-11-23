export interface Todo {
  id: number;
  description: string;
  status: string;
  tags: string;
}

const baseUrl = "/api/todos";

export const create = async (changes: Todo) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(changes),
  });

  return await response.json();
};

export const update = async (todoId: number, changes: Partial<Todo>) => {
  const response = await fetch(`${baseUrl}/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });

  return await response.json();
};

export const remove = async (todoId: number) => {
  await fetch(`${baseUrl}/${todoId}`, {
    method: "DELETE"
  });
};
