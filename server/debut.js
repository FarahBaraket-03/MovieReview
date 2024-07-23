const express=require('express');
const mysql=require('mysql');
const app=express();
const bodyParser=require('body-parser')
const cors=require('cors');


app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended :true}));

const db=mysql.createPool({
    user:'root',
    host:'localhost',
    password:'password',
    database:"nodemysql"
})

app.get("/api/select",(req,res)=>{
    db.query("select * from movies ",(err,resultat)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(resultat)
        }
    })
})

app.post("/api/insert",(req,res)=>{
    const movieName=req.body.movieName;
    const Review=req.body.Review;
    db.query("insert into movies (nameMovie,reviewMovie) values (?,?)",[movieName,Review],(err,resultat)=>{
        if(err){
            console.log(err)
        }
        res.send(resultat)
    })
})

app.delete("/api/delete/:id",(req,res)=>{
    db.query("delete from movies where id = ?",[req.params.id],(err,resultat)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(resultat);
        }
    })
    
})

app.put("/api/update",(req,res)=>{
    const name=req.body.nameMovie;
    const rev=req.body.Review;
    const id=req.body.id;
    db.query("update movies set nameMovie= ? , reviewMovie=? where id=? ",[name,rev,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})


app.listen(3009,()=>{
    console.log("server running on port 3009")
})