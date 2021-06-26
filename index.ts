export type Picolistener<P> = (
	[P] extends [undefined]
	? () => void
	: [undefined] extends [P]
	? (payload? : P) => void
	: (payload : P) => void
)

export type Picobus<P> = {
	dispatch: Picolistener<P>
	listen: (listener : Picolistener<P>) => void
	unlisten: (listener : Picolistener<P>) => void
}

export default function picobus<P = undefined>() : Picobus<P> {
	const listeners = new Set<Picolistener<P>>()

	const dispatch = (
		// need to annotate the payload because the undefined-typing bauses an implicit any
		(payload : P) => listeners.forEach(listener => listener(payload))
		// need to assert here because the potentially ignored argument makes problems otherwise
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
