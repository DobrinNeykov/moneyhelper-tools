import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import H1 from "../components/H1";
import StampDutyCalculator from "../components/StampDutyCalculator";

const StampDutyCalculatorPage = ({ serverQuery }) => {
  return (
    <div>
      <Head>
        <title>Stamp Duty Calculator - MoneyHelper Tools</title>
        <meta name="description" content="MoneyHelper Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <H1>Stamp Duty Calculator</H1>

      <Content>
        <StampDutyCalculator serverQuery={serverQuery} />
      </Content>

      <Footer />
    </div>
  );
};

export default StampDutyCalculatorPage;

export const getServerSideProps = (context) => {
  return {
    props: {
      serverQuery: context.query,
    },
  };
};
