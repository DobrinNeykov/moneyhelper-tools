import React from "react";
import { faker } from "@faker-js/faker";

import { CompareAccounts } from "../components/CompareAccounts";

export default {
  title: "Calculators/CompareAccounts",
  component: CompareAccounts,
  argTypes: {},
};

const Template = (args) => <CompareAccounts {...args} />;

const productNames = [
  "Student Plus account",
  "Current Rewards account",
  "Basic account",
  "Children's account",
  "Premier Plus Rewards account",
  "Eco Saver Plus account",
  "Current account",
  "Premier account",
  "Basic account",
];

const takeRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

faker.seed(123);

export const Default = Template.bind({});
Default.args = {
  accounts: [...Array(200).keys()].map((i) => ({
    productLandingPageURL: "#",
    providerName: faker.company.companyName(),
    productName: takeRandomItem(productNames),
    monthlyCharge: takeRandomItem([0, 5, 2]),
    minimumMonthlyCredit: takeRandomItem([1200, 0, 1000]),
    unauthODMonthlyCap: takeRandomItem([0, 34.95, 45, 19.99, null]),
    representativeAPR: takeRandomItem([9.99, 0, null, 9.99, 14.99, 29.99]),
  })),
};
