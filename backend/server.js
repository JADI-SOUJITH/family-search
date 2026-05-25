const cors=require("cors");
const express=require("express");
const fs=require("fs");
const path=require("path");

const app=express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"dist")));

app.post("/search",(req,res)=>{

    const searchBox1=req.body.searchBox1||null;
    const searchBox2=req.body.searchBox2||null;

    const query=searchBox1||searchBox2;

    let data=[];

    if(fs.existsSync("searches.json")){

        const fileContent=fs.readFileSync("searches.json","utf8").trim();

        if(fileContent){
            data=JSON.parse(fileContent);
        }

    }

    data.push({
        searchBox1,
        searchBox2,
        time:new Date().toLocaleString("en-IN",{
            timeZone:"Asia/Kolkata"
        })
    });

    fs.writeFileSync(
        "searches.json",
        JSON.stringify(data,null,2)
    );

    res.json({
        redirect:`https://www.google.com/search?q=${encodeURIComponent(query)}`
    });

});

app.get("/logs",(req,res)=>{

    let data=[];

    if(fs.existsSync("searches.json")){

        const fileContent=fs.readFileSync("searches.json","utf8").trim();

        if(fileContent){
            data=JSON.parse(fileContent);
        }

    }

    res.json(data.reverse());

});

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"dist","index.html"));
});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});