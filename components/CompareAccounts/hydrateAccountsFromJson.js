import hydrateAccountFromJson from "./hydrateAccountFromJson";

const hydrateAccountsFromJson = (json) => {
  return json.items.map((j) => hydrateAccountFromJson(j));
};

export default hydrateAccountsFromJson;
