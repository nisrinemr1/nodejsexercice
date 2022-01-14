//on ne touche pas le package-lock.json ! 
//besoin du git ignore parce que sinon github n'acceptera pas de pusher les modules node ou react
//toujours installer ejs dans projet si on va l'utiliser! : sudo npm install ejs
//importer l'http
const http = require('http');
const path = require('path'); //chemin qui apparet dans l'url
const ejs = require('ejs');


//methode pour utiliser ejs. Il faudra mettre le renderView et celui-ci doit contenir 3 paramètres.
const renderView = (res, viewName, data = {}) =>{//data vide sinon site ne fonctionnera pas. Response + nom de la view + la data (vide)!
    
    //methode pour générer le nom du fichier avec les séparateurs adaptés
    const fileName = path.resolve(__dirname, 'views', 'pages', viewName + '.ejs');// => évite les conflits entre les chemins windows et unix(linux/mac).
    console.log(fileName); ///Users/bintmhamed/Documents/i3/firstCodeSteps/nodeJs/suiteAurelien11-1-22 /template11-01-22/views/pages/home.ejs (aka mac)

    //utilisation du moteur de template EJS  pour convertir le fichier ejs en chaine de charactere contenant l'html afin qu'ejs puisse le traduire et afficher ce qu'on souhaite depuis les view pages
    ejs.renderFile(fileName, data, (error, contentHtml) => { //affichage du contenu 
        //on demande a ejs de transformer le demo.ejs en chaine de caractère. Donc il traduira directement de l'html en caractère qui lui permettra d'afficher dans le server

        res.writeHead(200);
        res.write(contentHtml);
        res.end();
        //pour eviter la répitition de ça pour l'affichage de pages
    });
};

//creation  d'un routeur pour faire un système de routage simple comme en php. 
const router = { // comme le controller
    "/" : (req, res) =>{ // comme la page qu'on met dans le controller qui dirigera ver la page dans les view. Sauf qu'on que c'est que si l'utilisateur met / dans l'url
        const now = new Date();
        const optionsDate = {year: 'numeric', month: 'long', day:'numeric'};

        const dataHome = {
            dateDuJour: now.toLocaleDateString('fr-be', optionsDate), 
            isDay: now.getHours() < 18 && now.getHours() > 8
            //optionsDate permet de mettre mois en long!
            //après la virgule on ajoute if isDay now.getHours est inférieur à 18 && now.getHoours() est superieur à 8h. Ici on met directement le resultat de la fonction. 
        };

       renderView(res, 'home', dataHome); //récuperer la page home depuis les views ! 
    },

    "/about" : (req, res) =>{

        renderView(res, 'about');
    },

    "/products" : (req, res) =>{
        //Création d'un tableau pour une liste de produits. Comme une base de donnée ou une API.
        const category = "Fruit";
        const products = [
            {name : 'Pomme', price : 3.14},
            {name : 'Poire', price: 2.14},
            {name : 'Lychee', price: 1.14},
            {name : 'Fruit du dragon', price: 6.14}
        ];

        renderView(res, 'products', { category, products });//creation d'un objet products qui contient products. Dans ce cas de figure, pour eviter de mettre {products: products}, on peut mettre uniquement {products}. Ce qui est souvent fait en js c'est créer un objet qui a pour nom de gategorie, puis le produits.  
    }
};
//template jade : un autre type de code! le mieux : ejs et moustache


//creation du serveur afin de pouvoir afficher le contenu de l'html dans le server 3000
const server = http.createServer((req, res) =>{
    //loger la requête et la méthode
    console.log(`Requete : [${req.method}] ${req.url}`);

    //systeme de routing et en dessous de ça il y aura la gestion des erreurs
    if(req.url in router){//si la requete url est comme celle du router . C'est une version simple. Et pour plus de complexiter il faut que ce soit avec une framwork. si il connait l'url, il va executer ce qu'il y a dans le router
        const action = router[req.url];

        action(req,res); //mettra fin à la fonction
        //Si la requete de l'url est la même que celui qu'on a mit dans le router en ligne 29, le code le remontra afin d'afficher la page demandé
        return;
    }

    //Renvoie d'une page 404
    res.writeHead(404);
    res.write(`<h1>Zone des perdus  >:D`);
    res.end();//va afficher la 404 directement
    //Sinon, il renverra une page 404 s'il l'url ne correspond pas à ce qu'il y a dans le rooter. 
});

//ouverture du serveur dans le port 3000
server.listen(3000, () => console.log("Start server on port 3000"));