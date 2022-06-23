import { useMachine } from '@xstate/react';
import { TodoMachine } from './machines/todo';

export default function App() {
  const [machine, send] = useMachine(TodoMachine);
  return (
    <div className='App'>
      <h1>Hello CodeSandbox, {machine.value}</h1>
      <h2>Start clicking to see some magic happen!</h2>
      <button
        onClick={() =>
          send({ type: 'Loading Todos Success', todos: ['Sleep'] })
        }
      >
        Click for mouseover
      </button>
      <button
        onClick={() =>
          send({ type: 'Loading Todos Error', errorMessage: 'Not again !!!' })
        }
      >
        Click for mouseout
      </button>
    </div>
  );
}
