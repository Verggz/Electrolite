import nbt from 'prismarine-nbt';

export class AuctionUtil{
    public static async KeepIndex(i: number):Promise<number>{
        return i;
    }

    public static async ConvertItemBytesToItemData(itemBytes:string): Promise<any>{
        var item = await nbt.parse(Buffer.from(itemBytes,'base64'));
        return item.parsed.value.i?.value;
    }

    public static async GetAuctionItemID(itembytes: string): Promise<string>{
        var itemdata = await AuctionUtil.ConvertItemBytesToItemData(itembytes);
        return itemdata.value[0].tag.value.ExtraAttributes.value.id.value;

    }
}