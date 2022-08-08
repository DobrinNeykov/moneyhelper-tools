import { CompareAccounts } from "../components/CompareAccounts";

const CompareAccountsPage = ({ serverQuery }) => {
  return (
    <CompareAccounts
      page={serverQuery.p ? parseInt(serverQuery.p) : 1}
      query={serverQuery.q}
    />
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
