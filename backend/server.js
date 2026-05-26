const cors=require("cors");
const express=require("express");
const fs=require("fs");

const app=express();
app.use(cors());
app.use(express.json());

const readLogs=()=>{
    if(!fs.existsSync("searches.json")) return [];
    const fileContent=fs.readFileSync("searches.json","utf8").trim();
    if(!fileContent) return [];
    try{
        const parsed=JSON.parse(fileContent);
        return Array.isArray(parsed)?parsed:[];
    }catch{
        return [];
    }
};

const writeLogs=(data)=>{
    fs.writeFileSync("searches.json",JSON.stringify(data,null,2));
};

app.post("/search",(req,res)=>{
    const searchBox1=req.body.searchBox1||null;
    const searchBox2=req.body.searchBox2||null;
    const query=searchBox1||searchBox2;

    const data=readLogs();

    data.push({
        searchBox1,
        searchBox2,
        time:new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})
    });

    writeLogs(data);

    res.json({
        redirect:`https://www.google.com/search?q=${encodeURIComponent(query)}`
    });
});

app.get("/logs",(req,res)=>{
    res.set("Cache-Control","no-store");
    res.json(readLogs().reverse());
});

app.get("/health",(req,res)=>{
    res.json({ok:true});
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
