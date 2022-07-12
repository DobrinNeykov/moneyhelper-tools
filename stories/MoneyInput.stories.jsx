import React from "react";

import { MoneyInput } from "../components/MoneyInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/MoneyInput",
  component: MoneyInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MoneyInput {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Label",
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  errors: ["There is an error"],
};
