"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const mongoose_1 = require("mongoose");
require("dotenv/config");
const morgan = require("morgan");
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const getApp = () => __awaiter(this, void 0, void 0, function* () {
    const app = express_1.default();
    app.get("/", (request, response, next) => {
        response.send("Hello world!");
    });
    // Logger
    if (process.env.NODE_ENV !== "test")
        app.use(morgan("combined"));
    // Body parser
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    // Routers
    app.use("/api/activity", router_1.ActivityRoutes);
    app.use("/api/tag", router_1.TagRoutes);
    // Conectarse a la BD
    try {
        yield mongoose_1.connect(utils_1.getDbUri(), { useNewUrlParser: true });
        console.log("Conectado!");
    }
    catch (error) {
        console.log("*** PINCHOSE ***");
        console.log(error);
    }
    return app;
});
exports.default = getApp;
//# sourceMappingURL=app.js.map