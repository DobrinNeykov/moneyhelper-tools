import { dinero, toFormat } from "dinero.js";

const formatMoney = (money) => {
  if (!money) {
    return "";
  }

  return toFormat(
    dinero(money),
    ({ amount, currency }) => `£${amount.toFixed(currency.exponent)}`
  );
};

export default formatMoney;
