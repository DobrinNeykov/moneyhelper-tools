import React from "react";

import Pagination from "../components/Pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  page: 1,
  totalPages: 10,
  previousEnabled: false,
  nextEnabled: true,
  setPageHref: (page) => "?page=" + page,
};

export const Paging = Template.bind({});
Paging.args = {
  page: 45,
  totalPages: 150,
  previousEnabled: true,
  nextEnabled: true,
  setPageHref: (page) => "?page=" + page,
};

export const NoNextButton = Template.bind({});
NoNextButton.args = {
  page: 45,
  totalPages: 45,
  previousEnabled: true,
  nextEnabled: false,
  setPageHref: (page) => "?page=" + page,
};

export const NoPreviousButton = Template.bind({});
NoPreviousButton.args = {
  page: 1,
  totalPages: 45,
  previousEnabled: false,
  nextEnabled: true,
  setPageHref: (page) => "?page=" + page,
};
