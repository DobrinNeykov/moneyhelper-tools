import React from "react";

import { CompareAccounts } from "../components/CompareAccounts";

export default {
  title: "Calculators/CompareAccounts",
  component: CompareAccounts,
  argTypes: {},
};

const Template = (args) => <CompareAccounts {...args} />;

export const Default = Template.bind({});
Default.args = {
  accounts: [...Array(200).keys()].map((i) => ({
    name: "High Street Bank " + i,
  })),
};
