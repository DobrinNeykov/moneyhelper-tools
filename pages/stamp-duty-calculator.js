import { StampDutyCalculator } from "../components/StampDutyCalculator";

const StampDutyCalculatorPage = ({ serverQuery }) => {
  return <StampDutyCalculator serverQuery={serverQuery} />;
};

export default StampDutyCalculatorPage;

export const getServerSideProps = (context) => {
  return {
    props: {
      serverQuery: context.query,
    },
  };
};
