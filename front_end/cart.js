//-------------------Affichage dynamique du panier contenant les produits précédement sélectionnés avec formulaire de commande-----------

//récupération puis implémentation du contenu du localStorage
let retrievingLocalStorage = JSON.parse(localStorage.getItem("products"))
console.log(retrievingLocalStorage)

    //création de la boucle qui permet de parcourir tous les produits du tableau du localStorage
    for (const dataProductretrieving of retrievingLocalStorage) {

        //création et clone de l'object templateElement (contenu de la balise html <template>)
        const templateElement = document.getElementById("templateOrderedProduct")
        const cloneElement = document.importNode(templateElement.content, true)

        //association clone-data pour chaque produit commandé
        cloneElement.getElementById("orderedProductName").textContent = dataProductretrieving.productName + " - Objectif  " + dataProductretrieving.productOption
        cloneElement.getElementById("orderedProductQuantity").textContent = dataProductretrieving.productQuantity
        cloneElement.getElementById("orderedProductPrice").textContent = dataProductretrieving.productPrice

        //implémentation des données dans le DOM (panier)
        document.getElementById("listorderedProduct").appendChild(cloneElement)
    }

//calcul du montant total des produits commandés