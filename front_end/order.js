//-------------------Affichage dynamique du numéro de commande et du montant total du panier -----------

//Récupération du contenu du localStorage en vue de l'implémentation
// pour le numéro de commande
document.getElementById("orderId").textContent = JSON.parse(localStorage.getItem("orderId"))
// pour le montant total du panier
document.getElementById("orderPrice").textContent = JSON.parse(localStorage.getItem("orderPrice"))

//nettoyage du localStorage une fois le retour à l'accueil
document.getElementById("returnIndex").addEventListener("click", (event) => 
{
    event.preventDefault()

    window.location.href = "index.html"
    localStorage.removeItem("orderId")
    localStorage.removeItem("orderPrice")
})