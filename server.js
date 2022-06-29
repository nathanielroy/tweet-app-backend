const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const authRoute = require("./app/routes/auth.routes");
const userRoute = require("./app/routes/user.routes");
const postRoute = require("./app/routes/posts.routes");
const db = require("./app/models");
const docs = require('./app/docs');
const swaggerUI = require("swagger-ui-express");
const Role = db.role;
const PORT = process.env.PORT || 8080;
const mongoDb = process.env.MONGODB_URL || 'mongodb+srv://rootuser:rootpass@cluster0.boggx.mongodb.net/test';
dotenv.config();

const app = express();
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(authRoute);
app.use(userRoute);
app.use(postRoute);
app.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

db.mongoose.set('useCreateIndex', true)
db.mongoose
  .connect(mongoDb ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Tweet application." });
});

module.exports = app;
