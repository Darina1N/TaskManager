const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'myBlockTasks'

const app = express()
const MongoClient = mongodb.MongoClient;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get('',(req,res)=> {
    res.send('Hello, I am your NodeJS server!')
})

app.get('/about',(req,res)=> {
    res.send('<h1>Server: task manager</h1>')
})

app.get('/author',(req,res)=> {
    res.send({'firstname':'Darina','lastname':'Kolesarova'})
})

app.get('/task',(req, res)=>{
    MongoClient.connect(connectionURL, function(error, client){
        if(error){
            return console.log('Connection failed!')
        }
        console.log('Connection is OK')
        let filter={};
        if(req.query.done){
            if(req.query.done=='true')
                filter.done = true;
            else if(req.query.done=='false'){
                filter.done = false;
            }
        }

        const db = client.db(databaseName);

        db.collection('tasks').find(filter).toArray( function(err, result){
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });    
})

app.get('/tasks',(req, res)=>{
    MongoClient.connect(connectionURL, function(error, client){
        if(error){
            return console.log('Connection failed!')
        }
        console.log('Connection is OK')
        let filter={};
        if(req.query.priority){
            const cislo = parseInt(req.query.priority); 
            filter.priority = cislo;                     
        }

        const db = client.db(databaseName);

        db.collection('tasks').find(filter).toArray( function(err, result){
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });    
})

app.post('/task/new', (req,res)=>{
    const data = req.body;
    const name=data.name;
    const priority=data.priority;
    let price='undefined';
    if(data.price){
        price=data.price;
    }
    console.log(name, ' ',priority,' ', price);
    const done=false;
    const currentdate = new Date();
    
    const object = {name, priority, currentdate, done}
    if(price!=='undefined'){
        object.price=price;
    }
   
    MongoClient.connect(connectionURL,function(error, client){
        if(error){
            return console.log('Connection failed!')
        }

        const db = client.db(databaseName);

        db.collection('tasks').insertOne(object, function(err, result){
            if(err) throw err;
            res.json(result);
        });
    });
})

app.put('/task/done', (req,res)=>{

})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})