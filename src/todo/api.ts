export interface Todo {
  id: number;
  description: string;
}

export const update = async (todoId: number, changes: Partial<Todo>) => {
  const response = await fetch(`/api/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });

  return await response.json();
};
