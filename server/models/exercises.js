const data = require('../data/exercises.json');

function getExercises(){
    return data.exercises;
}

function searchExerciseByName(query){
    return data.filter(x => {
        return x.exerciseName.toLowerCase().includes(query.toLowerCase());
    });
}
function getExerciseByID(type){
    return data.exercises.find(x => exercises.exercise.type === type);
}
function addExercise(exercise){
    exercise.id = data.exercises.length + 1;
    data.exercises.push(exercise);
}

function updateExercise(newValues){
    const index = data.exercises.findIndex(p => p.id === newValues.id);
    if(index === -1) {
      throw new Error('Exercise not found');
    }
    data.users[index] = {
      ...data.users[index],
      ...newValues,
    };
    return data.users[index];
}

function deleteExercise(exercise) {
    const index = data.exercises.findIndex(x => x.exercise === exercise);
    if(!index) {
      throw new Error('Exercise not found');
    }
    data.users.splice(index, 1);
}


module.exports = {
    getExercises,
    searchExerciseByName,
    getExerciseByID,
    addExercise,
    updateExercise,
    deleteExercise
}