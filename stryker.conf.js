// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function(config) {
    config.set({
        mutate: ["src/**/*.ts?(x)", "!src/**/*.test.ts?(x)"],
        mutator: "typescript",
        testRunner: "mocha",
        testFramework: "mocha",
        reporters: ["progress", "clear-text", "html"],
        coverageAnalysis: "off",
        tempDirName: "reports/stryker-tmp",
        mochaOptions: {
            spec: ['src/**/*.test.ts?(x)'],
            require: [
                '@babel/register',
                "source-map-support/register",
                './src/helpers.test.ts'
            ]
        }
    });
};
