//data grab
const data = require("../data/users.json");

//web token and handlers
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

//grabs all user data
function getAll(){
    return data.users;
}

//gets user by id
function getUserByID(id){
    const item = data.users.find(x => x.id === id);
    if(!item){
        throw new Error('User not found');
    }
    return item;
}

//searches user by name, email, or username
function searchUserByName(query){
    return data.filter(x => {
        return (
            x.firstName.toLowerCase().includes(query.toLowerCase()) ||
            x.lastName.toLowerCase().includes(query.toLowerCase()) ||
            x.email.toLowerCase().includes(query.toLowerCase()) ||
            x.username.toLowerCase().includes(query.toLowerCase()) 
        );
    });
}

//create new user
function createUser(values) {
    const newItem = {
      id: data.users.length + 1,
      ...values,
    };
   
    data.users.push(newItem);
    return newItem;
}

//register new user with validation
function registerUser(values) {  
    const exists = data.users.some(x => x.username === values.username);
    if(exists) {
      throw new Error('Username already exists');
    }
  
    if(values.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  
    // TODO: Make sure user is create with least privileges
  
    const newItem = {
      id: data.users.length + 1,
      ...values,
    };
  
    data.users.push(newItem);
    return newItem;
  
}

//login function
async function  login(email, password) {

    const item = data.users.find(x => x.email === email);
    if(!item) {
      throw new Error('User not found');
    }
  
    if(item.password !== password) {
      throw new Error('Wrong password');
    }
  
    const user = { ...item, password: undefined, admin: true};
    const token = await generateJWT(user);
    return { user, token };
}

//edit user
function updateUser(newValues) {
    const index = data.users.findIndex(p => p.id === newValues.id);
    if(index === -1) {
      throw new Error('User not found');
    }
    data.users[index] = {
      ...data.users[index],
      ...newValues,
    };
    return data.users[index];
}

//Delete User
function deleteUser(id) {
    const index = data.users.findIndex(x => x.id === id);
    if(index === -1) {
      throw new Error('User not found');
    }
    data.users.splice(index, 1);
}


//Handle Tokens
//Generate JWT
function generateJWT(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
        if(err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    })
}

//verify JWT
function verifyJWT(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    })
}

module.exports = {
    getAll, getUserByID, searchUserByName, createUser, updateUser, deleteUser, login, registerUser, generateJWT, verifyJWT
  };