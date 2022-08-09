import Account from "./account";

import { dinero, equal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

describe("Account", () => {
  it("has some fields", () => {
    const account = new Account({
      providerName: "The Provider",
      productName: "The Name",
      representativeAPR: "APR",
      unauthODMonthlyCap: "Cap",
    });

    expect(account.providerName).toEqual("The Provider");
    expect(account.name).toEqual("The Name");
    expect(account.representativeAPR).toEqual("APR");
    expect(account.unauthODMonthlyCap).toEqual("Cap");
  });

  it("builds a url with a valid scheme, if required", () => {
    const accountWithoutScheme = new Account({
      productLandingPageURL: "www.blah.com",
    });
    expect(accountWithoutScheme.url).toEqual("https://www.blah.com");

    const accountWithScheme = new Account({
      productLandingPageURL: "https://www.blah.com",
    });
    expect(accountWithScheme.url).toEqual("https://www.blah.com");
  });

  it("has a human readable account type", () => {
    expect(new Account({ accountType: "standard" }).type).toEqual(
      "Standard current accounts"
    );
    expect(new Account({ accountType: "fee free basic account" }).type).toEqual(
      "Fee-free basic bank accounts"
    );
    expect(new Account({ accountType: "student" }).type).toEqual(
      "Student accounts"
    );
    expect(new Account({ accountType: "premier" }).type).toEqual(
      "Premier accounts"
    );
    expect(new Account({ accountType: "e-money account" }).type).toEqual(
      "Prepaid cards"
    );
    expect(new Account({ accountType: "added value" }).type).toEqual(
      "Packaged accounts"
    );
    expect(new Account({ accountType: "young person" }).type).toEqual(
      "Young person's accounts"
    );
    expect(new Account({ accountType: "graduate" }).type).toEqual(
      "Graduate accounts"
    );
  });

  it("has a monthly fee", () => {
    expect(
      equal(
        new Account({ monthlyCharge: "0.00" }).monthlyFee,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ monthlyCharge: "122.98" }).monthlyFee,
        dinero({ amount: 12298, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has account access details", () => {
    const account = new Account({
      branchBanking: "true",
      internetBanking: "true",
      mobilePhoneApp: "true",
      postOfficeBanking: "true",
    });

    expect(account.accountAccess.branchBanking).toBeTruthy();
    expect(account.accountAccess.internetBanking).toBeTruthy();
    expect(account.accountAccess.mobilePhoneBanking).toBeTruthy();
    expect(account.accountAccess.postOfficeBanking).toBeTruthy();
  });

  it("has account features", () => {
    expect(
      new Account({ chequeBook: "Yes" }).accountFeatures.chequeBook
    ).toBeTruthy();
    expect(
      new Account({ chequeBook: "Other?" }).accountFeatures.chequeBook
    ).toBeFalsy();

    expect(
      new Account({ monthlyCharge: "0.00" }).accountFeatures.noMonthlyFee
    ).toBeTruthy();
    expect(
      new Account({ monthlyCharge: "1.99" }).accountFeatures.noMonthlyFee
    ).toBeFalsy();

    expect(
      new Account({ existingCustomer: "false" }).accountFeatures
        .openToNewCustomers
    ).toBeTruthy();
    expect(
      new Account({ existingCustomer: "true" }).accountFeatures
        .openToNewCustomers
    ).toBeFalsy();

    expect(
      new Account({ overdraftFacility: "true" }).accountFeatures
        .overdraftFacility
    ).toBeTruthy();
    expect(
      new Account({ overdraftFacility: "false" }).accountFeatures
        .overdraftFacility
    ).toBeFalsy();

    expect(
      new Account({ bacsSwitchService: "true" }).accountFeatures
        .supportsSevenDaySwitching
    ).toBeTruthy();
    expect(
      new Account({ bacsSwitchService: "false" }).accountFeatures
        .supportsSevenDaySwitching
    ).toBeFalsy();
  });
});
