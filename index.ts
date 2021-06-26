export type Picolistener<P = never> = (
	[P] extends [never]
	? () => void
	: [undefined] extends [P]
	? (payload? : P) => void
	: (payload : P) => void
)

export type Picodispatch<P = never> = Picolistener<P>

export type Picobus<P = never> = {
	dispatch: Picodispatch<P>
	listen: (listener : Picolistener<P>) => void
	unlisten: (listener : Picolistener<P>) => void
}

export default function picobus<P = never>() : Picobus<P> {
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
