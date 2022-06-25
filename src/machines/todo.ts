import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQAWAEwVbAVgBsATgDMWz7e-eARndbABoQAE8bewB2LScXaOctZ1stNNdogF9MsKEcAhJOCXpSRiE2MAAnStRKigMAGxUAM1qAWwo8kULxWhKymTkFJVNNXXMjWBM1UnMrBGtPAA5nCk97TwCUrVt3RKWl0IibAL8KaPXApN3ggOyckFJ0OHMugrFqPqlyieNRuZsnncrnO9i87i8znsblcnlcYUiC3sS0cwWc0VsAV8yWirjuDzeok45UwxUgvym-yQlkQQVWpwcmy0W1SzixCKiuIoaP2G2cQPs9myuRk+SJvUkpWkLEwVRqlXJ1Mm0zM1Pmdix51sS1Orlc9lcKwCGI5CG1a0xDNiAVctgyQoJou6YgpKtmapsfmiWp1dv1hrZJuOC08zlWPN2flcWkS90yQA */
  createMachine(
    {
      tsTypes: {} as import('./todo.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      id: 'Todo Machine',
      initial: 'Loading Todos',
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
      },
      states: {
        'Loading Todos': {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                target: 'Todos Loaded',
                actions: 'assignTodosToContext',
              },
            ],
            onError: [
              {
                target: 'Loading Todos errored',
                actions: 'assignErrorToContext',
              },
            ],
          },
        },
        'Todos Loaded': {},
        'Loading Todos errored': {},
      },
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
      },
    }
  );
