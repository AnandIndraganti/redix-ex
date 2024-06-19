import express from "express";
import { createClient } from "redis";

const app=express();
app.use(express.json());
const client = createClient();
client.connect();

app.post('/',async (req,res)=>{
    const {probemId,userId,code,language} = req.body;
    try{
        await client.lPush("submissions",JSON.stringify({probemId,userId,code,language}))
        res.json({message:"submitted!"})
    }catch(e){
        res.json({message:"submission Failed!"})
    }
    
})

app.listen(3000);