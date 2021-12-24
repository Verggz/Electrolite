"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRouter = void 0;
const express_1 = __importDefault(require("express"));
class IRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    GetRouter() {
        return this.router;
    }
    GetRequest(endpoint, cb) {
        this.router.get(endpoint, cb);
    }
    PostRequest(endpoint, cb) {
        this.router.post(endpoint, cb);
    }
}
exports.IRouter = IRouter;
