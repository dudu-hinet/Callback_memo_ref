import React from "react"

type SetStateActionCallback<S> = S | ((prevState: S) => S)

// https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react
export default <S,>(initialState: S | (() => S))
	: [S, (state: SetStateActionCallback<S>, cb?: (state: S) => void) => void] => {
	const [state, setState] = React.useState(initialState)
	const cbRef = React.useRef<((state: S) => void) | undefined>(undefined)

	const setStateCallback = React.useCallback((state: SetStateActionCallback<S>, cb?: (state: S) => void) => {
		cbRef.current = cb
		setState(state)
	}, [])

	React.useEffect(() => {
		// cb.current is `undefined` on initial render, so we only invoke callback on state *updates*
		if (!!cbRef.current) {
			cbRef.current(state)
			cbRef.current = undefined	// reset callback after execution
		}
	}, [state])

	return [state, setStateCallback]
}
