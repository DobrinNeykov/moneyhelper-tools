import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
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
