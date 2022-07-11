export default class StampDuty {
  // price: the price in *pence* of the house
  // buyerType: the type of buyer: ["firstTimeBuyer", "nextHome", "additionalHome"]

  constructor(price, buyerType) {
    this.FIRST_TIME_BUYER_THRESHOLD = 50000000;
    this.SECOND_HOME_THRESHOLD = 4000000;
    this.SECOND_HOME_ADDITIONAL_TAX = 3;

    this.price = price;
    this.buyerType = buyerType;
  }

  calculate() {
    return {
      tax: this.#taxDue(),
      percentage: this.#taxPercentage(),
      total: this.#totalDue(),
    };
  }

  #calculateTaxForBand(band) {
    if (this.price < band.start) {
      return 0;
    }

    let rate = band.rate;

    if (this.#isAdditionalHomeTaxable()) {
      rate += this.SECOND_HOME_ADDITIONAL_TAX;
    }

    const isPriceInBand = band.end == null || this.price <= band.end;
    let upperLimit = isPriceInBand ? this.price : band.end;
    let taxAmount = upperLimit - this.#roundDownToNearestHundred(band.start);

    return this.#roundDownToNearestHundred((taxAmount * rate) / 100);
  }

  #taxDue() {
    const taxes = this.#bands().map((band) => this.#calculateTaxForBand(band));

    return this.#sum(taxes);
  }

  #sum(items) {
    let result = 0;
    for (let i = 0; i < items.length; i++) {
      result += items[i];
    }
    return result;
  }

  #totalDue() {
    return this.price + this.#taxDue();
  }

  #taxPercentage() {
    return (this.#taxDue() / this.price) * 100;
  }

  #isAdditionalHomeBuyer() {
    return this.buyerType === "additionalHome";
  }

  #isAdditionalHomeTaxable() {
    return (
      this.#isAdditionalHomeBuyer() && this.price >= this.SECOND_HOME_THRESHOLD
    );
  }

  #isFirstTimeBuyer() {
    return this.buyerType === "firstTimeBuyer";
  }

  #bands() {
    if (this.#isUsingFirstTimeBuyerRate()) {
      return [
        { start: 0, end: 30000000, rate: 0 },
        { start: 30000001, end: 92500000, rate: 5 },
        { start: 92500001, end: 150000000, rate: 10 },
        { start: 150000001, end: null, rate: 12 },
      ];
    } else {
      return [
        { start: 0, end: 12500000, rate: 0 },
        { start: 12500001, end: 25000000, rate: 2 },
        { start: 25000001, end: 92500000, rate: 5 },
        { start: 92500001, end: 150000000, rate: 10 },
        { start: 150000001, end: null, rate: 12 },
      ];
    }
  }

  #roundDownToNearestHundred(value) {
    const remainder = value % 100;
    return value - remainder;
  }

  #isUsingFirstTimeBuyerRate() {
    return (
      this.#isFirstTimeBuyer() && this.price <= this.FIRST_TIME_BUYER_THRESHOLD
    );
  }
}
