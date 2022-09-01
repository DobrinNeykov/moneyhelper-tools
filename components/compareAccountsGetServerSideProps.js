import hydrateAccountsFromJson from "../components/CompareAccounts/hydrateAccountsFromJson";
import findAccounts from "../components/CompareAccounts/findAccounts";
import calculatePagination from "../components/CompareAccounts/calculatePagination";
import pageFilters from "../components/CompareAccounts/pageFilters";

const compareAccountsGetServerSideProps = async (context) => {
  const response = await fetch(process.env.ACCOUNTS_API);
  const jsonAccounts = await response.json();
  const allAccounts = hydrateAccountsFromJson(jsonAccounts);

  const filters = pageFilters(context);
  const accounts = findAccounts(allAccounts, filters);

  const pagination = calculatePagination({
    page: filters.page,
    totalItems: accounts.length,
  });

  return {
    props: {
      accounts: accounts.slice(pagination.startIndex, pagination.endIndex),
      totalItems: pagination.totalItems,
    },
  };
};
export default compareAccountsGetServerSideProps;
