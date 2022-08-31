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
    label: "Children/young person",
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
    "7-day switching",
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
  const accountType = accountTypes.filter(
    (a) => a.nameInDefaqtoAPI === nameInDefaqtoAPI
  )[0];

  if (accountType) {
    return accountType.label;
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
