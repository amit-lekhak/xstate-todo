import { assign, createMachine } from 'xstate';

export const TodoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQBOAIwUA7ADYt9gEwBWF14AsAMx+tgAcLgA0IACeNgFOThQ+Lh62tgFatk72Xh4AvrmRQjgEJJwS9KSMQmxgAE61qLUUBgA2KgBmjQC2FEUipeK0FVUycgpKppq65kawJmqk5lYI1gEhXhQBHgHZflrBTl4hIX6RMSv2gc5b6dn7qX72+YUyxaKc1ZjlkKwAwrVgFRgTDkADumGUMhmxkmS0QHgyiRCDy0J1sWg8x1O0Rsnj8FG2HhSLnWGKJXgCzxAfRKYl6oy+Qx+ABEwC0wMowNC5rCkJZEH4XPjsvZUgE4loMakzrEjhQtC4XDtHplBftKQVqa9+nT-oDVJUQWBwZCMBQAMqEVCgqRkAwAV2UmE6tS6rAAYt1MABJUgOp2-Qi4SpcvmzeZmPnLaz2fYUdZrZFhNJhEkyhB+InOWyZkKohzrXx+Kk096UPUqKRgiEyC1Wm2Gu2O53dVjm+0AIy6Jm5EcWUcQWxcFEVXls3iCXi04oiOIQO1smz8ITWORCWScQScJe1tM4FYNjGrptQFtw3CkJ-Y6koCgE9IwbwGFAPVeNNbN5vPl5k8lIvAmBZtD0MMYQWOELniAl12OJMAhzdEPHTGNhw8exkUxR5xWRLRt01Utn1fQ1j1rL8L0NK86gaJpWg6boH2EPdywBStiPfE8z3IxgTz-ADK3UYDe15UBlg8FwEiODxgk8LwnD8QJ02XYcXHsS5MTcQIQmyHdHx1ThWXZQ8P1Qa9ODvQRdzLCgDI5H8MF4xR+KmEDDDAyMRMQS58RSVM9ncDJcOxc5rC8WSRxXPwKQXDxXBcHTGKsmyjMo+pGmaNplBdHoCLpJK7NQBzAIE6ZQJ5cCBwQMIEicLSAhJE5J1nYKYpCRI4jHZEdhJTEvHip9crZWzDSoxo2wMMBIEwe0DCE8qPIzFcKEFFTtljWT1ik5CnC0EdMTWexExzHI4vwyznzy4bUtqVgLFgZQgQoXB2k5WoAApvElABKVgcv0wajJG2pZvc-kEGSDZMwnBMp3FZDRQSZcHHg+wnHRdF7BOzVSHQOBzF+wZJENapgf7ebVlsYcnBSZGSSVOSkLnaw9kXJIUikrI-CyEI+r0iyWEZOhIBJiD4YoWwjnErzOeWpxkLq-EknSIlcIpMceaY6ghikT5AaF0q+wgpmDucZdLkVMT1hRoKBVaoJVPk7aMcFKn1asoij3Y0j61tP1myy4WKrC4JBU8bwMfXQ4vHTFJF0ldw8yOZdyWLU7dI192jRNUjvwoqF9eE0HlwCAkjkOBEHdFClo-XJcV1SVGMYyV3CJYoySIwAOyc8VqE2OUIXBTRUQmjy5a8ipWfE5urm4Gwz8s70HXHxbaTkR2T9nsZD5PxIcshizcV3cGe-rny7qIX5YKY8RJvH8bI6ox2w4YSdCPoxnIdi6lOXjTssL5sQI1VTbLQtl4K2yElQ7RJJOQ4WlxLi3yPkIAA */
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
                cond: 'has todos',
                target: 'Todos Loaded',
              },
              {
                target: 'Creating new todo',
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
      guards: {
        'has todos': (context, event) => {
          return event.data.length > 0;
        },
      },
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
