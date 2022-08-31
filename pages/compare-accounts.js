import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import H1 from "../components/H1";
import CompareAccounts from "../components/CompareAccounts";

const CompareAccountsPage = () => {
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
        <p className="text-lg mb-12">
          This tools compares bank accounts in the UK
        </p>
        <CompareAccounts />
      </Content>

      <Footer />
    </div>
  );
};

export default CompareAccountsPage;

export const getServerSideProps = (context) => {
  return {
    props: {},
  };
};
