/**
 * project to insert data into mongodb
 * please replace port number db name and collection name
 */
var express = require('express'); //used to make managing routes 
var bodyParser = require('body-parser'); // to parse urls and get parameters

var app = express();
app.set('view engine', 'ejs'); //extentsion for views
app.use(bodyParser.urlencoded({extended: false})); //middleware

var mongo = require('mongodb');
//var mongoClient = require('mongodb');
db = new mongo.Db('myDb', new mongo.Server('localhost',27017,{}),{});

//route to render index page
app.get('/',(req,res)=>{
    res.render('index',{
        success: false,
        dataDiv: false,
        details: null 
    });
});
//route to handle post route of the form
app.post('/in',(req,res)=>{
    db.open((err,db)=>{
        db.collection('myFirst',(err,collection)=>{
            doc={
                'name' : req.body.name,
                'address' : req.body.address
            };
            collection.insert(doc,()=>{
                res.render('index',{
                    success : true,
                    dataDiv: false,
                    details: null
                });
                db.close();
            });
        });
    });
});

//route to get db data
app.get('/db',(req,res)=>{
    var r;
    mongo.MongoClient.connect('mongodb://localhost:27017/myDb',(err,dbase)=>{
        //port: 27017 db: myDb
        if(err){
            throw err;
        }
        dbase.collection('myFirst').find({}).toArray((err,result)=>{
            if(err){throw err;}
            console.log(result);
            res.render('index',{
                success: true,
                dataDiv: true,
                details: JSON.stringify(result)

            });
        });
    });
    
});
app.listen(3000,()=>{
    console.log('port 3000  is lit! ;)');
});