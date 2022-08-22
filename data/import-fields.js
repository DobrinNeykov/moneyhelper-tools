const fs = require("fs");

fs.readFile("account-dump.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const accounts = JSON.parse(data).items;

  let results = {};

  accounts.forEach((a) => {
    Object.keys(a).forEach((k) => {
      results[k] = results[k] || [];
      // if (!results[k].includes(a[k])) {
      results[k].push(a[k]);
      // }
    });
  });

  fs.writeFile("data/fields.json", JSON.stringify(results), (err) => {
    if (err) {
      console.error(err);
    }
  });
});
