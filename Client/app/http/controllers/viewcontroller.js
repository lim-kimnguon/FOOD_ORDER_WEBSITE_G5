const axios = require("axios")

function viewcontroller() {
    return {

        async viewfood(req, res) {
            const { id } = req.query
                //get from product
            const productfood = await axios.get(`http://localhost:3001/product/p_id/${id}`)
            console.log('view product', productfood.data)
            res.render("viewfood", { data: productfood.data.data })

        },
    }
}
module.exports = viewcontroller