const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderControll = require('../app/http/controllers/customers/orderControll')
const orderController = require('../app/http/controllers/orderController')
const subController = require('../app/http/controllers/subController')
const guest = require('../app/http/middleware/guest')
const viewcontroller = require('../app/http/controllers/viewcontroller')

function initRoutes(app) {
    app.get('/', homeController().home)
    app.get('/login', guest, authController().login)
    app.post('/login-page', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register-page', authController().postRegister)
    app.post('/logout', authController().logout)


    app.get('/subcate', subController().subcate)
        //app.get('/viewfood', viewcontroller().viewfood)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)
    app.post('/checkout', orderControll().store)
    app.get('/myorder', orderController().myorder)



}


module.exports = initRoutes