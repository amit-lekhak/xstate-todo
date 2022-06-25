// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.Todo Machine.Loading Todos:invocation[0]"
      | "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]"
      | "error.platform.Todo Machine.Deleting todo:invocation[0]";
    assignFormInputToContext: "Form Input Change";
  };
  internalEvents: {
    "done.invoke.Todo Machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo Machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo Machine.Deleting todo:invocation[0]": {
      type: "error.platform.Todo Machine.Deleting todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todo Machine.Deleting todo:invocation[0]": {
      type: "done.invoke.Todo Machine.Deleting todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
    deleteTodo: "done.invoke.Todo Machine.Deleting todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "deleteTodo" | "saveTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos:
      | "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]"
      | "done.invoke.Todo Machine.Deleting todo:invocation[0]";
    deleteTodo: "Delete";
    saveTodo: "Submit";
  };
  eventsCausingGuards: {
    "has todos": "done.invoke.Todo Machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Loading Todos"
    | "Todos Loaded"
    | "Loading Todos errored"
    | "Creating new todo"
    | "Creating new todo.Showing input form"
    | "Creating new todo.Saving todo"
    | "Deleting todo"
    | "Deleting error"
    | { "Creating new todo"?: "Showing input form" | "Saving todo" };
  tags: never;
}
