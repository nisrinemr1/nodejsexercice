const fs = require("fs") 
//fs = file systeme. Permet de : Lire des fichiers, Écrire dans des fichiers, Copier des fichiers, Renommer des fichiers, Supprimer des fichiers. On a déclarer la file système 

fs.readFile("./content/ndatas.json", (error, datas) =>{
    //lire le fichier json ("chemin du fichier", (paramètre) puis on y met une fonction fléchés)
    if(error != null) return
    //si

    datas = datas.toString() //rendre le data en string.
    datas = JSON.parse(datas) //parser le json qui a la data.

    console.log(datas)


})
