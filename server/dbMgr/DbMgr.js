const mongo = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;

url = "mongodb://localhost:27017/";    
dbName = "giftlyDB";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;

// Connect to the DB and initialize the variable with the connection
mongo.connect(url, connectParams, 
    function(err, client) {
        if(err) {                        
            console.log("ERROR! failed to connect to Data base!");
        }
        else {
            db = client.db(dbName);
            console.log("Database created");
        }    
    }
);

function addToDb(collectionName, document, callback)
{
    if (db)
    {        
        return insertOne(collectionName, document, callback);
    }
    else
    {
        // the object is expected to be initialized at the application's rise
        console.log("ERROR!!! from func add: DB is not connected! connecting now. fix bug later!");

        mongo.connect(url, connectParams, 
            function(err, client) {
                if(err) {                    
                    console.log("Error!");
                }
                db = client.db(dbName);
                console.log("Database created!" + db);
                return insertOne(collectionName, document, callback);
                }
        );    
    }        
}

function insertOne(collectionName, document, callback)
{
    const collection = db.collection(collectionName);    
    collection.insertOne(document,
        function(err){
            if(err) { 
                console.log("failed to add a document to " + collection + " collection");
                return callback(err);
            }            
            return callback(null, document);
    });  
}

function findOne(quary, collectionName, callback)
{        
    // get the desired collection we want to search in
    let collection = db.collection(collectionName);

    collection.findOne(quary,function(err, document) {
        if(err) {                      
                console.log("DbMgr: failed to find a document in " + collectionName + " collection");

                 return callback(err);
        }   
        console.log("DbMgr: found document in " + collectionName + " collection");
        return callback(null, document);
        }
    );
}

function findUserName(userName, collectionName, callback)
{
    let query = {"userName" : userName};    
    return findOne(query, collectionName, callback);
}
           
module.exports = { 
    addToDb,
    findUserName
};