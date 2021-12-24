import { IRouter } from "../IRouter.router";
import { BINFlipEndpoint } from "./endpoints/BINFlip.router";

class FlipperRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new FlipperRouter();

BINFlipEndpoint.BINFlip();