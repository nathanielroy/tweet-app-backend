const app = require("./src/app");

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server running on ${process.env.PORT || 8080}.`)
);
