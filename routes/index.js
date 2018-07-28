module.exports = (app) => {
    app.use('/api/auth', require('./accountUser'));
    app.use('/api/purchase', require('./memberPurchase'));
    app.use('/api/products', require('./products'))
}   



//  http://localhost:3000/api/auth/02c876b0-9cf2-498a-bf74-a4a5609ac82d/users/query?limit=4

//  http://localhost:3000/api/products/1/query?limit=5