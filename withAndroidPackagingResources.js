const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidPackagingResources(config) {
  return withAppBuildGradle(config, (modConfig) => {
    let buildGradle = modConfig.modResults.contents;

    // Check if the modern packaging block is already present
    if (!buildGradle.includes('packaging {') && !buildGradle.includes('packagingOptions {')) {
      // Inject a completely fresh modern packaging configuration into the android block
      const targetString = 'android {';
      const replacement = `android {
    packaging {
        resources {
            excludes += '/META-INF/versions/9/OSGI-INF/MANIFEST.MF'
        }
    }`;
      buildGradle = buildGradle.replace(targetString, replacement);
    } else if (buildGradle.includes('packaging {') && !buildGradle.includes("excludes += '/META-INF/versions/9/OSGI-INF/MANIFEST.MF'")) {
      // If a packaging block exists but lacks this exclusion, inject it inside resources
      if (buildGradle.includes('resources {')) {
        buildGradle = buildGradle.replace(
          'resources {',
          "resources {\n            excludes += '/META-INF/versions/9/OSGI-INF/MANIFEST.MF'"
        );
      } else {
        buildGradle = buildGradle.replace(
          'packaging {',
          "packaging {\n        resources {\n            excludes += '/META-INF/versions/9/OSGI-INF/MANIFEST.MF'\n        }"
        );
      }
    }

    modConfig.modResults.contents = buildGradle;
    return modConfig;
  });
};
