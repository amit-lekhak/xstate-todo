import { useMachine } from '@xstate/react';
import { TodoMachine } from './machines/todo';

export default function App() {
  const [machine] = useMachine(TodoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('oh nooooo');
        return ['Sleep', 'Eat', 'Sleep'];
      },
    },
  });
  return (
    <div className='App'>
      <h1>
        <pre>Hello React, {machine.value}</pre>
        <pre>{JSON.stringify(machine.context)}</pre>
      </h1>
    </div>
  );
}
