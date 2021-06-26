# picobus
Tiniest event bus possible, type-safe

```ts
// common base
import picobus from `picobus`
const bus = picobus<PayloadType>()

// subscriber
const callback = payload => handle(payload)
bus.listen(callback)
//…later, when it's not needed anymore
bus.unlisten(callback)

// publisher
bus.dispatch(payload)
```

Create a new bus for every event type:
```ts
const localeBus = picobus<Locale>()
const themeBus = picobus<Theme>()
const currentUserBus = picobus<UserData>()
```


## Type Checking

### Base case
```ts
const bus = picobus<boolean>()

bus.dispatch(true) // works
bus.dispatch(null) // TS error: Argument of type 'null' is not assignable to parameter of type 'boolean'.
bus.dispatch() // TS error: Expected 1 arguments, but got 0.
```

### No payload
```ts
const bus = picobus()

bus.dispatch() // works
bus.dispatch(false) // TS error: Expected 0 arguments, but got 1.
bus.dispatch(null) // TS error: Expected 0 arguments, but got 1.
```

### Optional payload
```ts
const bus = picobus<boolean | undefined>()

bus.dispatch(true) // works
bus.dispatch() // works
bus.dispatch(null) // TS error: Argument of type 'null' is not assignable to parameter of type 'boolean'.
```

### Typing the Consumer
```ts
import { Picobus } from `picobus`

function consumeBus (bus : Picobus<boolean>) {
	bus.listen(payload => {
		// payload is now correctly typed 👍
		handleBoolean(payload)
	})
}
```

You can also import `Picolistener` and `Picodispatch`, depending on your use-case.

## Need more features? Get a bigger bus:
+ [nanobus](https://www.npmjs.com/package/nanobus)
+ [mobx](https://www.npmjs.com/package/mobx)
