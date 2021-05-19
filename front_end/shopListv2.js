//-------Affichage dynamique de tous les articles de l'API/cameras sur la page shopList.html-----------

(async () => {

    //création de la promesse dans l'attente de sa résolution
    const articles = await getArticles()
    /* console.log(articles); */

    //création de la boucle qui permet de parcourir tous les élements (article) du tableau (articles)
    //et déclaration de la fonction qui va permettre l'affichage dans le DOM
    for (article of articles) {
        /* console.log(article); */
        displayArticle()
    }
})()


function getArticles() {

    //appel à l'API avec la méthode fetch (au lieu de objet XMLHttpRequest pour AJAX) et récupération de la promesse avec then et catch
    return fetch("http://localhost:3000/api/cameras")

        //formatage de la réponse au format json
        .then(response => {
            console.log(response);
            return response.json()
        })
        //récupération des données si la promesse est résolue
        .then(articles => {
            /* console.log(articles); */
            return articles
        })
        //renvoie une alerte sur l'interface utilisateur si la promesse est rejetée
        .catch(error => {
            alert('Erreur de chargement des données : ' + error)
        })
}


function displayArticle() {

    //création de l'object templateElement (contenu de la balise template coté html)
    const templateElement = document.getElementById("templateArticles")
    /* console.log(templateElement.content); */

    //création d'une copie l'object templateElement
    const cloneElement = document.importNode(templateElement.content, true)
    /* console.log(cloneElement); */

    //association clone-contenu pour chaque élement à modifier selon #id html
    cloneElement.getElementById("articlesImage").src = article.imageUrl
    cloneElement.getElementById("articlesImage").alt = "Cam&eacute;ras vintage " + article.name
    cloneElement.getElementById("articlesTitle").textContent = article.name
    cloneElement.getElementById("articlesDescription").textContent = article.description
    cloneElement.getElementById("articlesPrice").textContent = `${article.price / 100}.00 €`
    /* console.log(article.price); */

    //retourne les données modifiées dans le html
    document.getElementById("listArticles").appendChild(cloneElement)
}