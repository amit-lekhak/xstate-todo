// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos: "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "Loading Todos" | "Todos Loaded" | "Loading Todos errored";
  tags: never;
}
