import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import H1 from "../components/H1";
import CompareAccounts from "../components/CompareAccounts";

const CompareAccountsPage = ({ serverQuery }) => {
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
        <CompareAccounts serverQuery={serverQuery} />
      </Content>

      <Footer />
    </div>
  );
};

export default CompareAccountsPage;

export const getServerSideProps = (context) => {
  return {
    props: {
      serverQuery: context.query,
    },
  };
};
