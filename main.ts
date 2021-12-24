import express from 'express';
import FlipperEngine from './engine/FlipperEngine.engine';
import { BinUtil } from './engine/util/BinUtil.util';
import FlipperRouterRouter from './routes/flip/FlipperRouter.router';
import {setIntervalAsync} from 'set-interval-async/dynamic';

var app = express();

app.use(express.json())
app.use("/api/flipper",FlipperRouterRouter.GetRouter());

app.listen(process.env.PORT || "8080",async function(){
    console.log("server started.");
});

BinUtil.SaveBinToFile().then(finished =>{
    console.log("saved");
    BinUtil.GetAllBinFlips().then(final =>{
        console.log("flips saved");

    });
})

setIntervalAsync((args) =>{
    BinUtil.SaveBinToFile().then(finished =>{
        console.log("saved");
        BinUtil.GetAllBinFlips().then(final =>{
            console.log("flips saved");
        });
    })
},90000)




