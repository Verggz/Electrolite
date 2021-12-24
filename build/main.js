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
const express_1 = __importDefault(require("express"));
const BinUtil_util_1 = require("./engine/util/BinUtil.util");
const FlipperRouter_router_1 = __importDefault(require("./routes/flip/FlipperRouter.router"));
const dynamic_1 = require("set-interval-async/dynamic");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/flipper", FlipperRouter_router_1.default.GetRouter());
app.listen(process.env.PORT || "8080", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("server started.");
    });
});
BinUtil_util_1.BinUtil.SaveBinToFile().then(finished => {
    console.log("saved");
    BinUtil_util_1.BinUtil.GetAllBinFlips().then(final => {
        console.log("flips saved");
    });
});
(0, dynamic_1.setIntervalAsync)((args) => {
    BinUtil_util_1.BinUtil.SaveBinToFile().then(finished => {
        console.log("saved");
        BinUtil_util_1.BinUtil.GetAllBinFlips().then(final => {
            console.log("flips saved");
        });
    });
}, 90000);
