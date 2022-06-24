const Order = require('../../../models/order')

function orderControll() {
    return {
        async store(req, res) {
            try {
                //console.log('checkout')
                const { phone, address } = req.body

                // if (!phone || address) {
                //     req.flash('error', 'All fields are required')
                //     return res.redirect('/cart')
                // }


                let order = await Order.create({
                    customerId: req.user._id,
                    items: JSON.stringify(req.session.cart.items),
                    phone,
                    address
                })

                await order.save().then(result => {
                    req.flash('success', "Order placed successfully")
                    return res.redirect('/')
                }).catch(err => {
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/cart')
                })

                // req.flash('success', "Order placed successfully")
                // return res.redirect('/home')

            } catch (err) {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            }


        }
    }
}
module.exports = orderControll