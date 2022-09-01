import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import H1 from "../components/H1";

import CompareAccounts from "../components/CompareAccounts";
import compareAccountsGetServerSideProps from "../components/compareAccountsGetServerSideProps";

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

export const getServerSideProps = compareAccountsGetServerSideProps;
export default Page;
