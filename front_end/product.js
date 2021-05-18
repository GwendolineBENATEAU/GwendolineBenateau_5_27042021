//-------------------Affichage dynamique du produit précédement sélectionné depuis shopList.html et envoi au panier-----------

//récupération de l'id (?id=) dans l'URL de la page
const searchId = new URL(window.location.href).searchParams.get("id")
console.log(searchId);

//récupération des données du produits à afficher selon cet id
fetch(`http://localhost:3000/api/cameras/${searchId}`)

    .then(response => 
        {
            console.log(response);
            return response.json()
        })

    .then(data => 
        {
            //récupération et implémentation des données dans le DOM si la promesse est résolue
            document.getElementById("productImage").src = data.imageUrl
            document.getElementById("productImage").alt = "Cam&eacute;ras vintage " + data.name
            document.getElementById("productName").textContent = data.name
            document.getElementById("productDescription").textContent = data.description
            document.getElementById("productPrice").textContent = `${data.price / 100}.00 €`
            document.getElementById("productId").textContent = `Référence : ${searchId}`


            //création d'une boucle qui permet de personnaliser le produit (option = lense) et implémentation 
            data.lenses.forEach(lense => 
                {
                    const productOption = document.createElement("option")
                    document.getElementById("productOption").appendChild(productOption).innerHTML = lense
                    productOption.value = `${lense}`
                })


            //Ecoute du bouton Ajouter au panier et récupération des valeurs à envoyer
            document.getElementById("addProduct").addEventListener("click", (event)=>
            {
                event.preventDefault()
           
                const productQuantity = document.getElementById("productQuantity")

                const dataProductSelect =
                {
                    productName: data.name,
                    productId: searchId,
                    productOption: productOption.value,
                    productQuantity: productQuantity.value,
                    productPrice: `${data.price / 100}.00 €`
                }
                console.log(dataProductSelect);
            })


            //Stockage des valeurs dans le localStorage
            

        })

    .catch(error => 
        {
            alert("Erreur de chargement des données :\n"+ error)
        })


