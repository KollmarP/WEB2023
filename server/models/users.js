//data grab
const { connect, ObjectId } = require('./Mongo');
async function data() {
  const db = await connect();
  return db.collection('Users');
}


//web token and handlers
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
console.log(JWT_EXPIRES_IN)

//grabs all user data
async function getAll(){
  return await data();
}

//gets user by id
async function getUserByID(id){
  const data = await data();
  const item = await data.findOne({ id: new ObjectId(id) });
  return item;
}

//gets User by Email
async function getUserByEmail(email){
  const item = await data().find(x => x.email === email);
  if(!item){
    throw new Error('User not found');
  }
  return item;
}

//searches user by name, email, or username
async function searchUserByName(query){
    return data().filter(x => {
        return (
          x.firstName.toLowerCase().includes(query.toLowerCase()) ||
          x.lastName.toLowerCase().includes(query.toLowerCase()) ||
          x.email.toLowerCase().includes(query.toLowerCase()) ||
          x.username.toLowerCase().includes(query.toLowerCase()) 
        );
    });
}

//create new user
async function createUser(values){
  const data = await data();

  const dupEmail = await data.findOne({email: values.email})
  if(dupEmail){
    throw new Error('Email in use')
  }
  const newItem = {
    id: data.length + 1,
    ...values,
  };

  item = await data.insertOne(newItem);
  return item;
}

//register new user with validation
async function registerUser(values) {  
  const data = await data();  
  
  const exists = data.users.some(x => x.email === values.email);
  if(exists) {
    throw new Error('Email already in use.');
  }
  
  if(values.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  const newItem = {
    id: data.users.length + 1,
    ...values,
  };
  item = await data.insertOne(newItem);
  return item;
}

//login function
async function  login(email, password) {
  data = await data();
  const item = data.find(x => x.email === email);
  if(!item) {
    throw new Error('User not found');
  }

  if(item.password !== password) {
    throw new Error('Wrong password');
  }
  
  const user = item; //{ ...item, password: undefined, admin: true};
  const token = await generateJWT(user);
  return { user, token };
}

//edit user
async function updateUser(newValues) {
  const data = await data();
  const id = data.findIndex(x => x.id === newValues.id);
  const updatedItem = await data.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: newValues},
    { returnDocument: 'after' }
  );
  return updatedItem;
}

//Delete User
async function deleteUser(user) {
  const data = await data();
  const result = await data.deleteOne(user);
  return result;
}

async function seed(){

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
    getAll, getUserByID, getUserByEmail, searchUserByName, createUser, updateUser, deleteUser, login, seed, registerUser, generateJWT, verifyJWT
  };