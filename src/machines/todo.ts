import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQBOAIwUAHLYDMt2wFYA7PdveANgAWfwAaEABPG1dvbwpPAICAJg9XLX97TySAX2zwoRwCEk4JelJGITYwACdq1GqKAwAbFQAzeoBbCgKRYvFaMoqZOQUlU01dcyNYEzVScysEa1cnTwpXJNdMoK0Q708nJyDwqKX7INcKbw20zN2PIPtc-JlC0U5KzFLIVgBharAKjAmHIAHdMMoZFNjOMFogkul4i5bDsjrYtElDsdIjZ7EkghRNkkUgFVhjiZ5XM8QD0imJusMvgMfgARMBNMDKMDQmawpCWRBBAKXfZaLTuA5JAIo1YnaJBNZObzirSeez2Q4ObzU2nvSj-QGqcogsDgyEYCgAZUIqFBUjIBgArspMO1qh1WAAxTqYACSpCdLt+hFw5W5-OmszM-MW1k8a3jWlJKW8QUOTlcrjlCARSXiMXFiTFDgOnh1r169INKikYIhMitNrtxodztdnVYlsdACMOiYeVH5jHEDE1rZpfYNpsvBtsx4KOl1TsPMkNvtyxg3n0KNWjYw6+bUFbcNwpIf2OpKAoBAzN5XOLva6b6xbLSezzJ5KReGM5to9BGMJzHCCDxo4Dh+N4FJaN4KLZtYSSeFoFAoj4QT4ik9j7EEG7CHSD4AjWxoHg2b6nsa541HUDTNG0nS3nheo7oRe4mmapHvhRn6jDW6j-gOfKgIsWwBM4qzSk4mR+I8MTZlKomuJ4jxHFsrhBKiOF5DSFb4ZQbIcqx54cFe378IIOlMfpnIfhgX4-rxEwAYYQHRkJiDnASKROIkOxaPY6Qwdipxxj4FCkmplJbLYSSBAEuFbvSVmGTIrBUfUjQtMobpdLq25JTZqB2YoDn8YBvLAcOCDeXE3iSa4pIqQqATwTFTj5vstguCJTiYmW1KkOgcDmLl9KlFIlQCRVblLO4olQW4qRZAkwrNTiSyYnmqGppOOw+AETxaSNHyMt8ECTa5Ao5pOYWZmKk5+ec+1OPB9UEstaTEjBlIHJpLx3rp1ADONjJpQCZ1lYOIHWDJVxpo9ySkmqqbZmm6yPB5yr2MEARQfF976ixT7sa+Tb2gGbbZedQ7Tf5c3+JJDhChq+3ZrVsMpPVHOHBqVKHRZ26PsRz6Hse5GMIeVMgZSeYJH4BwLUkWG2NmOMLhB8ZIUm4V4wDgv7sLUIQ4Jl3WLB8RIcm-hpocmbwWOWhYv5XhKZstU65Z7LWVxGCS5VgQEsqRxpl4yqPPB6kEhsON4rEKy3O7eWe6xoO+9NSp5ouCroupk7K2t1hYXNaY7CsrWdYECdiKnJsXDVcNCgjqxYUFNjCsh4UKjEaYHGpuS5EAA */
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
            }
          | {
              type: 'Delete';
              todo: string;
            },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
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
            Delete: {
              target: 'Deleting todo',
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
                    actions: 'assignErrorToContext',
                    target: 'Showing input form',
                  },
                ],
              },
            },
          },
        },
        'Deleting todo': {
          invoke: {
            src: 'deleteTodo',
            onDone: [
              {
                target: 'Loading Todos',
              },
            ],
            onError: [
              {
                target: 'Deleting error',
                actions: 'assignErrorToContext',
              },
            ],
          },
        },
        'Deleting error': {},
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
