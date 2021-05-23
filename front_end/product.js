//-------------------Affichage dynamique du produit précédement sélectionné depuis shopList.html et envoi au panier après personnalisation-----------

//récupération de l'id (?id=) dans l'URL de la page
const searchId = new URL(window.location.href).searchParams.get("id")

//récupération des données du produits à afficher selon cet id
fetch(`http://localhost:3000/api/cameras/${searchId}`)

    .then(response => 
        {
            console.log(response);
            return response.json()
        })

    .then(data => 
        {
            //-----------------------Affichage des données produit---------------------
            //récupération et implémentation des données dans le DOM si la promesse est résolue
            document.getElementById("productImage").src = data.imageUrl
            document.getElementById("productImage").alt = "Cam&eacute;ras vintage " + data.name
            document.getElementById("productName").textContent = data.name
            document.getElementById("productDescription").textContent = data.description
            document.getElementById("productPrice").textContent = `${data.price / 100}.00 €`
            document.getElementById("productId").textContent = `Référence : ${searchId}`


            //-----------------------Affichage de la personnalisation---------------------
            //création d'une boucle qui permet de personnaliser le produit (option = lense) et implémentation 
            data.lenses.forEach(lense => 
                {
                    const productOption = document.createElement("option")
                    document.getElementById("productOption").appendChild(productOption).innerHTML = lense
                    productOption.value = `${lense}`
                })

            
            //-----------------------Ajout au panier du produit---------------------
            //Ecoute du bouton Ajouter au panier et récupération des valeurs pour envoie dans le localStorage
            document.getElementById("addProduct").addEventListener("click", (event)=>
                {
                    //Bloque la gestion des clics par défaut (chargement de la page)
                    event.preventDefault()
            

                    //création de l'object qui récupère les valeurs du produit ajouté au panier
                    const productQuantity = document.getElementById("productQuantity")
                    const dataProductAdding =
                    {
                        productName: data.name,
                        productId: `${searchId}`,
                        productOption: productOption.value,
                        productQuantity: productQuantity.value,
                        productPrice: `${data.price / 100}.00 €`
                    }


                    //-----------------------Stockage dans le localStorage---------------------
                    //Stockage et lecture des objects JSON avec les méthodes stringify et parse
                    let retrievingLocalStorage = JSON.parse(localStorage.getItem("products"))

                    let storingLocalStorage = () =>
                        {
                            retrievingLocalStorage.push(dataProductAdding)
                            localStorage.setItem("products", JSON.stringify(retrievingLocalStorage))
                        }
                    
                    //vérifie la présence de produits dans le localStorage puis (après bouclage) stockage des valeurs des produits supplémentaires 
                    if (retrievingLocalStorage) 
                        {
                            storingLocalStorage();
                        }
                    //si pas de produit, création d'un tableau et stockage des valeurs du produit ajouté
                    else
                        {
                            retrievingLocalStorage = [];
                            storingLocalStorage();
                        }
                })
        })

    .catch(error => 
        {
            alert("Erreur de chargement des données :\n"+ error)
        })


