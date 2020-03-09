const express = require("express");   //() to instantiate express .  loaded the express module into its own variable which you could then use everywhere else in that module:
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended:false}));

// parse application/json
app.use(express.json());

let devices = [{id: 1, type: "computer"}, 
               {id: 2, type: "iPod"}];

let nextDeviceId = 3;

app.get("/", (req, res) => {  

    return res.send("This is my device API, Anna");
});

app.get("/devices", (req, res) => {     // read crud request

    return res.send({devices: devices});
});

app.get("/devices/:id", (req, res) => {  
    const device = devices.find(device => device.id === Number(req.params.id) );
    return res.send({ response: device});
});

app.post("/devices", (req, res) => {     //to make post request. crud. create / write . Adds new device to the array.
    let newDevice = req.body;
    if(!newDevice.type) {
        return res.status(400).send({ response: "Missing device type" });
    }
    newDevice.id =nextDeviceId++;
    devices.push(newDevice);
    return res.send({ response: newDevice });
});

app.put("/devices/:id", (req,res) => {   // crud update

    const foundIndex = devices.findIndex(device => device.id === Number(req.params.id));
    delete req.body.id;

    const newDevice = { ...devices[foundIndex], ...req.body };
    devices[foundIndex] = newDevice;

    return res.send({ response: newDevice });
});


app.delete("/devices/:id", (req,res) => {

    devices = devices.filter(device => device.id !== Number(req.params.id));
    return res.send({ response: devices });


}



)



app.listen(3000, (error) => {
    if(error) {
        console.log("Error..")
    }
    console.log("Server is running on port", 3000)
})



