import { createMachine } from "xstate";

export const helloMachine = createMachine({
  initial: "hello",
  states: {
    hello: {
      on: {
        mouseover: {
          target: "bye"
        }
      }
    },
    bye: {
      on: {
        mouseout: {
          target: "hello"
        }
      }
    }
  }
});
