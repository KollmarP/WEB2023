const express = require('express');
const { getExercises, searchExerciseByName, getExerciseByType, typalSearch, addExercise, updateExercise, deleteExercise, seed } = require('../models/exercises');
const router = express.Router();

router
    .get('/', (req, res, next) => {
        getExercises()
        .then((exercises) => {
            res.send(exercises);
        }).catch(next)
    })
    .get('/search', (req, res, next) => {
        searchExerciseByName(req.query.q)
        .then((results) => {
            res.send(results);
        }).catch(next)
    })
    .get('/:exercise', (req, res) => {
        getExerciseByType(req.params.type)
        .then((results) => {
            res.send(results);
        }).catch(next)
    })
    .post('/', (req, res, next) => {
        addExercise(req.body)
        .then((exercise) => {
            res.send(exercise);
        }).catch(next)
    })
    .patch('/', (req, res, next) => {
        updateExercise(req.body)
        .then((exercise) => {
            res.send(exercise);
        }).catch(next)
    })
    .delete('/', (req, res, next) => {
        deleteExercise(req.body)
        .then(() => {
            res.send("Exercise deleted.");
        }).catch(next)
    })

module.exports = router;