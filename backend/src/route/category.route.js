const categorycontroller = require("../controller/category.controller")

const Categories = (app) =>{
    app.get('/category',categorycontroller.getAll)
}

module.exports = Categories