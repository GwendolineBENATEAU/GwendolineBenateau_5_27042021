//------------------- Affichage dynamique de la page de confirmation de commande avec numéro de commande et du montant total du panier -----------

//Récupération du contenu du localStorage en vue de l'implémentation
// pour le numéro de commande
document.getElementById("orderId").textContent = JSON.parse(localStorage.getItem("orderId"))
// pour le montant total du panier
document.getElementById("orderPrice").textContent = JSON.parse(localStorage.getItem("orderPrice"))


//Redirection vers la page d'accueil si la commande n'est pas terminée (pas de numéro de commande)
if ((JSON.parse(localStorage.getItem("orderId")) === null)) 
{
    document.location.href = "index.html"
} 
//Nettoyage du localStorage dès que l'utilisateur quitte la page de confirmation de commande
else 
{
    addEventListener("unload", (event) => {
        event.preventDefault()

        window.location.href = "index.html"
        localStorage.removeItem("contact")
        localStorage.removeItem("products")
        localStorage.removeItem("orderId")
        localStorage.removeItem("orderPrice")
        
    })
}