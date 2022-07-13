module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
    {
      name: "storybook-addon-sass-postcss",
      options: {
        loadSassAfterPostCSS: true,
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
        rule: {
          test: /\.(scss|sass)$/i,
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
