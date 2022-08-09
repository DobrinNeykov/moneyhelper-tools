import Account from "./account";

class AccountList {
  constructor(json) {
    this._json = json;
    this._items = json.items.map((j) => new Account(j));
  }

  get items() {
    return this._items;
  }
}

export default AccountList;
