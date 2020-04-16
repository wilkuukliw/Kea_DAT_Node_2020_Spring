const mongoClient = require("mongodb").MongoClient;

const connectionUrl = "mongodb://localhost:27017";                                  /* running on application layer */
const dbName = "animalfarm";


mongoClient.connect(connectionUrl, {useUnifiedTopology: true}, (error, client) => {   /*connected to mondgo client*/
    if (error) {
        throw "Eror connecting to mongodb " + error;
    }
    const animalFarmDB = client.db(dbName);
    const buildings = animalFarmDB.collection('buildings');

    buildings.find({type: {$exists: true}}).toArray((error, foundBuildings) => {
        console.log(foundBuildings);
        client.close();
    });
});