"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
class Index {
    constructor() {
        this.app = express_1.default();
        dotenv_1.default.config();
        this.package = require("../package.json");
        this.homePage();
        this.notFound();
        this.listen();
    }
    homePage() {
        const json = [
            {
                name: this.package.name,
                version: this.package.version,
                description: this.package.description,
                homepage: this.package.homepage,
                author: this.package.author,
                contact: process.env.CONTACT,
            },
        ];
        this.app.get("/", (req, res, next) => {
            res.send(json);
        });
    }
    notFound() {
        this.app.use((req, res, next) => {
            res.status(404).send([{ message: "404 - Page Not Found" }]);
        });
    }
    listen() {
        const port = process.env.PORT || process.env.DEV_PORT;
        this.app.listen(port, () => {
            console.log(`${process.env.EXPRESS_START_MESSAGE} - PORT: ${port}`);
        });
    }
}
try {
    new Index();
}
catch (error) {
    console.log(error);
}
