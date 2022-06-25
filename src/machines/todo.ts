import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQBOAIwUAHLYDMt2wFYA7PdveANgAWfwAaEABPG1dvbwpPAICAJg9XLX97TySAX2zwoRwCEk4JelJGITYwACdq1GqKAwAbFQAzeoBbCgKRYvFaMoqZOQUlU01dcyNYEzVScysEa1cnTwpXJNdMoK0Q708nJyDwqKX7INcKbw20zN2PIPtc-JlC0U5KzFLIVgBharAKjAmHIAHdMMoZFNjOMFogkul4i5bDsjrYtElDsdIjZ7EkghRNkkUgFVhjiZ5XM8QD0imJusMvgMfgARMBNMDKMDQmawpCWRBBAKXfZaLTuA5JAIo1YnaJBNZObzirSeez2Q4ObzU2nvSj-QGqcogsDgyEYCgAZUIqFBUjIBgArspMO1qh1WAAxTqYACSpCdLt+hFw5W5-OmszM-MW1k8a3jWlJKW8QUOTlcrjlCARSXiMXFiTFDgOnh1r169INKikYIhMitNrtxodztdnVYlsdACMOiYeVH5jHEDE1rZpfYNpsvBtsx4KOl1TsPMkNvtyxg3n0KNWjYw6+bUFbcNwpIf2OpKAoBAzN5XOLva6b6xbLSezzJ5KReGM5to9BGMJzHCCDxo4Dh+N4FJaN4KLZtYSSeFoFAoj4QT4ik9j7EEG7CHSD4AjWxoHg2b6nsa541HUDTNG0nS3nheo7oRe4mmapHvhRn6jDW6j-gOfKgIsWwBM4qzSk4mR+I8MTZlKomuJ4jxHFsrhBKiOF5DSFb4ZQbIcqx54cFe378IIOlMfpnIfhgX4-rxEwAYYQHRkJiDnASKROIkOxaPY6Qwdipxxj4FCkmplJbLYSSBAEuFbvSVmGTIrBUfUjQtMobpdLq25JTZqB2YoDn8YBvLAcOCDeXE3iSa4pIqQqATwTFTj5vstguCJTiYmWWm5Yl7LWcaaXVKwFiwMoQIULgrRctUAAUiFigAlKwA2cPlI21PUAkVW5CBCshwqTp4-gZvYPnwXinlTuOZLEohVL9RZeVDaxo2dgYYCQJgjoGHtrkCgg9WieiiTuGKIRCgk8GpmFQSxLsARaC4mSbLkWmkOgcDmBt-SSMalSA0OB3LOOVwpO4bhZAkwrNTiSyYnmqGppOOw+AETwvXeukMbATJ0JAJMgUkk5hZmYqTn55xc048H1QSdNpMSMGUgcmkvLzTGlFInyjcLZWDiB1gyVcaay8kpJqqm2Zpusjwecql1ClB8X3vqLFPuxr5NvaAZttlIuVf5omwbVfiyxqXPZrV5tU8kbiHBqz1a4x26PsRz6Hse5GMIewcHZSeYJH4BxuNFWG2NmARxIumSJkm4Xu3zmf7tnUJG4JwPWLB8RIcm-hpocmbwWOqNHP5XhKZsqwt5Z70FYXwOBASypHGmXjKo88HqQSGy13isQrLc89vQZUijcvizjiXiFKZk9WXdXjPWFhFAastl1ZKpLtn2I18bAXBqhbIUVtVhYSCjYYUx0MwKhiGmA4alMbZCAA */
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
            }
          | {
              type: 'Speed up';
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
                actions: 'assignErrorToContext',
                target: 'Deleting error',
              },
            ],
          },
        },
        'Deleting error': {
          after: {
            '2500': {
              target: 'Todos Loaded',
            },
          },
          on: {
            'Speed up': {
              target: 'Todos Loaded',
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
