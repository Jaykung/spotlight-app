const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidPackaging(config) {
  return withAppBuildGradle(config, (modConfig) => {
    modConfig.modResults.contents += `
android {
    packaging {
        resources {
            excludes += "META-INF/versions/9/OSGI-INF/MANIFEST.MF"
        }
    }
}
`;
    return modConfig;
  });
};
