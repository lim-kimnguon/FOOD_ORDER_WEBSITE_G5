const axios = require("axios")

function subController() {
    return {
        async subcate(req, res) {
            const { cat_id } = req.query
            const products = await axios.get(`http://localhost:3001/product/all_populate?cat_id=${cat_id}`)
                // console.log("products : ", products.data.data);
            res.render("subcate", { data: products.data.data })
        },
    }
}
module.exports = subController