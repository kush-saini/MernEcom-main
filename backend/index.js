var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(cors());

var Client = new MongoClient('mongodb+srv://mernecom:mernecom@cluster0.wtjik.mongodb.net/mernecom?retryWrites=true&w=majority');

var connection; 

Client.connect((err,db)=>{
    if(!err)
    {
        connection=db;
        console.log("Database connected sucessfully");
    }
    else
    {
        console.log("Database could not connect successfully");
    }
})

app.get('/user',(req,res)=>{
    var productdatabase = connection.db('mern_ecom').collection('user');
    productdatabase.find().toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok",data:docs});
        }
        else
        {
            res.send({status:"failed",data:err});
        }
    })
})

app.get('/user/:id',(req,res)=>{
    var productdatabase = connection.db('mern_ecom').collection('user');
    productdatabase.find({_id:ObjectId(req.params.id)}).toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok",data:docs});
        }
        else
        {
            res.send({status:"failed",data:err});
        }
    })
}) 

app.listen(3001,()=>{
    console.log("Server running on port 3001");
})