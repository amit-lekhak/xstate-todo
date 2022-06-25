import { useMachine } from '@xstate/react';
import { TodoMachine } from './machines/todo';

export default function App() {
  const [machine, send] = useMachine(TodoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('oh nooooo');
        return ['Sleep', 'Eat', 'Sleep'];
      },
    },
  });
  return (
    <div>
      <pre>Hello React, {JSON.stringify(machine.value)}</pre>
      <pre>{JSON.stringify(machine.context)}</pre>

      {machine.matches('Todos Loaded') && (
        <button
          onClick={() => {
            send('Create new todo');
          }}
        >
          Create new todo
        </button>
      )}

      {machine.matches('Creating new todo.Showing input form') && (
        <input
          onChange={(e) => {
            send({
              type: 'Form Input Change',
              value: e.target.value,
            });
          }}
        />
      )}
    </div>
  );
}
