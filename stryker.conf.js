// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function(config) {
  config.set({
    mutate: ["src/**/*.js?(x)", "!src/**/*@(.test|.spec|Spec).js?(x)"],
    mutator: "javascript",
    testRunner: "mocha",
    testFramework: "mocha",
    reporters: ["progress", "clear-text", "html"],
    coverageAnalysis: "off",
    mochaOptions: {
        spec: ['src/**/*.test.js?(x)'],
        require: [
            '@babel/register',
            './src/helpers.test.js'
        ]
    }
  });
};
