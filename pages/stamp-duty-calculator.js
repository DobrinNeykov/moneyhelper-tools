import { StampDutyCalculator } from "../components/StampDutyCalculator";

const SDC = ({ serverQuery }) => {
  return <StampDutyCalculator serverQuery={serverQuery} />;
};

export default SDC;

export const getServerSideProps = (context) => {
  return {
    props: {
      serverQuery: context.query,
    },
  };
};
