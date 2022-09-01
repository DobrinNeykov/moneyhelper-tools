import hydrateAccountsFromJson from "../components/CompareAccounts/hydrateAccountsFromJson";
import findAccounts from "../components/CompareAccounts/findAccounts";
import calculatePagination from "../components/CompareAccounts/calculatePagination";
import pageFilters from "../components/CompareAccounts/pageFilters";
import cacheData from "memory-cache";

const compareAccountsGetServerSideProps = async (context) => {
  const fetchWithCache = async (url, options) => {
    const value = cacheData.get(url);
    if (value) {
      return value;
    } else {
      const hours = 12;
      const response = await fetch(url, options);
      const data = await response.json();
      cacheData.put(url, data, hours * 1000 * 60 * 60);
      return data;
    }
  };

  const jsonAccounts = await fetchWithCache(process.env.ACCOUNTS_API);
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
