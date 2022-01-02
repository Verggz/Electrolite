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
exports.BinUtil = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const FlipperEngine_engine_1 = __importDefault(require("../FlipperEngine.engine"));
const AuctionUtil_util_1 = require("./AuctionUtil.util");
class BinUtil {
    static GetAllBinFlips() {
        return __awaiter(this, void 0, void 0, function* () {
            var bin = yield fs_extra_1.default.readJSON(__dirname + "/../../../cache/bin.json");
            bin.auctions = bin.auctions.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                else if (a.price > b.price) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            var allitems = yield fs_extra_1.default.readJSON(__dirname + "/../../../cache/items.json");
            var allitemskeys = Object.keys(allitems);
            var lowest = [];
            for (var i = 0; i < allitemskeys.length; i++) {
                lowest.push(AuctionUtil_util_1.AuctionUtil.KeepIndex(i).then(index => {
                    return this.GetTwoLowestOfItem(bin.auctions, allitems[allitemskeys[index]].name, allitemskeys[index]);
                }));
            }
            return Promise.all(lowest).then(items => {
                var viableitems = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i][1] == undefined || items[i][0] == undefined) {
                        continue;
                    }
                    if (items[i][1].price - items[i][0].price > 0) {
                        viableitems.push(items[i]);
                    }
                }
                BinUtil.sniped = { "timestamp": Date.now(), "auctions": viableitems };
                fs_extra_1.default.writeJSON(__dirname + "/../../../cache/binflips.json", { "timestamp": Date.now(), "auctions": viableitems });
                return viableitems;
            });
        });
    }
    static GetTwoLowestOfItem(auctions, itemname, itemid) {
        return __awaiter(this, void 0, void 0, function* () {
            var twolowest = [];
            for (var i = 0; i < auctions.length; i++) {
                if (twolowest.length >= 2) {
                    break;
                }
                if (auctions[i].item.toLowerCase().includes(itemname.toLowerCase())) {
                    if (auctions[i].item_bytes) {
                        var id = yield AuctionUtil_util_1.AuctionUtil.GetAuctionItemID(auctions[i].item_bytes);
                        if (id == "ENCHANTED_BOOK")
                            continue;
                        if (id == itemid) {
                            twolowest.push(auctions[i]);
                        }
                    }
                    else {
                        return [];
                    }
                }
            }
            if (twolowest.length < 2) {
                return [];
            }
            return twolowest;
        });
    }
    static SaveBinToFile() {
        return __awaiter(this, void 0, void 0, function* () {
            var ah = yield FlipperEngine_engine_1.default.GetAh();
            var binauc = [];
            for (var i = 0; i < ah.length; i++) {
                if (ah[i].bin != undefined) {
                    binauc.push({ "item": ah[i].item, "item_bytes": ah[i].item_bytes, price: ah[i].price, "aucid": ah[i].aucid });
                }
            }
            yield fs_extra_1.default.writeJSON(__dirname + "/../../../cache/bin.json", { "auctions": binauc });
            return true;
        });
    }
}
exports.BinUtil = BinUtil;
BinUtil.sniped = { "timestamp": 0, "auctions": [] };
