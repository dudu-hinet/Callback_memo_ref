/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// [fix: too many open files, watch]https://github.com/expo/expo/issues/29083
const exclusionList = require('metro-config/src/defaults/exclusionList')
module.exports = {
	resolver: {
		blacklistRE: exclusionList([
			// /node_modules\/.*/,
			/android\/.*/,
			/ios\/.*/
		]),
	},
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
}
