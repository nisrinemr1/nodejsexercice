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

    console.log(datas)

})