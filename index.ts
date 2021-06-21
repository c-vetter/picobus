type Picolistener<P> = (
	[P] extends [undefined]
	? () => void
	: (payload : P) => void
)

type Picobus<P> = {
	dispatch: Picolistener<P>
	listen: (listener : Picolistener<P>) => void
	unlisten: (listener : Picolistener<P>) => void
}

export default function picobus<P = undefined>() : Picobus<P> {
	const listeners = new Set<Picolistener<P>>()

	const dispatch = ( // need to assert here because the potentially ignored argument makes problems otherwise
		(payload) => listeners.forEach(listener => listener(payload))
	) as Picolistener<P>

	const listen =
	(listener : Picolistener<P>) => listeners.add(listener)

	const unlisten =
	(listener : Picolistener<P>) => listeners.delete(listener)

	return {
		dispatch,
		listen,
		unlisten,
	}
}
