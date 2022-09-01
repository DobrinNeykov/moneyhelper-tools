import CompareAccounts from "../../components/CompareAccounts";
import compareAccountsGetServerSideProps from "../compareAccountsGetServerSideProps";

const Page = ({ accounts, totalItems }) => {
  return <CompareAccounts accounts={accounts} totalItems={totalItems} />;
};

export const getServerSideProps = compareAccountsGetServerSideProps;
export default Page;
