const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: 123,
      name: "Ibra",
      email: "ibra@gmail.com",
      password: "love",
      joined: new Date()
    },
    {
      id: 124,
      name: "Slvia",
      email: "silvia@gmail.com",
      password: "cool",
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const password = req.body.password;
  const hash = database.users[database.users.length - 1].password;
  bcrypt.compare(password, hash, function(err, resp) {
    // res == true
    if (resp) {
      console.log(resp)
      res.json("you successfully signin");
    } else {
      console.log(resp,password)
      res.status(400).json("error loggin in, please try again");
    }
  });
});

app.post("/signup", (req, res) => {
  const { email, name, password } = req.body;
  const oldUsers = database.users;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    console.log(hash);
    const newUser = {
      id: 125,
      name: name,
      email: email,
      password: hash,
      joined: new Date()
    };
    database.users = [...oldUsers, newUser];
    res.json(database.users[database.users.length - 1]);
  });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("No such a user");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/signup --> POST = user

Other options for maybe later... 
/profile/:userId --> GET = user
*/
