import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQAWAEwVbAVgBsATgDMWz7e-eARndbABoQAE8bewB2LScXaOctZ1stNNdogF9MsKEcAhJOCXpSRiE2MAAnStRKigMAGxUAM1qAWwo8kULxWhKymTkFJVNNXXMjWBM1UnMrBGtPAA5nCk97TwCUrVt3RKWl0IibAL8KaPXApN3ggOzcmXzRTnLMYshWAGFKsBUwTHIAHdMMoZBNjKM5oh7Fp3BRnEt3MEtId3Fp7AcjpEFgF7LYKBt7PZ3K4Vuiic5PPcQF0CmIKN9fqpSgCwMDQRgKABlQioQFSMgGACuykwrUqbVY6gAYu0AJKkYXKT6EXClMDgqaQpCWRApeGnVz2VzOC6+dG2LHQhznJG49wBVw7XzRLLU0joODmWnPXqSFnlTXTMw6+aLEnnYmeJGeZz2NyuTyuMLY6wYxzBU22ALm02uO45GmPbr017vCBB7WgeZBVYpfOHJbo6KpIIpqLRVzwvxNy22JumnPUn09ah9KSvKo1H4VnWTYOzUM2bOec79w1G0nOAIt9sIftrbOnWyxR22DL2YfFumcRkqKRAkEybm8-kswUisXtSszKEIAKIhQSIeNESygX4vjnnuFwGq6SwbJ2GSUrYV4YE8o53syjCPhyqA-iG1aIN4BrnsapqeOaeJWggcTbnBpq9q456xK4qHCDeGpzhCv5LgsfjRGuSwbsaKw7tRizOKsmYtsESZaIk2TZEAA */
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
            },
        services: {} as {
          loadTodos: {
            data: string[];
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
