const db = require('../models/index').sequelize;
const Product = db.model('store_inventory');

class ProductService {

    constructor(ProductId) {
        this._ProductId = ProductId;
    }

    findAllProducts(query) {
        console.log("in findall: query.limit")
        return this.checkProduct()
        .then(
            (err) => {
                if (!err) throw new ReferenceError('Product not found.')
                console.log('test')
                switch (Object.keys(query)[0]) {
                    case 'limit':
                        return Product.findAll({ limit: query.limit })
                    default:
                        return Product.findAll()
                }
            }
        )
    }

    checkProduct() {
        console.log("In checkProduct", this._ProductId)
        if (!this._ProductId){
            return new Promise((resolve, reject) => {
            return resolve(false)
        })}
            console.log(this._ProductId)
        return Product.findOne({ where: { id: this._ProductId} })
            .catch(
                (error) => false
            ).then(
                (Product) => Product
            )
    }
}

module.exports = ProductService;