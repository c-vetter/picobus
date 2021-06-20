# picobus
Tiniest message bus possible, type-safe

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

Just create a new bus for every message type.

## Need more features? Get a bigger bus:
+ [nanobus](https://www.npmjs.com/package/nanobus)
+ [mobx](https://www.npmjs.com/package/mobx)
