//Affichage dynamique de tous les articles de l'API (cameras) sur la page shopList.html

(async function () {

    //création de la promesse dans l'attente de sa résolution
    const cameras = await getCameras()
    /* console.log(cameras); */

    //création de la boucle qui permet de parcourir tous les élements (article) du tableau (cameras)
    for (article of cameras) {
        const article = cameras
        displayArticle(cameras)
        /* console.log(article); */
    }
})()


function getCameras() {

    //accès à l'API avec la méthode fetch et récupération de la promesse avec then et catch
    return fetch("http://localhost:3000/api/cameras")

        //formatage de la réponse au format json
        .then((response) => {
            console.log(response);
            return response.json()
        })
        //récupération des données si la promesse est résolue
        .then((cameras) => {
            /* console.log(cameras); */
            return cameras
        })
        // renvoie une alerte sur l'interface utilisateur si la promesse est rejetée
        .catch((error) => {
            alert('Erreur : ' + err)
        })
}


function displayArticle(cameras) {

    //création de l'object templateElement (contenu de la balise template coté html)
    const templateElement = document.getElementById("templateArticle")
    /* console.log(templateElement.content); */

    //création d'une copie l'object templateElement
    const cloneElement = document.importNode(templateElement.content, true)
    /* console.log(cloneElement); */

    //association clone-contenu pour chaque élement à modifier selon #id html
    cloneElement.getElementById("articleImage").src = article.imageUrl
    cloneElement.getElementById("articleImage").alt = "cameras vintage " + article.name
    cloneElement.getElementById("articleTitle").textContent = article.name
    cloneElement.getElementById("articleDescription").textContent = article.description
    cloneElement.getElementById("articlePrice").textContent = `${article.price / 100}.00 €`
    /* console.log(article.price); */

    //retourne les données modifiées dans le html
    document.getElementById("listArticle").appendChild(cloneElement)
}