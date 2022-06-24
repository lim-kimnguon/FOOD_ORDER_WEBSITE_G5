function orderController() {
    return {
        myorder(req, res) {
            res.render('myorder')
        }
    }
}
module.exports = orderController