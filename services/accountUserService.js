const db = require('../models/index').sequelize;
const AccountUser = db.model('account_members');

class AccountUserService {

    constructor(userId) {
        this._userId = userId;
    }

    findAllUsers(query) {
        console.log("query: ",query)
        console.log("constructor: ",this._userId)
        return this.checkUser()
        .then(
            (err) => {
                if (!err) throw new ReferenceError('User not found.')
                console.log('test')
                switch (Object.keys(query)[0]) {
                    case 'limit':
                        return AccountUser.findAll({ limit: query.limit })
                    default:
                        return AccountUser.findAll()
                }
            }
        )
    }

    checkUser() {
        console.log("In checkUser")
        if (!this._userId){
            return new Promise((resolve, reject) => {
            return resolve(false)
        })}
            console.log("uid to check:",this._userId)
        return AccountUser.findOne({ where: { uid: this._userId} })
            .then(
                (user) => user
            ).catch(
                (error) => false
            )
    }
}

module.exports = AccountUserService;