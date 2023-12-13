//data grab
const { connect, ObjectId } = require('./Mongo');

async function data() {
  const db = await connect();
  return db.collection('Exercises');
}

async function getExercises(){
    return data();
}

async function searchExerciseByName(query){
    return data().filter(x => {
        return x.exerciseName.toLowerCase().includes(query.toLowerCase());
    });
}
async function getExerciseByType(type){
    return data().find(x => exercises.exercise.type === type);
}
async function typalSearch(type, query){
    const data = getExerciseByType(type);
    return data.filter(x => {
        return x.exerciseName.toLowerCase().includes(query.toLowerCase());
    });
}
async function addExercise(values){
    const data = await data();
  
    const dupExercise = await data.findOne({name: values.name})
    if(dupExercise){
      throw new Error('Exercise Exists')
    }
    const newItem = {
      //id: data.length + 1,
      ...values,
    };
  
    item = await data.insertOne(newItem);
    return item;
  }

//edit user
async function updateExercise(newValues) {
    const data = await data();
    const id = data.findIndex(x => x._id === newValues._id);
    const updatedItem = await data.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: newValues},
      { returnDocument: 'after' }
    );
    return updatedItem;
  }
  
  //Delete User
  async function deleteExercise(exercise) {
    const data = await data();
    const result = await data.deleteOne(exercise);
    return result;
  }
  
  async function seed(){
  
  }


module.exports = {
    getExercises,
    searchExerciseByName,
    getExerciseByType,
    typalSearch,
    addExercise,
    updateExercise,
    deleteExercise,
    seed
}