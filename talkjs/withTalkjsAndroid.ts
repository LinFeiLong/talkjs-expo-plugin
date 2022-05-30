import { ConfigPlugin, withProjectBuildGradle } from '@expo/config-plugins'

// import { TalkjsPluginProps } from '../types/types'

function addTalkjsDefaultConfigBlock(
  buildGradle: string
  // props: TalkjsPluginProps
) {
  const pattern = /talkjs-plugin-default-config/g
  if (buildGradle.match(pattern)) {
    return buildGradle
  }

  return buildGradle.replace(
    /allprojects\s{\r\n\s{4}repositories\s{/,
    `allprojects {
    repositories {
        // talkjs-plugin-default-config
        maven {
          url "$rootDir/../node_modules/@notifee/react-native/android/libs"
        }`
  )
}

export const withTalkjsAndroid: ConfigPlugin<any> = (
  config
  // props
) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addTalkjsDefaultConfigBlock(
        config.modResults.contents
        // props
      )
    } else {
      throw new Error(
        "Cannot add TalkJS maven gradle because the project build.gradle is not groovy"
      )
    }
    return config
  })
}
