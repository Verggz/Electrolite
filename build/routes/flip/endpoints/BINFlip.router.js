"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BINFlipEndpoint = void 0;
const BinUtil_util_1 = require("../../../engine/util/BinUtil.util");
const FlipperRouter_router_1 = __importDefault(require("../FlipperRouter.router"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class BINFlipEndpoint {
    static BINFlip() {
        return __awaiter(this, void 0, void 0, function* () {
            FlipperRouter_router_1.default.GetRouter().post('/bin/flip', function (req, res, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(req.body);
                    if (BinUtil_util_1.BinUtil.sniped.timestamp <= 0) {
                        var file = yield fs_extra_1.default.readJSON(__dirname + "/../../../../cache/binflips.json");
                        var viable = [];
                        console.log(file.auctions.length);
                        for (var i = 0; i < file.auctions.length; i++) {
                            if (file.auctions[i][0] < req.body.profit) {
                                continue;
                            }
                            if (file.auctions[i][1].price - file.auctions[i][0].price >= req.body.profit && file.auctions[i][1].price - file.auctions[i][0].price <= req.body.profit * 1.4) {
                                viable.push({ "item": file.auctions[i][0], "usual": file.auctions[i][1] });
                            }
                        }
                        res.json({ "random": viable[Math.floor(Math.random() * viable.length)], all: viable });
                    }
                    else {
                        var viable = [];
                        for (var i = 0; i < BinUtil_util_1.BinUtil.sniped.auctions.length; i++) {
                            if (BinUtil_util_1.BinUtil.sniped.auctions[i][0].price < req.body.profit) {
                                continue;
                            }
                            if (BinUtil_util_1.BinUtil.sniped.auctions[i][1].price - BinUtil_util_1.BinUtil.sniped.auctions[i][0].price >= req.body.profit && BinUtil_util_1.BinUtil.sniped.auctions[i][1].price - BinUtil_util_1.BinUtil.sniped.auctions[i][0].price <= req.body.profit * 1.5) {
                                viable.push({ "item": BinUtil_util_1.BinUtil.sniped.auctions[i][0], "usual": BinUtil_util_1.BinUtil.sniped.auctions[i][1] });
                            }
                        }
                        res.json({ "random": viable[Math.floor(Math.random() * viable.length)], all: viable });
                    }
                });
            });
        });
    }
}
exports.BINFlipEndpoint = BINFlipEndpoint;
