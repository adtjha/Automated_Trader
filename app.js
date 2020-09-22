var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var fs = require("fs");

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// var mysql = require("mysql");

// Currently not working.
//
// var con = mysql.createConnection({
//   host:
//     "https://server123.web-hosting.com:2083/cpsess9457025300/3rdparty/phpMyAdmin/index.php",
//   user: "sowlyehg_test_user",
//   password: "W@UNNmpEzdkdVe7",
//   database: "sowlyehg_trader",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tradesRouter = require("./routes/trades");

var app = express();

app.use(logger("combined", { stream: accessLogStream }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/trades", tradesRouter);

app.post("/trade", function (req, res, next) {
  var message = req.body;
  res.json({ message: "Trade executed successfully.", body: message });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
