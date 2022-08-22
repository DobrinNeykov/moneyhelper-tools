const fs = require("fs");

fs.readFile("data/fields.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const fields = JSON.parse(data);

  const accounts = { items: [] };

  for (let i = 0; i < 172; i++) {
    let account = {};

    Object.keys(fields).forEach((key) => {
      const values = fields[key];
      var value = values[Math.floor(Math.random() * values.length)];
      account[key] = value;
    });

    accounts.items.push(account);
  }

  fs.writeFile("accounts.json", JSON.stringify(accounts), (err) => {
    if (err) {
      console.error(err);
    }
  });
});
