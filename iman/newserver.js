const http = require("http")
const url = require("url")
const fs = require("fs")

const server = http.createServer((req, res) => {  // serveur => comme apache

    let urlParse = url.parse(req.url, true)

    let contentRes = ""
    let statusCode = 500
    let head = { "Content-Type" : "text/html; charset=utf-8" }

    if(req.method == "GET")
    {

        if(urlParse.pathname == "/")
        {
            statusCode = 200
            contentRes = `<h1>Pages etres vivants</h1>
            <a href='/etreshumains'>Vers les etres humains</a>`

            res.writeHead(statusCode, head)
            res.write(contentRes)
            res.end()
        }
        fs.readFile("./json/newdatas.json", (error, datas) => {
            if(error != null) return

            datas = datas.toString()
            datas = JSON.parse(datas)

            datas.etresvivants.forEach((item_etrevivant) => {

                console.log(item_etrevivant);
                console.log("  " + item_etrevivant.name)
                
                item_etrevivant.etreshumains.forEach((item_etrehumain) =>
                {
                    console.log("  " + item_etrehumain.name)

                    item_etrehumain.femmes.forEach((item_femme) => {
                    console.log("  " + item_femme.name)
                        
                    item_femme.milong.forEach((item_milong) => {
                        console.log("---____-----" + item_milong);
                    })
                    })
                })
            })

        })
    }
})
server.listen(3001)