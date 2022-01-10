const http = require("http");//require : faire appel a tous les modules dont on aura besoin au fil du code qui sont dans le npm
const url = require("url");
const fs = require("fs");
//const { parse } = require('path'); QUESTION! //TODO:question!!!


const server = http.createServer((req, res) => { //declaration du serveur, afin de créer notre server comme avec mamp/xamp et ont pour paramète la requete et la réponse du serveur

    let urlParse = url.parse(req.url, true); //parser l'url pour avoir un meilleur visuel et qu'il y ait des / 

    //Commencer par si ça ne va pas afin que si c'est le cas, il affiche directement le soucis.
    let contentRes = "";//variable qui affiche le texte
    let statusCode = 500;//Internal Server Error
    let head = { "Content-Type": "text/html; charset=utf-8" };

    // Lecture du fichier
    fs.readFile("./content/datas.json", (errorFile, datas) => { //TODO: DEMANDER AURIEL 2. si on met ecrit mal le ./content de cette ligne, il affichera l'erreur
        //si errorFile is true: 
        if (errorFile) {
            console.log(errorFile);

            //Afficher du coup le text contentRes
            contentRes = "<h1>Erreur du serveur</h1>"
                + "<h2>Le fichier \"data.json\" est en erreur</h2>";

            res.writeHead(500, head); // il affichera dans la console partie network, il affichera le code
            res.write(contentRes);//pour afficher ce qu'il y a ecrit dans le contentRes
            res.end(); //mettre fin à la réponse du processus

            return;  // Met fin au traitement de la fonction et envoyer la réponse à la fonction appellante
        }

        // Conversion des données JSON en JS et donne un tableau plus lisible
        datas = JSON.parse(datas.toString());//parser le fichier json afin qu'il affiche en caractère lisible

        // Traitement de la requete 
        console.log(urlParse);//AFFICHER la datas

        //Traitement de la requete
        if (req.method == "GET") { //si la requete de la methode est en GET, 
            if (urlParse.pathname == "/" || urlParse.pathname == "/accueil") { //si l'urlPars.nomduchemin == / ou a pour urlParse.pathname == /accueil:
                statusCode = 200; //tout vas bien : status 200 
                contentRes = `<h1>Page d'accueil</h1>
            <a href='/categs'>Vers les catégories principales</a>`;

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();
            }
            //Sinon l'url == /contact il affichera les inputs
            else if (urlParse.pathname == "/contact") {
                statusCode = 200;
                contentRes = `<h1>Page de contact en mode GET</h1>
                <input type="text" name="name"><br>
                <input type="text" name="lastname">
                <button type="submit">Envoyer</button>`;

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();
            }
            //Sinon si l'url contien /categs
            else if (urlParse.pathname.includes("/categs")) {
                //•Exemple de regex. On l'utilise pour faciliter le code et pour qu'il soit plus simplifié
                const demoRegex = /test/;//elle ne sert à RIEN :) 


                let error404 = null; //declaration de l'erreur 404 //TODO:Pourquoi déclarer une nouvelle variable error404 maintenant. + pourquoi null :) 


                // Categs : 	localhost:3000/categs
                if (urlParse.pathname === "/categs") {//si l'url === /categs 
                    statusCode = 200;

                    contentRes = `<h1>Vous êtes sur les catégories principales</h1>
                    <ul>`;

                    // On parcours les catégories principal du fichier json et pour chaque itemCateg, on affiche son id puis son name après subcategs
                    datas.categs.forEach(itemCateg => {
                        contentRes += `<li><a href="/categs/${itemCateg.id}/subcategs">${itemCateg.name}</a></li>`;
                    });

                    contentRes += `</ul>`; //TODO : PAS DE Status 200 quand on rentre dans http://localhost:3000/categs/1/subcategs

                    res.writeHead(statusCode, head);
                    res.write(contentRes);
                    res.end();
                }
                else if (/^\/categs\/[1-9][0-9]*\/subcategs(\/[0-9]+)?/.test(urlParse.pathname)) {
                    //dans l'url, on ne pourra pas mettre 01 a la place du 42. Sinon ils faudra retirer le [1-9] et * perrmettra de le repeter autant de fois! Le + c'est pour dire qu'il y a au moin un chiffre ou plus et le ? permet de dire que la parenthèse est optionnel.
                    // Sous-categs :	/categs/42/subcategs
                    // Detail Sub 2 :	/categs/42/subcategs/2
                    // products : 	    /categs/42/subcategs/2/products
                    // product 13 :	    /categs/42/subcategs/2/products?prod=13

                    const urlSplit = urlParse.pathname.split("/");//pour découper l'url regexr grâce au / 
                    //exemple de ce qu'on va recevoir -> ["", categs", "42", "subcategs", "5"] du coup le 42 est donc la deuxième valeur (commence par 0!) Le " " représente le premier slach(localhost:3000).
                    //split  = divise | slice = couper en morceau | splice = retire et ajout d'element //TODO: explication? :)

                    console.log(urlSplit);

                    //•récupération de la categId (avec un parseInt)
                    const categId = parseInt(urlSplit[2]); //on va utiliser un split pour découper l'url du site. Il va transformer le string en chaine de caractère dans un tableau! On a ajouter le parse pour recuperer la valeur et le convertir en number vu que dans le fichier json on a mit dans les id des number et non pas des strings. 

                    //•utilisation de la méthode "find" des array de JS pour obtenir l'objet sur base de la valeur "categId". 
                    const categ = datas.categs.find(c => c.id === categId)//La condition du find est envoyé sous forme de prédicat. 
                    //-> Pour chaque categorie, je teste si l'id (.id) est égale à la "categId". le petit c c'est l'element du premier objet de la catégorie. Faite pour retrouver l'id de l'url dans le fichier json
                    console.log(categ);// TODO: Comment afficher ce console log? 

                    if (categ !== undefined)/* un autre moyen : if(!categ). si il y a une cagorie: si elle est definie*/ {
                        //•Récupération de la sous subCategId (OPTIONNEL!!!!) utilisation de la terner raccourcis du if
                        const subCategId = urlSplit[4] != undefined ?/* est-ce que la categorie dans le split existe */ parseInt(urlSplit[4]) : null;//quatrième index on va le spliter, on le transforme en numer pour le chercher dans le fichier json. Fonction ternaire => le ? est if et : est le else.

                        //si  subCategId pas choisie il affichera ce qu'il y a dans la categ! 
                        if (subCategId === null) {
                            // Sous-categs :	/categs/42/subcategs

                            contentRes += `<h1>Catégorie : ${categ.name}</h1>
                            <p> Ajout du menu! </p>
                            <h2>Veuillez selectionner une sous-catégorie:</h2>
                            <ul>`;
                            categ.subcategs.forEach((subCateg) => {
                                contentRes += `<li>
                                <a href="/categs/${categ.id}/subcategs/${subCateg.id}">
                                ${subCateg.name}
                                </a>
                                </li>`
                            });

                            contentRes += "</ul>";
                            res.writeHead(statusCode, head);
                            res.write(contentRes);
                            res.end();
                        }
                        //Si on clique dessus
                        else {
                            // Detail Sub 2 :	/categs/42/subcategs/2
                            //il va chercher l'id de la sous-categorie dans le fichier json (ligne 112 déjà parsé)
                            const subCateg = categ.subcategs.find(sc => sc.id === subCategId);

                            //si on clique sur subCateg, il affiche ce qu'il y a dans le if
                            if(subCateg != undefined){
                                contentRes = `<h1>La catégorie principal : ${categ.name}</h1>
                                                <h2>Catégorie secondaire : ${subCateg.name}</h2>
                                                <br>
                                                <h3>Liste des produits</h3>
                                                <ul>`;

                                                //pour afficher les produits dans le subCateg
                                subCateg.products.forEach(product =>{
                                    contentRes += `<li>
                                    ${product.name} ${product.price} €
                                    </li>`
                                })

                                contentRes += `</ul>`

                                res.writeHead(statusCode, head);
                                res.write(contentRes);//recuperer la CategID donc ligne 86
                                res.end();
                            }
                            else{
                                error404 = "Sous categorie inconnue";
                            }

                        }
                        // TODO : A FAIRE: 
                        // product 13 :	    /categs/42/subcategs/2/products?prod=13
                    }
                    else {
                        error404 = ":( Catégorie non disponible";
                    }
                }
                else {
                    error404 = "Page invalide";
                }

                // en cas d'erreur => Affichage de la page
                if (error404) {
                    res.writeHead(404, head);
                    res.write("Not found ->" + urlParse.pathname);
                    res.end();
                }
            }
        }
        else if (req.method == "POST") {
            if (urlParse.pathname == "/contact") {
                let body = "";

                req.on('data', (form) => {
                    body += form.toString();
                });

                req.on('end', () => {

                    //ici je suis dans la possibilité de recevoir de mon body (formulaire)
                    // "name=loic&lastname=baudoux"    ====> STRING que je peux parser avec le décodeur
                    // "{ 'name' : 'loic', 'lastname' : 'baudoux'}"     =====> STRING que je peux parser avec JSON.parse()
                    if (body.startsWith("{") && body.endsWith("}"))
                        body = JSON.parse(body);
                    else {

                        /*
                        Convertit "name=loic&lastname=baudoux" en JSON { 'name' : 'loic', 'lastname' : 'baudoux' } utilisable
                        */
                        body = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                    }

                    console.log(body);
                });


                //je traite le formulaire ici
                //et puis je redirige mon client vers autre part.
                statusCode = 303;
                head = { "Location": "/" };

                res.writeHead(statusCode, head);
                res.write(contentRes);
                res.end();


                // statusCode 302 -> redirection standard
                // 307 -> passer de get à post puis redirger vers le meme lien en post 
                // 303 -> passer de get à post puis redirger vers un autre lien en get 
            }
        }
        else {
            statusCode = 404;
            contentRes = `<h1>Je ne connais pas cette méthode HTTP : ${req.method}</h1>`;

            res.writeHead(statusCode, head);
            res.write(contentRes);
            res.end();
        }

    });
});

server.listen(process.env.PORT || 3000);