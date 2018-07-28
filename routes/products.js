const router = require('express').Router();
const ProductService = require('../services/ProductService');


router.get('/:productId/:query', (req, res) => {
    const limit = req.query
    console.log("router: ",req.query)
    product(req.params.productId).findAllProducts(limit)
    .catch(
        err => res.status(500).json({error: err + ''})
    )
    .then(
        products => {
            res.status(200).render('index', {products:JSON.stringify(products)})
        }
    )
})

const product = (prod) => new ProductService(prod);

module.exports = router