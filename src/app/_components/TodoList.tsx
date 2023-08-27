'use client';

import { useState } from 'react';
import { trpc } from '../_trpc/client';

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState<string>('');

  return (
    <div>
      <div>
        {getTodos?.data?.map((todo) => (
          <div key={todo.id}>
            <input
              id={`check-${todo.id}`}
              type='checkbox'
              checked={!!todo.done}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id!!,
                  done: todo.done ? 0 : 1,
                });
              }}
            />

            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <input className='text-black' id='content' value={content} onChange={(e) => setContent(e.target.value)} />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content);
              setContent('');
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
