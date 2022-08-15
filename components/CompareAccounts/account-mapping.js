const accountTypes = [
  {
    nameInDefaqtoAPI: "standard",
    label: "Standard current",
  },
  {
    nameInDefaqtoAPI: "fee free basic account",
    label: "Fee-free basic bank",
  },
  {
    nameInDefaqtoAPI: "student",
    label: "Student",
  },
  {
    nameInDefaqtoAPI: "premier",
    label: "Premier",
  },
  {
    nameInDefaqtoAPI: "e-money account",
    label: "E-money",
  },
  {
    nameInDefaqtoAPI: "added value",
    label: "Packaged",
  },
  {
    nameInDefaqtoAPI: "young person",
    label: "Children's and young person's (under 18)",
  },
  {
    nameInDefaqtoAPI: "graduate",
    label: "Graduate",
  },
];

const listAccountTypes = () => {
  return accountTypes.map((at) => at.label);
};

const listAccountFeatures = () => {
  return [
    "Cheque book available",
    "No monthly fee",
    "Open to new customers",
    "Overdraft facilities",
    "Supports 7-day switching",
  ];
};

const listAccountAccess = () => {
  return [
    "Branch banking",
    "Internet banking",
    "Mobile app banking",
    "Post Office banking",
  ];
};

const accountTypeLabelFromDefaqtoAccountType = (nameInDefaqtoAPI) => {
  const label = accountTypes.filter(
    (a) => a.nameInDefaqtoAPI === nameInDefaqtoAPI
  )[0].label;

  if (label) {
    return label;
  } else {
    throw "no label for defaqto account type '" + nameInDefaqtoAPI + "'";
  }
};
export {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
  accountTypeLabelFromDefaqtoAccountType,
};
