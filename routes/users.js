const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const email = req.params.email;
  let filtered_users = users.filter((user)=>
    user.email === email
  );
  console.log("This is the filtered users: " + filtered_users);
  res.send(filtered_users)//This line is to be replaced with actual return value
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  const first_name = req.query.firstName; 
  const last_name = req.query.lastName;
  const email = req.query.email;
  const dob = req.query.DOB;

  const new_user = {
    "firstName":first_name,
    "lastName":last_name,
    "email":email,
    "DOB":dob
}
users.push(new_user);

  res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
      let filtered_user = filtered_users[0];
      let DOB = req.query.DOB;
      //if the DOB has changed
      if(DOB) {
          filtered_user.DOB = DOB
      }
      /*
      Include code here similar to the one above for other attibutes
      */
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      res.send(`User with the email  ${email} updated.`);
  }
  else{
      res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email  ${email} deleted.`);
});


//Get by Last name 
router.get("/lastName/:lastName", (req, res) => {
  const lastName = req.params.lastName;
  let same_lastNameUsers = users.filter((user) => user.lastName === lastName);
  res.send(same_lastNameUsers);
});

function getDateFromString(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}
  
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
  let sorted_users=users.sort(function(a, b) {
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
          return d1-d2;
        });
  res.send(sorted_users);
});

module.exports=router;
