import React from "react"
import { Text } from "react-native"

// [Custom method]https://stackoverflow.com/a/70006807
// [Typescript useImperativeHandle]https://wayou.github.io/2021/09/14/_TypeScript__React__useImperativeHandle__%E7%9A%84%E4%BD%BF%E7%94%A8/
interface Props {
    value: string
}
export interface Methods {
    onPress: () => void
}
const Create_View: React.ForwardRefRenderFunction<Methods, Props> = (props, ref) => {
    const [value, set_value] = React.useState(0)
    const onPress = React.useCallback(() => {
        set_value(prev => {
            return prev + 1
        })
    }, [])

    // [useImperativeHandle]https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
    React.useImperativeHandle(ref, () => ({
        onPress,
    }))

    return <Text>{`props: ${props.value}, state: ${value}: ${Date.now()}`}</Text>
}
export default React.forwardRef(Create_View)