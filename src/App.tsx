import { useMachine } from '@xstate/react';
import { TodoMachine } from './machines/todo';

const todos = new Set<string>(['Sleep', 'Eat']);

export default function App() {
  const [state, send] = useMachine(TodoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('oh nooooo');
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.formInput);
      },
      deleteTodo: async (context, event) => {
        throw new Error('ooooohhhh no');
        todos.delete(event.todo);
      },
    },
  });
  return (
    <div>
      <pre>Hello React, {JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>

      {state.matches('Todos Loaded') && (
        <>
          {state.context.todos.map((td) => {
            return (
              <div key={td} style={{ display: 'flex' }}>
                <p>{td}</p>
                <button
                  onClick={() => {
                    send({
                      type: 'Delete',
                      todo: td,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </>
      )}

      {state.matches('Todos Loaded') && (
        <button
          onClick={() => {
            send('Create new todo');
          }}
        >
          Create new todo
        </button>
      )}

      {state.matches('Creating new todo.Showing input form') && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send({
              type: 'Submit',
            });
          }}
        >
          <input
            onChange={(e) => {
              send({
                type: 'Form Input Change',
                value: e.target.value,
              });
            }}
          />
        </form>
      )}

      {state.matches('Deleting error') && (
        <button onClick={() => send('Speed up')}>Speed up</button>
      )}
    </div>
  );
}
