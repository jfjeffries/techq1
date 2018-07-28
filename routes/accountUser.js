const router = require('express').Router();
const AccountUserService = require('../services/accountUserService');

router.get('/users', (req, res) => {
    const limit = req.query
    aus(req.params.id).findAllUsers(limit)
    .catch(
        err => res.status(500).json({error: err + ''})
    )
    .then(
        users => {
            res.status(200).json(users)
        }
    )
})

router.get('/:id/users/:query', (req, res) => {
    const limit = req.query
    aus(req.params.id).findAllUsers(limit)
    .catch(
        err => res.status(500).json({error: err + ''})
    )
    .then(
        users => {
            res.status(200).render('index', {users:JSON.stringify(users)})
        }
    )
})

const aus = (user) => new AccountUserService(user);

module.exports = router;