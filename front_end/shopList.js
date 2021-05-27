//-------Affichage dynamique de tous les articles disponibles à la vente depuis l'API/cameras-----------

//création d'une requette HTTP avec la méthode fetch et récupération des réponses avec then et catch
fetch("http://localhost:3000/api/cameras")

    //formatage de la réponse au format json
    .then(response => 
    {
        console.log(response);
        return response.json()
    })
    
    //récupération des données si la promesse est résolue
    .then(data => 
    {
        //création de la boucle qui permet de parcourir tous les élements (article) de l'API (data)
        for (const article of data) 
        {
            //création de l'object templateElement (contenu de la balise <template>)
            const templateElement = document.getElementById("templateArticle")
            //création d'une copie l'object templateElement
            const cloneElement = document.importNode(templateElement.content, true)
            //association clone-contenu pour chaque élement à modifier d'après #id
            cloneElement.getElementById("articleImage").src = article.imageUrl
            cloneElement.getElementById("articleImage").alt = "Cam&eacute;ras vintage " + article.name
            cloneElement.getElementById("articleName").textContent = article.name
            cloneElement.getElementById("articleDescription").textContent = article.description
            cloneElement.getElementById("articlePrice").textContent = article.price / 100 + ".00 €"
            cloneElement.getElementById('articleLink').href = `product.html?id=${article._id}`
            //retourne les données modifiées dans le DOM
            document.getElementById("listArticle").appendChild(cloneElement)
        }
 
    })
    
    //renvoie une alerte sur l'interface utilisateur si la promesse est rejetée
    .catch(error => 
    {
        alert("Erreur de chargement des données :\n"+ error)
    })

