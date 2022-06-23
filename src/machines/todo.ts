import { createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxDXQ0+qrJgMoBXfPjjwkIAA69iAF2KpSiUAA9EAWgAsAJgqaArADYAnAGYADKc0WLARmOaANCACeG7QHZzegx-3n9TXNgww8AXzDnZiw8IjJKDnpSRmi2RK5UzABRACcc1BzlKRl5RSK1BHVTAA59ClNtU1tA801jP2rqp1cNW2sKDwa7fzaHWwjIkFJ0OCLonAIScmpaJJSecVBpWDkFJQkKqurDCmrB5uaPQ1tDQ1bnN0rPE4d9Dsb9U2NtbQiongWcWWmUSkCK212ZQOiHsdT6Oia5maQX0tlMD3cVwor3epk+31+k3msSWCVWGQ2mDAeQKYIkENK+1UGk0aIGmmqfVu2kMtVsHm6jw59VZ8K8N00oUJ-wwgNJ4JKe3KLNMHnZnMlhh5fIFGMqVmM2IMnN5d05nQmYSAA */
  createMachine(
    {
      schema: {
        events: {} as
          | { type: 'Loading Todos Success'; todos: string[] }
          | { type: 'Loading Todos Error'; errorMessage: string },
      },
      tsTypes: {} as import('./todo.typegen').Typegen0,
      id: 'Todo Machine',
      initial: 'Loading Todos',
      states: {
        'Loading Todos': {
          on: {
            'Loading Todos Success': {
              target: 'Todos Loaded',
              actions: 'LogTodos',
            },
            'Loading Todos Error': {
              target: 'Loading Todos errored',
            },
          },
        },
        'Todos Loaded': {},
        'Loading Todos errored': {},
      },
    },
    {
      actions: {
        LogTodos: (context, events) => {
          alert(JSON.stringify(events.todos));
        },
      },
    }
  );
