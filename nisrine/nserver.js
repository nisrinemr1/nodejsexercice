const fs = require("fs") 
//fs = file systeme. Permet de : Lire des fichiers, Écrire dans des fichiers, Copier des fichiers, Renommer des fichiers, Supprimer des fichiers. On a déclarer la file système 

fs.readFile("./content/ndatas.json", (error, datas) =>{
    //lire le fichier json ("chemin du fichier", (paramètre) puis on y met une fonction fléchés)
    if(error != null) return
    //si

    datas = datas.toString() //rendre le data en string.
    datas = JSON.parse(datas) //parser le json qui a la data.

    /* console.log(datas) *///avoir un apperçu du resultat juste avec la ligne 9 et 10

    datas.test.forEach((item_categ) => { //demander à Loïc 
        console.log(" " + item_categ.name)

       item_categ.secondtest.forEach((item_subcateg) =>{
           console.log("   " + item_subcateg.name)

           item_subcateg.thirdtest.forEach((item_subsubcateg) =>{
               console.log("      "  + item_subsubcateg.name)

               item_subsubcateg.fourthtest.forEach((item_fourthcateg) => {
                   console.log("_________" + item_fourthcateg.name)
               })
           })
       })
    });
})
