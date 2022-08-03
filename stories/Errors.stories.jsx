import React from "react";

import { Errors } from "../components/Errors";
import { MoneyInput } from "../components/MoneyInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Errors",
  component: Errors,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <Errors {...args}>
    <MoneyInput />
  </Errors>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  errors: ["value is required"],
};
