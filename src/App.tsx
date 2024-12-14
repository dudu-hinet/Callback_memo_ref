/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react"
import {
	Button,
	SafeAreaView,
	Text,
	View,
} from "react-native"

import Forward_Ref_View, { FlatList_Ref } from "./Forward_Ref_View"
import useStateCallback from "./useStateCallback"

// [React.memo, React.useCallback, React.useMemo]https://dev.to/dinhhuyams/introduction-to-react-memo-usememo-and-usecallback-5ei3
const Create_Memo_View: React.FC<{ value: string; onPress?: () => void }> = ({ value, onPress }) => {
	return <Text onPress={onPress}>{`click ${value} times. Now: ${new Date().toISOString()}`}</Text>
}
const Memo_View = React.memo(Create_Memo_View, (prev, next) => {
	return prev.value === next.value && prev.onPress === next.onPress
})

const Forward_Ref_Component = Forward_Ref_View<string>()

export default (): React.ReactElement => {
	const [parent, set_parent] = React.useState(0)

	const [memo_value, set_memo_value] = React.useState(0)

	const [callback_value, set_callback_value] = React.useState(0)
	const [callback_value2, set_callback_value2] = React.useState(0)
	const use_callback = React.useCallback(() => {
		set_callback_value2(callback_value + 1)
	}, [])

	const [use_memo_value, set_use_memo_value] = React.useState(0)
	const use_memo = React.useMemo(() => {
		return use_memo_value
	}, [])


	const Forward_Ref_View_ref = React.useRef<FlatList_Ref<string>>(null)

	const [stateCallback_start, set_stateCallback_start] = useStateCallback("")
	const [stateCallback_finished, set_stateCallback_finished] = React.useState("")

	return (
		<SafeAreaView>
			<Button title={`set parent state: click ${parent} times.`} onPress={() => {
				set_parent(prev => {
					return prev + 1
				})
			}} />

			{/* React.memo: not re-render by parent state. */}
			<View style={{ alignItems: "center", marginTop: 20, }}>
				<Button title={`set memo state: click ${memo_value} times.`} onPress={() => {
					set_memo_value(prev => {
						return prev + 1
					})
				}} />
				<Text>not re-render by parent state.</Text>
				<Memo_View value={`${memo_value}`} />
			</View>

			{/* React.useCallback: keep callback if dependency not changed. */}
			<View style={{ alignItems: "center", marginTop: 20, }}>
				<Button title={`set useCallback state: click ${callback_value} times.`} onPress={() => {
					set_callback_value(prev => {
						return prev + 1
					})
				}} />
				<Memo_View value={`with useCallback click change once: ${callback_value2}`} onPress={use_callback} />
			</View>

			{/* React.useMemo: keep value if dependency not changed. */}
			<View style={{ alignItems: "center", marginTop: 20, }}>
				<Button title={`set useMemo state: click ${use_memo_value} times.`} onPress={() => {
					set_use_memo_value(prev => {
						return prev + 1
					})
				}} />
				<Memo_View value={`click times unchange: ${use_memo}`} />
			</View>

			{/* Forward Ref & Custom method */}
			<View style={{ alignItems: "center", marginTop: 20, }}>
				<Button title={"forward ref custom_scroll"} onPress={() => {
					Forward_Ref_View_ref.current?.custom_scroll()
				}} />
				<Forward_Ref_Component
					data={["0", "1", "2"]}
					ref={Forward_Ref_View_ref}
					style={{ height: 35 }}
					renderItem={item => {
						return <Text>{item.item}</Text>
					}}
				/>
			</View>

			<View style={{ alignItems: "center", marginTop: 20, }}>
				<Button title={"useStateCallback"} onPress={() => {
					set_stateCallback_start(prev => {
						return new Date().toISOString()
					}, (s) => {
						set_stateCallback_finished(`start: ${s}\n finished: ${new Date().toISOString()}`)
					})
				}} />
				<Text>{stateCallback_finished}</Text>
			</View>
		</SafeAreaView>
	)
}
