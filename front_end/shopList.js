
(async function () {
    const articles = await getArticles()

    for (article of articles) {
        const article = articles
        displayArticle(articles)
    }
})()


function getArticles() {

    return fetch("http://localhost:3000/api/cameras")

        .then((response) => {
            console.log(response);
            return response.json()
        })

        .then((articles) => {
            /* console.log(articles); */
            return articles
        })

        .catch((error) => {
            alert('Erreur : ' + err)
        })
}


function displayArticle(articles) {
    /* console.log(article); */

    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)
    /* console.log(templateElt.content); */

    cloneElt.getElementById("articleImg").src = article.imageUrl;
    cloneElt.getElementById("articleTitle").textContent = article.name
    cloneElt.getElementById("articleDescription").textContent = article.description
    cloneElt.getElementById("articlePrice").textContent = `${article.price / 100}.00 €`;
    /* console.log(article.price); */

    document.getElementById("listArticle").appendChild(cloneElt)
}