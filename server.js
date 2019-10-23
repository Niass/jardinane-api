const express = require("express");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

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
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("you successfully signin");
  } else {
    res.status(400).json('error loggin in, please try again')
  }
});

app.post('/signup', (req,res)=> {
  const { email, name, password } = req.body;
  const oldUsers = database.users;
  const newUser =  {
    id: 125,
    name: name,
    email: email,
    password: password,
    joined: new Date()
  }
  database.users = [...oldUsers, newUser]
  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id == id ) {
      found = true;
      return res.json(user)
    } 
  })
  if(!found) {
    res.status(404).json('No such a user')
  }
})

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
