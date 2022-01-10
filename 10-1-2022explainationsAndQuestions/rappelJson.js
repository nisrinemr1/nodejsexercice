/* const fs = require("fs")

fs.readFile("./content/datas.json", (error, datas) => {
   if(error != null) return

    datas = datas.toString()
    datas = JSON.parse(datas)

    datas.categs.forEach((item_categs) => {
        console.log(" " + item_categs.name)
        
        item_categ.subcategs.forEach((item_subcateg)=> {
            console.log("     " + item_subcateg.name)
            
            item_subcateg.product.forEach((item_product) => {
                console.log("        " + item_product.name)
            })
        })
    })
}) */