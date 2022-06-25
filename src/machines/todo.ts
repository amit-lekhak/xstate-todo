import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQBOAIwUAHLYDMt2wFYA7PdveANgAWfwAaEABPG1dvbwpPAICAJg9XLX97TySAX2zwoRwCEk4JelJGITYwACdq1GqKAwAbFQAzeoBbCgKRYvFaMoqZOQUlU01dcyNYEzVScysEa1cnTwpXJNdMoK0Q708nJyDwqKX7INcKbw20zN2PIPtc-JlC0U5KzFLIVgBharAKjAmHIAHdMMoZFNjOMFogkul4i5bDsjrYtElDsdIjZ7EkghRNkkUgFVhjiZ5XM8QD0imIKP9AapyiCwODIRgKABlQioUFSMgGACuykw7WqHVYADFOpgAJKkYWi36EXDlMDQmawpCWGyeNb6rSklLeIKHJyuVwneEY+IxLSuRJadKZVbU2nvSiMlRSMEQmTc3n8lmCkVizqsLlCgBGHRMmtmZh1ixia1sAQcG02Xg21oQHgoLvO6XTRP27tevXp3uZjD9HNQ3Nw3CkDfY6koCgE3UrdM4Nd9bP9nK5zdbMnkpF4Yzm2j0OumifmycQ+scDj83gpWm8KLz1iSni0FBRPiC+JS9n2QQrGDefQZAJ9LPrAdHLZZbZqdQazTanR7O8q37J9a1Zdk3zHT8J1GH11DnBNtVAFN7ACZxVgzJxMj8R4YjzJJEnWTxHiOLZXCCVEb2pUh0DgcwPQfUopEqRC5jhJZ3DQrc3FSLIEgCR190xJITyCM97HIrQfACJ48hpXtPUA2QvgGSBWKTZD4QkigBLSLQJP084ZKcfdHQJfi0mJHdKQOKiXiAvt+kkFlPm-eo1IXGE2JXJZcKuM0jOSUlPCvbFTjNdZHnOIJvH04IAi3W9hEcx8mUHCCRyDAVFTDcUOnU5dNIQewjSufwsIcIJjJkvNvCcfyUkdRrDnsC0kvvatQPS4dG3fccMAK9jKREhI-AOHikivWw8wSwsN31I8jVJKk5IYzq0pfIcG0GnzrF3eIj2NfwzUOS19zTLQsRKrxiM2N1VoUvodqK6wLjiU0sKqoLVlC-cxOPCydx2LJzlk3IgA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        formInput: '',
      },
      tsTypes: {} as import('./todo.typegen').Typegen0,
      schema: {
        events: {} as
          | {
              type: 'Create new todo';
            }
          | {
              type: 'Form Input Change';
              value: string;
            }
          | {
              type: 'Submit';
            },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
        },
      },
      id: 'Todo Machine',
      initial: 'Loading Todos',
      states: {
        'Loading Todos': {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                actions: 'assignTodosToContext',
                target: 'Todos Loaded',
              },
            ],
            onError: [
              {
                actions: 'assignErrorToContext',
                target: 'Loading Todos errored',
              },
            ],
          },
        },
        'Todos Loaded': {
          on: {
            'Create new todo': {
              target: 'Creating new todo',
            },
          },
        },
        'Loading Todos errored': {},
        'Creating new todo': {
          initial: 'Showing input form',
          states: {
            'Showing input form': {
              on: {
                'Form Input Change': {
                  actions: 'assignFormInputToContext',
                },
                Submit: {
                  target: 'Saving todo',
                },
              },
            },
            'Saving todo': {
              invoke: {
                src: 'saveTodo',
                onDone: [
                  {
                    target: '#Todo Machine.Loading Todos',
                  },
                ],
                onError: [
                  {
                    target: 'Showing input form',
                    actions: 'assignErrorToContext',
                  },
                ],
              },
            },
          },
        },
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
        assignFormInputToContext: assign((context, event) => {
          return {
            formInput: event.value,
          };
        }),
      },
    }
  );
