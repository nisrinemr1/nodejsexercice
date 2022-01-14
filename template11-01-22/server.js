//on ne touche pas le package-lock.json ! 
//besoin du git ignore parce que sinon github n'acceptera pas de pusher les modules node ou react
//importer l'http
const http = require('http');
const path = require('path');
const ejs = require('ejs');
const { networkInterfaces } = require('os');


//methode pour utiliser ejs
const renderView = (res, viewName, data = {}) =>{//data vide sinon site ne fonctionnera pas.
    
    //methode pour générer le nom du fichier avec les séparateurs adaptés
    // => évite les conflits entre les chemins windows et unix.
    const fileName = path.resolve(__dirname, 'views', 'pages', viewName + '.ejs');
    console.log(fileName);

    //utilisation du moteur de template EJS  pour convertir le fichier ejs en chaine de charactere contenant l'html
    ejs.renderFile(fileName, data, (error, contentHtml) => {
        //on demande a ejs de transformer le demo.ejs en chaine de caractère. Donc il traduira directement

        res.writeHead(200);
        res.write(contentHtml);
        res.end();
    });

};

//creation  d'un routeur pour faire un système de routage simple
const router = {
    "/" : (req, res) =>{
        const now = new Date();
        const optionsDate = {year: 'numeric', month: 'long', day:'numeric'};

        const dataHome = {
            dateDuJour: now.toLocaleDateString('fr-be', optionsDate)
        };

       renderView(res, 'home', dataHome);
    },
    "/about" : (req, res) =>{

        renderView(res, 'about');
    }

}
//template jade : un autre type de code! le mieux : ejs et moustache


//creation du serveur
const server = http.createServer((req, res) =>{
    //loger la requête et la méthode
    console.log(`Requete : [${req.method}] ${req.url}`);

    //systeme de routing et en dessous de ça il y aura la gestion des erreurs
    if(req.url in router){//si la requete url est comme celle du router . C'est une version simple. Et pour plus de complexiter il faut que ce soit avec une framwork. si il connait l'url, il va executer ce qu'il y a dans le router
        const action = router[req.url];

        return action(req,res); //mettra fin à la fonction

    }

    //Renvoie d'une page 404
    res.writeHead(404);
    res.write(`<h1>Zone des perdus  >:D`);
    res.end();//va afficher la 404 directement

});

//ouverture du serveur dans le port 3000
server.listen(3000, () => console.log("Start server on port 3000"));