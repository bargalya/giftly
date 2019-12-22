<<<<<<< HEAD
const mongo = require('mongodb').MongoClient;
const getDb = require("./db").getDb;

class Users {
    static collectionName = "Users"; 

=======
//const mongo = require('mongodb').MongoClient;
//const dbMgr = require('../dbMgr/dbMgr');

//const getDb = require("./db").getDb;
const addToDb = require('../dbMgr/dbMgr').addToDb;
var uuidCreator = require('uuid');

class Users{
    // static url = "mongodb://localhost:27017/";
    // static dbName = "giftlyDB";
    // static collectionName = "Users"; 
    // static connectParams = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   };   
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302

    constructor(){
    }

    // TODO: should we support GET method?
    // I don't see any reason to support
    get(req, res) {
<<<<<<< HEAD
        const db = getDb();
        const collection = db.collection(Users.collectionName); 

=======

        //********************* old code - delete */
/*        const mongo = require('mongodb').MongoClient; duplicated move out
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302
        const ObjectId = require('mongodb').ObjectID;
        const userid = ObjectId(req.params.userid);
        let query = {'_id' : userid};
        collection.findOne(query, 
            function(err, document){
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
<<<<<<< HEAD
                res.send({
                    'status': 'success',
                    'data': document
                    });
        });      
    }

    add(req, res){
        const db = getDb();
        const collection = db.collection(Users.collectionName); 
        const document = { 
            UserName: req.body.userName,
            Password: req.body.password               
         };  
        console.log("created document from request data:", document);

        collection.insertOne(document, 
            function(err){
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }                        
            });                  
            console.log("user was created!");
    }

    update(req, res){
        
=======
                let db = client.db(Users.dbName);
                let collection = db.collection(Users.collectionName);
                collection.findOne(query, 
                    function(err, document){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }
                        client.close();
                        res.send({
                            'status': 'success',
                            'data': document
                            });
                });
        });        */
        

        /********************************* new code - uncomment and check it works 
        dbMgr.find(req.params.userid, Users.collectionName,
            function(err, document)
            {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {
                res.send({
                    'status': 'success',
                    'data': document}
                )};
            });        
            */
    }

    add(req, res){

        const document = { 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            uuid: uuidCreator.v4()               
        };                 
              
        addToDb(Users.collectionName, document,
            function(err, responseDocument) {
                if (err)
                {
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {
                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });  
    }

    update(req, res){

        dbMgr.update(req.params.userid, Users.collectionName, req.body,
            function(err, response) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {
                    res.send({
                        'status': 'success',
                        'data': response // TODO: I am not sure what should I send back
                        });
                }
            });
        /*
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302
        const ObjectId = require('mongodb').ObjectID;
        const userid = ObjectId(req.params.userid);
        let query = {'_id' : userid};
        let newValues = {$set: req.body};
        mongo.connect(Users.url, Users.connectParams, 
            function(err, client) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                let db = client.db(Users.dbName);
                let collection = db.collection(Users.collectionName);
                collection.updateOne(query, newValues,
                    function(err, response){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }
                        client.close();
                        res.send({
                            'status': 'success',
                            'data': response
                            });
                });
        });       */        
    }
}

Users.url = "mongodb://localhost:27017/";
Users.dbName = "giftlyDB";
Users.collectionName = "Users"; 
Users.connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};   

module.exports = Users;
