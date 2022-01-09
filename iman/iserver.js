const fs = require('fs')
// fs= file systeme. Permet de : Créer des fichiers
// Lire des fichiers
// Écrire dans des fichiers
// Copier des fichiers
// Renommer des fichiers
// Supprimer des fichiers

// on a declaré
fs.readFile("./content/idatas.json", (error, datas) => {
    // lire fichier json ("chemin du fichier", (parametre) puis on y ajoute une fonction flechée)
    if (error != null) return null

    datas= datas.toString() // rendre le data en string
    datas = JSON.parse(datas) // rendre le dossier JSON

  //  console.log(datas) //avoir un aperçu du résultat avec la ligne 9 et 10

    datas.test.forEach((item_categ) => {
        console.log("==" + item_categ.name);

        item_categ.secondtest.forEach((item_subcateg) => {
            console.log("--" + item_subcateg.name);

            item_subcateg.thirdtest.forEach((item_subsubcateg) => {
                console.log("__" + item_subsubcateg.name);

                item_subsubcateg.fourthtest.forEach((item_forthcateg) => {
                    console.log("_-_-" + item_forthcateg.name);

                    
                
                })
            })
        })

      
    })

})