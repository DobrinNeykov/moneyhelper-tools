const accountTypes = [
  {
    nameInDefaqtoAPI: "standard",
    label: "Standard current accounts",
  },
  {
    nameInDefaqtoAPI: "fee free basic account",
    label: "Fee-free basic bank accounts",
  },
  {
    nameInDefaqtoAPI: "student",
    label: "Student accounts",
  },
  {
    nameInDefaqtoAPI: "premier",
    label: "Premier accounts",
  },
  {
    nameInDefaqtoAPI: "e-money account",
    label: "Prepaid cards",
  },
  {
    nameInDefaqtoAPI: "added value",
    label: "Packaged accounts",
  },
  {
    nameInDefaqtoAPI: "young person",
    label: "Children's and young person's accounts (under 18)",
  },
  {
    nameInDefaqtoAPI: "graduate",
    label: "Graduate accounts",
  },
];

const listAccountTypes = () => {
  return accountTypes.map((at) => at.label);
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
export { listAccountTypes, accountTypeLabelFromDefaqtoAccountType };
