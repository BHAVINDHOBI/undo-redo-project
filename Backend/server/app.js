require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

const passportSetup = require("./config/passportConfig.js");
const passportFBSetup = require("./config/passportFBConfig.js");
const authRoutes = require("./routes/authRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

const dbConnection = require("./config/dbConnections.js");
dbConnection();

const Port = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Novice",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
