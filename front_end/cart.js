//-------------------Affichage dynamique du panier contenant les produits précédement sélectionnés-----------

//Récupération du contenu du localStorage en vue de son implémentation 
let retrievingLocalStorage = JSON.parse(localStorage.getItem("product_id"))


//Affichage d'un texte à la place du panier et masquage du formulaire si le localStorage est vide
if (retrievingLocalStorage === null) 
{
    document.querySelector("#displayEmptyCart").className = "visible"
    document.querySelector("#displayFullCart").className = "invisible"
    document.querySelector("#deleteOrderedProducts").className = "invisible"
    document.querySelector("#orderForm").className = "invisible"
} 

else 
{
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
        cloneElement.getElementById("orderedProductPriceUnit").textContent = parseInt(dataProductretrieving.productPrice, 10) + ".00 €"
        cloneElement.getElementById("orderedProductPriceTotal").textContent = parseInt(dataProductretrieving.productPrice, 10) * dataProductretrieving.productQuantity + ".00 €"

        //implémentation des données dans le DOM (panier)
        document.getElementById("listOrderedProducts").appendChild(cloneElement)
    }


    //-----------------------Calcul du montant total du panier-----------------------
    //déclaration d'un tableau qui va contenir les futurs prix totaux (de chaque produit) en vue du calcul du montant total
    let totalArray = []
    
    for (const dataProductretrieving of retrievingLocalStorage) 
    {
        //intégration dans le tableau des prix totaux (prix unitaire x quantité)
        totalArray.push(parseInt(dataProductretrieving.productPrice, 10) * dataProductretrieving.productQuantity)
    }
        
    //somme des prix totaux obtenus dans le tableau avec la méthode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalElement = totalArray.reduce(reducer)
    console.log(totalElement);

    //implémentation de la somme dans le DOM
    document.getElementById("totalOrderedProducts").textContent = totalElement + ".00 €"


    //-----------------------Supression des produits du panier-----------------------
    let deleteProduct = document.getElementById("deleteOrderedProducts")
    
    deleteProduct.addEventListener("click", (event)=>
    {
        event.preventDefault()
        
        //supprime l'ensemble des produits contenu dans le localStorage
        localStorage.removeItem("product_id")

        //fenetre d'alerte après suppression
        alert("L'ensemble des articles ont été supprimés du panier")

        //rechargement de la page panier
        window.location.href = "cart.html"  
    })

}


//-------------------Validation des données des données saisies dans le formulaire de commande-----------
//Ecoute du bouton Valider ma commande et validation des données saisies puis envoie dans LocalStorage
document.getElementById("validateOrderedForm").addEventListener("click", (event)=>
{
    event.preventDefault()
    
    //Création de l'object qui récupère les données saisies dans les champs
    const dataFormAdding =
    {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value
    }
        
    //Vérification du format des données saisies grâce aux expressions régulières
    const nameRegex = /^[A-Za-zàâçéèêëîïôûùü '-]{2,30}$/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const cityRegex = /^[A-Za-z0-9-zàâçéèêëîïôûùü '-]{2,30}$/

    if (!(
        nameRegex.test(dataFormAdding.firstName)
        && nameRegex.test(dataFormAdding.lastName)
        && emailRegex.test(dataFormAdding.email)
        && dataFormAdding.address.length > 3
        && cityRegex.test(dataFormAdding.city)
      ))
    {
        alert("Veuillez remplir tous les champs du formulaire et entrer un email valide");
        return false;
    } 
    else
    {
        localStorage.setItem("contact", JSON.stringify(dataFormAdding))
    }
})