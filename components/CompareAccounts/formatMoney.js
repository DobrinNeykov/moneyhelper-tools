import { toFormat } from "dinero.js";

const formatMoney = (money) => {
  if (!money) {
    return "";
  }

  return toFormat(
    money,
    ({ amount, currency }) => `£${amount.toFixed(currency.exponent)}`
  );
};

export default formatMoney;
