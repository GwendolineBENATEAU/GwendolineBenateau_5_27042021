//-------------------Affichage dynamique du panier contenant les produits précédement sélectionnés avec formulaire de commande-----------

//Récupération du contenu du localStorage en vue de son implémentation 
let retrievingLocalStorage = JSON.parse(localStorage.getItem("products"))
console.log(retrievingLocalStorage)


//Affichage d'un texte à la place du panier et masquage du formulaire si le localStorage est vide
if (retrievingLocalStorage === null) 
{
    document.querySelector("#displayEmptyCart").className = "visible"
    document.querySelector("#displayFullCart").className = "table table-striped invisible"
    document.querySelector("#deleteOrderedProducts").className = "btn btn-danger invisible"
    document.querySelector("#orderForm").className = "card card-outline-secondary bg-light my-4 invisible"
} 
// Sinon implémentation des produits présents dans le localStorage
else 
{
    document.querySelector("#displayEmptyCart").className = "invisible"
    document.querySelector("#displayFullCart").className = "table table-striped visible"
    document.querySelector("#deleteOrderedProducts").className = "btn btn-danger visible"
    document.querySelector("#orderForm").className = "card card-outline-secondary bg-light my-4 visible"


    //-----------------------Affichage des produits dans le panier-----------------------
    //création de la boucle qui permet de parcourir tous les produits du localStorage
    for (const dataProductretrieving of retrievingLocalStorage) 
    {
        //création et clone de l'object templateElement (contenu de la balise html <template>)
        const templateElement = document.getElementById("templateOrderedProducts")
        const cloneElement = document.importNode(templateElement.content, true)

        //association clone-data pour chaque produit commandé
        cloneElement.getElementById("orderedProductName").textContent = dataProductretrieving.productName + " - Objectif  " + dataProductretrieving.productOption
        cloneElement.getElementById("orderedProductQuantity").textContent = dataProductretrieving.productQuantity
        cloneElement.getElementById("orderedProductPriceUnit").textContent = dataProductretrieving.productPrice + ".00 €"
        cloneElement.getElementById("orderedProductPriceTotal").textContent = dataProductretrieving.productPrice * dataProductretrieving.productQuantity + ".00 €"

        //implémentation des données dans le DOM (panier)
        document.getElementById("listOrderedProducts").appendChild(cloneElement)
    }


    //-----------------------Calcul du montant total du panier-----------------------
    //déclaration d'un tableau qui va contenir les futurs prix totaux (de chaque produit) en vue du calcul du montant total
    let totalArray = []
    
    for (const dataProductretrieving of retrievingLocalStorage) 
    {
        //intégration dans le tableau des prix totaux (prix unitaire x quantité)
        totalArray.push(dataProductretrieving.productPrice * dataProductretrieving.productQuantity)
    }
        
    //somme des prix totaux obtenus dans le tableau avec la méthode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalElement = totalArray.reduce(reducer)
    console.log(totalElement);

    //implémentation de la somme dans le DOM
    document.getElementById("totalOrderedProducts").textContent = totalElement + ".00 €"


    //-----------------------Supression des produits du panier-----------------------
    let deleteElement = document.getElementById("deleteOrderedProducts")
    
    deleteElement.addEventListener("click", (event)=>
    {
        event.preventDefault()
        
        //supprime l'ensemble des produits contenu dans le localStorage
        localStorage.removeItem("products")

        //fenetre d'alerte après suppression
        alert("L'ensemble des articles ont été supprimés du panier")

        //rechargement de la page panier
        window.location.href = "cart.html"  
    })

}