import React from "react"
import { FlatList, FlatListProps, } from "react-native"

interface Props<ItemT> extends FlatListProps<ItemT> {

}
export interface FlatList_Ref<ItemT> extends FlatList<ItemT> {
	custom_scroll: () => void
}
const Component = <ItemT,>(): React.ForwardRefExoticComponent<Props<ItemT> & React.RefAttributes<FlatList_Ref<ItemT> | null>> => {
	// [轉發 refs]https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
	// [Typescript + forwardRef]https://fettblog.eu/typescript-react-generic-forward-refs/
	return React.forwardRef<FlatList_Ref<ItemT> | null, Props<ItemT>>((props, ref) => {
		const { ...others } = props
		const [value, set_value] = React.useState(0)

		// [useImperativeHandle]https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
		const innerRef = React.useRef<FlatList<ItemT>>(null)
		React.useImperativeHandle<FlatList_Ref<ItemT> | null, FlatList_Ref<ItemT> | null>(ref, () => {
			return Object.assign({}, innerRef.current, {
				custom_scroll: () => innerRef.current?.scrollToEnd({ animated: true })
			})
		})

		return <FlatList ref={innerRef} {...others} />
	})
}
export default Component
