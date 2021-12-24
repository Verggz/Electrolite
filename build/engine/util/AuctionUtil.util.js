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
exports.AuctionUtil = void 0;
const prismarine_nbt_1 = __importDefault(require("prismarine-nbt"));
class AuctionUtil {
    static KeepIndex(i) {
        return __awaiter(this, void 0, void 0, function* () {
            return i;
        });
    }
    static ConvertItemBytesToItemData(itemBytes) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var item = yield prismarine_nbt_1.default.parse(Buffer.from(itemBytes, 'base64'));
            return (_a = item.parsed.value.i) === null || _a === void 0 ? void 0 : _a.value;
        });
    }
    static GetAuctionItemID(itembytes) {
        return __awaiter(this, void 0, void 0, function* () {
            var itemdata = yield AuctionUtil.ConvertItemBytesToItemData(itembytes);
            return itemdata.value[0].tag.value.ExtraAttributes.value.id.value;
        });
    }
}
exports.AuctionUtil = AuctionUtil;
