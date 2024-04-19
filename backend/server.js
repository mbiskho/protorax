const express = require("express");
const cors = require("cors");
const router = require("./router");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.starter();
  }

  starter() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(express.json());
    this.app.use("/", router);
    this.app.use((err, req, res, next) => {
      const { start, httpStatus, message, previousError, stack } = err;
      res.status(httpStatus || 406).json({
        status: false,
        code: httpStatus || 406,
        message,
        data: previousError,
      });
    });
  }

  run(port) {
    this.server = this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }

  stop(done) {
    this.server.close(done);
  }
}

module.exports = Server;
