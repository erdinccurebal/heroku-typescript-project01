import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

class Index {
  app: Application;
  package: any;

  constructor() {
    this.app = express();
    dotenv.config();
    this.package = require("../package.json");
    this.homePage();
    this.notFound();
    this.listen();
  }

  homePage(): void {
    const json: [{}] = [
      {
        name: this.package.name,
        version: this.package.version,
        description: this.package.description,
        homepage: this.package.homepage,
        author: this.package.author,
        contact: process.env.CONTACT,
      },
    ];
    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send(json);
    });
  }

  notFound(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send([{ message: "404 - Page Not Found" }]);
    });
  }

  listen(): void {
    const port = process.env.PORT || process.env.DEV_PORT;
    this.app.listen(port, () => {
      console.log(`${process.env.EXPRESS_START_MESSAGE} - PORT: ${port}`);
    });
  }
}

try {
  new Index();
} catch (error) {
  console.log(error);
}
