"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IRouter_router_1 = require("../IRouter.router");
const BINFlip_router_1 = require("./endpoints/BINFlip.router");
class FlipperRouter extends IRouter_router_1.IRouter {
    constructor() {
        super();
    }
}
exports.default = new FlipperRouter();
BINFlip_router_1.BINFlipEndpoint.BINFlip();
