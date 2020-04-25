const mongoClient = require("mongodb").MongoClient;

const connectionUrl = "mongodb://localhost:27017";                                  /* running on application layer */
const dbName = "animalfarm";


mongoClient.connect(connectionUrl, {useUnifiedTopology: true}, (error, client) => {   /*connected to mondgo client via callback*/
    if (error) {
        throw "Eror connecting to mongodb " + error;
    }
    const animalFarmDB = client.db(dbName);
    const buildings = animalFarmDB.collection('buildings');


    buildings.deleteOne({"type": "pen"}, (error,success) => {
        console.log(success);
        client.close();
    })
});