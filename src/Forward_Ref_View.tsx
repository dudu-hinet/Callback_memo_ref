import React from "react"
import { FlatList, FlatListProps, } from "react-native"

export interface Props<ItemT> extends FlatListProps<ItemT> {
	ref?: React.RefObject<FlatList<ItemT>>
}
const Component = <ItemT,>(): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props<ItemT>> & React.RefAttributes<FlatList<ItemT>>> => {
	// [轉發 refs]https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
	// [Typescript + forwardRef]https://fettblog.eu/typescript-react-generic-forward-refs/
	return React.forwardRef<FlatList<ItemT>, Props<ItemT>>((props, ref) => {
		const { ...others } = props

		// [useImperativeHandle]https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
		const innerRef = React.useRef<FlatList<ItemT>>(null)
		React.useImperativeHandle(ref, () => {
			return innerRef.current!
		})

		return <FlatList ref={innerRef} {...others} />
	})
}

export default Component
