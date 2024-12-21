import React from "react"
import { FlatList, FlatListProps } from "react-native"

// [轉發 refs]https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
// [Typescript + forwardRef + generic]https://oida.dev/typescript-react-generic-forward-refs/
interface Props<ItemT> extends FlatListProps<ItemT> {

}
export interface FlatList_Ref<ItemT> extends FlatList<ItemT> {
	custom_scroll: () => void
}
const Component = <ItemT,>(
	props: Props<ItemT>,
	ref: React.ForwardedRef<FlatList_Ref<ItemT> | null>
) => {
	// [useImperativeHandle]https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
	const innerRef = React.useRef<FlatList<ItemT>>(null)
	React.useImperativeHandle(
		ref,
		() => Object.assign({}, innerRef.current, {
			custom_scroll: () => innerRef.current?.scrollToEnd({ animated: true })
		})
	)
	return <FlatList ref={innerRef} {...props} />
}

// As an argument in `React.forwardRef`
export default React.forwardRef(Component) as <ItemT>(
	props: FlatListProps<ItemT> & { ref?: React.ForwardedRef<FlatList_Ref<ItemT>> }
) => ReturnType<typeof Component>

/*
// [轉發 refs]https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
// [Typescript + forwardRef + generic]https://oida.dev/typescript-react-generic-forward-refs/
declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactElement
	): (props: P & React.RefAttributes<T>) => React.ReactElement
}
interface Props<ItemT> extends FlatListProps<ItemT> {

}
export interface FlatList_Ref<ItemT> extends FlatList<ItemT> {
	custom_scroll: () => void
}
const Component = <ItemT,>(props: Props<ItemT>, ref: React.ForwardedRef<FlatList_Ref<ItemT> | null>) => {
	// [useImperativeHandle]https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
	const innerRef = React.useRef<FlatList<ItemT>>(null)
	React.useImperativeHandle(
		ref,
		() => Object.assign({}, innerRef.current, {
			custom_scroll: () => innerRef.current?.scrollToEnd({ animated: true })
		})
	)
	return <FlatList ref={innerRef} {...props} />
}
export default React.forwardRef(Component)
*/
