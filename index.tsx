/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./src/App"
import { name as appName } from "./app.json"

AppRegistry.registerComponent(appName, () => App)

// react-native < 0.71: npx react-native init MyApp --template react-native-template-typescript@6.12.10