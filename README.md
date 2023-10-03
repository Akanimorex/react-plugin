# react-plugin

[Live link](https://react-plugin.vercel.app/)

# WEEK2 THEORY TASKS

## Monday Meeting Tasks

### Can interface/type be used in non typescript react project?

Technically, an interface can't be used in a non typescript react project, but type definitions can be done.

Through the react inbuilt propTypes property, component prop types can be explicitly defined, as well as the `required` status of the prop.

By specifying that a prop is `required`, the dev would receive an error in the console during run-time when an expected prop is missing.

Example:

```
import propTypes from "prop-types";

export const Component = ({prop1, prop2}) => {
// rest of component logic

return <button> ... </button>
}

Component.propTypes = {
    prop1: propTypes.string.required,
    prop2: propTypes.string
}
```

To make known which props are optional, entering a default value to the prop within the component creates a fallback for the prop except dev enters a desired value for a prop with default value.

Example:

```
export const Component = ({prop1 = "hello1", prop2 = "hello2"}) => {
// rest of component logic

return <button> ... </button>
```

In conclusion, getting missing prop errors during run-time isn't the best as such errors can be received during development if it were a typescript project with compulsory prop interfaces.

### Single Transaction Bridge Flow

1. User selects sending and destination chain.
2. Check tokens that can be bridged based on step1.
3. Populate the `from-token-list` and `to-token-list` components with supported tokens for bridging.
4. User selects token to be sent and received.
5. Fetch and display available routes between selected chains using the `quote` endpoint.
6. User selects a route.
7. Check if selected token is an ERC-20 token.
8. Request allowance of spending sending token from user using the `check-allowance` endpoint.
9. If selected token isn't ERC-20, skip step7 and continue.
10. Fetch the `callData` for the route from `/server/build-tx` endpoint to get transaction data.
11. Initiate a contract call to send `callData` to Socket contracts.
12. Socket contract bridges and swaps.
13. Track transaction status using Socket Bridge Status APIs.
