import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import H1 from "../components/H1";

import CompareAccounts from "../components/CompareAccounts";

import hydrateAccountsFromJson from "../components/CompareAccounts/hydrateAccountsFromJson";
import findAccounts from "../components/CompareAccounts/findAccounts";
import calculatePagination from "../components/CompareAccounts/calculatePagination";
import pageFilters from "../components/CompareAccounts/pageFilters";

const Page = ({ accounts, totalItems }) => {
  return (
    <div>
      <Head>
        <title>Compare Accounts - MoneyHelper Tools</title>
        <meta name="description" content="MoneyHelper Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <H1>Compare Accounts</H1>

      <Content>
        <CompareAccounts accounts={accounts} totalItems={totalItems} />
      </Content>

      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const fs = require("fs");

  const data = await fs.readFileSync("./accounts.json", {
    encoding: "utf8",
    flag: "r",
  });
  const allAccounts = hydrateAccountsFromJson(JSON.parse(data));

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

export default Page;
