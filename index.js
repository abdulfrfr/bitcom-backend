const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");

//required MongoClient for connection

app.use(cors());
app.use(express.json());

let mongoConnection;
//variable to store the connection object to interact with my database
let db;
//variable that returns the connection object

function connectMongo(cb) {
  MongoClient.connect(
    "mongodb+srv://abdulfrfr:abdulfrfr11@cluster0.kf1nxns.mongodb.net/?retryWrites=true&w=majority/"
  )
    //connection to database
    .then((client) => {
      mongoConnection = client.db();
      //assign connection function to our varaible that store the connection object
      return cb();
      //callback function to start istening if everything goes well and start our app to listen on port 5000
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
      //callback function which also checks if theres an error so we don't listen on any port yet
    });
}

function getdb() {
  return mongoConnection;
}
//function that returns our connection

connectMongo((err) => {
  if (!err) {
    app.listen(5000, () => console.log("working..."));
  }
  db = getdb();
  //if connection goes right, return connection object to our db variable so we use the db variable to interact with our database
});

app.get("/allpolling", (req, res) => {
  const allPollingArray = [];

  db.collection("announced_pu_results")
    .find()
    .forEach((state) => {
      allPollingArray.push(state);
    })
    .then(() => {
      res.status(200).json(allPollingArray);
    });
});

app.get("/units", (req, res) => {
  const pollingUnits = [];

  db.collection("polling_units")
    .find()
    .forEach((state) => {
      pollingUnits.push(state);
    })
    .then(() => {
      res.status(200).json(pollingUnits);
    });
});

app.get("/lga", (req, res) => {
  const lga = [];

  db.collection("lga")
    .find()
    .forEach((state) => {
      lga.push(state);
    })
    .then(() => {
      res.status(200).json(lga);
    });
});

app.get("/parties", (req, res) => {
  const parties = [];

  db.collection("party")
    .find()
    .forEach((state) => {
      parties.push(state);
    })
    .then(() => {
      res.status(200).json(parties);
    });
});

app.get("/ward", (req, res) => {
  const ward = [];

  db.collection("ward")
    .find()
    .forEach((state) => {
      ward.push(state);
    })
    .then(() => {
      res.status(200).json(ward);
    });
});

app.post("/newpoll", (req, res) => {
  db.collection("polling_units")
    .inserOne(req.body)
    .then(() => {
      res.status(200).json({ added: "added a new polling unit" });
    });
});
