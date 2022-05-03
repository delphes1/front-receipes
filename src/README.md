#### Vérifier que l'API est en ligne :
`GET http://localhost:5000/status` 
(doit renvoyer `{ success: true }`)
#### Récupérer toutes les recettes :
`GET http://localhost:5000/receipes`
#### Récupérer une recette :
`GET http://localhost:5000/receipes/<id de la recette à récupérer>`
#### Créer une nouvelle recette :
`POST http://localhost:5000/receipes`
(l'objet à insérer sera dans le body de la requête)
#### Modifier une recette existante :
`PUT http://localhost:5000/receipes/<id de la recette>`
(l'objet à insérer sera dans le body de la requête)
#### Supprimer une recette :
`DELETE http://localhost:5000/receipes/<id de la recette à supprimer>`

### Datamodel :
```
{
    id: 0,
    name: "Mousse express au Nutella",
    nbParts: 6,
    ingredients: [
        { name: "Mascarpone", quantity: 200, unit: "g" },
        { name: "Oeufs", quantity: 2 },
        { name: "Nutella", quantity: 5, unit: "cuillères à soupe" },
        { name: "Sucre", quantity: 60, unit: "g" },
    ],
    steps: [
        "Séparez les blancs et les jaunes d'oeufs. Battez les jaunes avec le sucre et ajoutez le mascarpone puis le Nutella.",
        "Montez les blancs en neige. Incorporez-les progressivement à la première préparation à l'aide d'une spatule.",
        "Versez la mousse dans des verrines et réservez au frais pendant au moins 3 heures. Servez bien froid."
    ]
}
```