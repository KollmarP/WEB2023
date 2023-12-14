const express = require('express');
const { getAll, getUserByID, getUserByEmail, searchUserByName, createUser, updateUser, deleteUser, login, seed, registerUser, generateJWT, verifyJWT } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router.get('/', requireUser(true), (req, res, next) => {
    res.send(getAll());
})
.get('/search', requireUser() , (req, res, next) => {
    const results = searchUserByName(req.query.q);
    res.send(results);
})
.get('/:id', requireUser(), (req, res, next) => {
    const user = getUserByID(+req.params.id);
    res.send( user );
})
.post('/', requireUser(true), (req, res, next) => {
    const user = createUser(req.body);
    res.send(user);
})
.post('/register', (req, res, next) => {
    const user = registerUser(req.body);
    res.send(user);
})
.post('/login', (req, res, next) => {
    login(req.body.email, req.body.password)
    .then(user => {
        res.send(user);
    }).catch(next)
})
.patch('/:id', requireUser(), (req, res, next) => {
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
.delete('/:id', requireUser(true), (req, res, next) => {
    deleteUser(+req.params.id);
    res.send({message: 'User removed'});
});

module.exports = router;
