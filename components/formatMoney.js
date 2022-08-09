import { toFormat } from "dinero.js";

const formatMoney = (money) => {
  return toFormat(
    money,
    ({ amount, currency }) => `£${amount.toFixed(currency.exponent)}`
  );
};

export default formatMoney;
