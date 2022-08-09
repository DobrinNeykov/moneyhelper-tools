import CompareAccounts from "../components/CompareAccounts";

const CompareAccountsPage = ({ serverQuery }) => {
  return <CompareAccounts serverQuery={serverQuery} />;
};

export default CompareAccountsPage;

export const getServerSideProps = (context) => {
  return {
    props: {
      serverQuery: context.query,
    },
  };
};
