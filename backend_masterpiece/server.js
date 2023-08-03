const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const userRouts = require("./routes/userRouter");
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");

// import routes
const productRouter = require("./routes/productRouter");
const quoteRouter = require("./routes/quotesRouter");
const aboutRouter = require("./routes/aboutRouter");
const writerRouter = require("./routes/writerRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use(productRouter);
app.use(quoteRouter);
app.use(aboutRouter);
app.use(writerRouter);
app.use(userRouter);
app.use(orderRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("*", notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to mongodb");
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Starting server on port ${process.env.PORT}`);
        });
      });
  },
};
