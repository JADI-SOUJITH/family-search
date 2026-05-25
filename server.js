const express=require("express");
const fs=require("fs");

const app=express();

app.use(express.json());
app.use(express.static("public"));

app.post("/search",(req,res)=>{

    const box1=req.body.box1;
    const box2=req.body.box2;

    const query=box1||box2;

    let data=[];

    if(fs.existsSync("searches.json")){
        data=JSON.parse(fs.readFileSync("searches.json"));
    }

    data.push({
        searchBox1:box1,
        searchBox2:box2,
        time:new Date().toLocaleString("en-IN",{
            timeZone:"Asia/Kolkata"
        })
    });

    fs.writeFileSync("searches.json",JSON.stringify(data,null,2));

    res.json({
        redirect:`https://www.google.com/search?q=${encodeURIComponent(query)}`
    });

});

app.get("/logs",(req,res)=>{

    let data=[];

    if(fs.existsSync("searches.json")){
        data=JSON.parse(fs.readFileSync("searches.json"));
    }

    res.json(data.reverse());

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
});