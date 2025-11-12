const express = require('express');
const model = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router
    .get('/', (req, res, next) => {
        model.getAll()
        .then(list => {
            const data = { data: list.items, total: list.total, isSuccess: true };
            res.send(data)
        }).catch(next);
    })
    .get('/search/:q', (req, res, next) => {
        model.searchUserByName(req.query.q)
        .then(list => {
            const data = { data: list.items, total: list.total, isSuccess: true };
            res.send(data)
        }).catch(next);
    })
    .get('/:id', (req, res, next) => {
        const user = getUserByID(+req.params.id);
        res.send( user );
    })
    .post('/', (req, res, next) => {
        const user = createUser(req.body);
        res.send(user);
    })
    .post('/register', (req, res, next) => {
        model.registerUser(req.body)
        .then(user => {
            res.send(user)
        }).catch(next);
    })
    .post('/login', (req, res, next) => {
        model.login(req.body.email, req.body.password)
            .then(user => {
                res.send(user)
            }).catch(next);
    })
    .patch('/:id', (req, res, next) => {
        if(req.user.id !== +req.params.id && !req.user.admin) {
            return next({
                status: 403,
                message: 'You can only edit your own account. (Unless you are an admin)'
            });
        }
        req.body.id = +req.params.id;
        const user = updateUser(req.body);
        res.send(user);
    })
    .delete('/:id', (req, res, next) => {
        deleteUser(+req.params.id);
        res.send({message: 'User removed'});
    });

module.exports = router;
