dimension = 4                                                       //variable globale contenant la
function init()
{
    let grille = creerGrille()                                      //creer la grille
    let ListeCaseVide = genererListeCaseVide(grille)                // genere un tableau contenant toutes les cases vide
    let insertCase = choixAleatoireCase(ListeCaseVide)              //choisis aleatoirement une case parmi celles qui sont vides
    let newValue = obtenirNouvelleValeur()                          // choisi une valeur aléatoire pour une case pouvant etre 2 ou 4
    insertionValeur(newValue, insertCase , grille)                  //insere la case choisi avec la valeur aleatoire dans la grille

    insertCase = choixAleatoireCase(ListeCaseVide)                  //meme operation que le code precedent : choix d'une case vide aleatoirement
    newValue = obtenirNouvelleValeur()                              //genere aleatoirement sa future valeur
    insertionValeur(newValue, insertCase , grille)                  //insere la case dans la grille avec sa valeur

    let ListeCaseValeur = genererListeCaseValeur(grille)            //genere un tableau pour recuperer les cases possédant une valeur
    ListeCaseVide = genererListeCaseVide(grille)                    //genere un tableau pour recuperer les cases vide
    afficherGrille(ListeCaseValeur, ListeCaseVide)                  // fais le lien avec la page HTML pour mettre à jour l'affiche par rapport à la grille virtuel

    document.body.addEventListener("keydown", function(key)                 //permet d'activer mon code à l'appuis d'une touche
    {
        actionClavier(key, grille)                                                                        //code à activer lors de l'appui d'une touche, on garde la touche et la grille en parametre pour pouvoir les utiliser plus tard
    })
}

class maCase                                                        //classe maCase qui est constitue de la valeur, de son status bool(pour savoir si il y a une valeur, de ses coordonnes dans la grille
{
    valeur
    bool
    coorTop
    coorLeft

    constructor(Top, Left)                                          //constructeur qui genere les cases par defaut en plus de recevoir leur coordonnees dans la grille
    {
        this.valeur = ""
        this.bool = false
        this.coorTop = Top
        this.coorLeft = Left
    }
    setValue(value)                                                 //ensemble de setter et getter pour interagir avec l'objet maCase
    {
        this.valeur = value
    }
    setBool(statusBool)
    {
        this.bool = statusBool
    }
    setcoorTop(Top)
    {
        this.coorTop = Top
    }
    setcoorLeft(Left)
    {
        this.coorLeft = Left
    }
    getcoorTop()
    {
        return this.coorTop
    }
    getcoorLeft()
    {
        return this.coorLeft
    }
    getValue()
    {
        return this.valeur
    }
    getBool()
    {
        return this.bool
    }
    toString()                                                      //méthode pour permettre d'afficher tous les attribats de l'objet maCase, surtout utile pour le debug
    {
        let str = ""

        str += "coordonnées : (" + this.coorTop + "," + this.coorLeft + ") ,valeur : " + this.valeur + ", status : " + this.bool + "\n";

        return str
    }
}

function creerGrille()                                             //fonction pour creer ma grille
{
    let grille =  []                                               //initialisation de la grille avec une dimension
    for(let i = 0; i < dimension; i ++)                            //boucle parcourant toute la grille pour attribuer une case vide
    {
        grille[i] = []                                             //ajoute une deuxieme dimension a la grille afin d'avoir une matrice (permet de garder la meme vue mentale que sur la page HTML)
        for(let j = 0; j < dimension; j ++)
        {
            grille[i][j] = new maCase(i, j)                        //attribue une case avec les coordonnées
        }
    }

    return grille
}

function actionClavier(keyPressed, grille)                        //gere les evenements claviers en enclenchant le bon code selon la touche appuyer
{
    let detectedKey = keyPressed.key

    if(detectedKey === "ArrowUp")
    {
        deplacementVersHaut(grille)
    }
    else if(detectedKey === "ArrowDown")
    {

        deplacementVersBas(grille)
    }
    else if(detectedKey === "ArrowLeft")
    {

        deplacementVersGauche(grille)
    }
    else if(detectedKey === "ArrowRight")
    {

        deplacementVersDroite(grille)
    }
    else
    {
        console.log("not arrow key")
    }

    let ListeCaseVide = genererListeCaseVide(grille)                                //une fois tasser et fusionner affiche le tableau comme dans le init
    let insertCase = choixAleatoireCase(ListeCaseVide)
    if(insertCase !== "Bloqué")                                                     //empeche de bugger quand le joueur ne peux plus jouer
    {
        let newValue = obtenirNouvelleValeur()
        insertionValeur(newValue, insertCase , grille)
        let ListeCaseValeur = genererListeCaseValeur(grille)
        ListeCaseVide = genererListeCaseVide(grille)
        afficherGrille(ListeCaseValeur, ListeCaseVide)
    }

}

function insertionValeur(valeur, caseVide, grille)                              //fonction pour inserer une valeur dans la grille grace à la caseSouhaité sa valeur et la grille où l'enegistrer
{
    let coorTop = caseVide.coorTop
    let coorLeft = caseVide.coorLeft

    if (caseVide !== "Bloqué")
    {
        let caseActuel = grille[coorTop][coorLeft]

        caseActuel.valeur = valeur
        caseActuel.bool = true
    }

}

function genererListeCaseVide(grille)                                       //genere la liste de case vide pour simplifier les boucles et les variables à manipuler
{
    let tabCaseVide = []

    for(let i = 0; i < dimension; i ++)                                    //boucle parcourant la grille à la recherche de caseVide
    {
        for(let j = 0; j < dimension; j ++)
        {
            let caseActuel = grille[i][j]                                 //case actuel à traiter

            if(!caseActuel.bool)                                          //test si le status pour savoir si la case est vide
            {
                tabCaseVide[tabCaseVide.length] = caseActuel              //si vide on le rajoute dans notre tableau/liste qui repertorie les cases vide
            }
        }
    }

    if(tabCaseVide.length === 0)                                        //prise en compte de la possibilité qu'il n'y ai plus de cases Vides donc liste Vide
    {
        return "Vide"
    }
    else
    {
        return tabCaseVide
    }
}

function choixAleatoireCase(listeCaseVide)                              //fonction pour choisir aleatoirement une case vide dans la grille
{

    let Max = listeCaseVide.length - 1
    let IndiceCaseAlea
    IndiceCaseAlea = Math.floor(Math.random() * (Max + 1))          //choisit une valeur alétoirment entre 0 et la taille de la liste de case vide
    let caseVideChoisi = listeCaseVide[IndiceCaseAlea]                 //la valeur obtenu aleatoirement va designer l'indice d'iune case vide dans la liste

    if(listeCaseVide !== "Vide")
    {
        listeCaseVide.splice(IndiceCaseAlea, 1)

        return caseVideChoisi
    }
    else
    {
        return "Bloqué"
    }
}

function obtenirNouvelleValeur()                                    //fonction pour obtenir une valeur aleatoirement soit 2 soit 4
{
    let valeurAlea = Math.floor(Math.random() * 11)             //choisit un nombre aléatoirement entre 0 et 10

    if(valeurAlea <= 9)                                             //dans 90% des cas la valeur sera 2
    {
        return 2;
    }
    else                                                            //dans 10% des cas la valeur sera 4
    {
        return 4;
    }
}

function afficherGrille(tabCaseValeur,tabCaseVide)                  //fonction pour mettre a jour les cases de la page HTML
{
    let tabCase = document.querySelectorAll(".case")     //enregistre les objets possédant la classe case du HTML dans une variable afin de pouvoir interagir avec plus facilement

    for (let i = 0; i < tabCaseValeur.length; i ++)                 //parcourt le tableau de case possédant une valeur pour les attribuer aux éléments HTML obtenu ci dessus
    {
        let coorTop = tabCaseValeur[i].coorTop
        let coorLeft = tabCaseValeur[i].coorLeft
        tabCase[coorTop * dimension + coorLeft].innerHTML = tabCaseValeur[i].valeur                     //fais le lien entre un tableau de deux dimensions et un tableau à une dimension pour ensuite mettre à jour la valeur
    }

    if(tabCaseVide !== "Vide")
    {
        for (let j = 0; j < tabCaseVide.length; j ++)               // mets à jour les cases vides
        {
            let coorTop = tabCaseVide[j].coorTop
            let coorLeft = tabCaseVide[j].coorLeft
            tabCase[coorTop * dimension + coorLeft].innerHTML = ""
        }
    }
}

function genererListeCaseValeur(grille)                           //fonction pour generer une liste de case possédant une valeur même principe que la fonction pour la iste de caseVide
{
    let tabCaseValeur = []
    for(let i = 0; i < dimension; i ++)
    {
        for (let j = 0; j < dimension; j ++)
        {
            let caseActuel = grille[i][j]
            if(caseActuel.bool)
            {
                tabCaseValeur[tabCaseValeur.length] = caseActuel
            }
        }
    }

    return tabCaseValeur
}

function deplacementVersHaut(grille)                                                //fonction qui gere l'action Touche Haut de l'utilisateur en tassant et fusionnant les cases pouvant l'etre
{
    let ListeCaseValeur = genererListeCaseValeur(grille)
    let ListeColonneATraiter = []

    for(let i = 0; i < ListeCaseValeur.length; i ++)                                //boucle parcourant la liste des cases possédant une valeur dans la grille pour extraire les colonnes à traiter
    {
        if(!(ListeColonneATraiter.includes(ListeCaseValeur[i].coorLeft)))           //verifie si la colonne de la case actuel ne fait pas deja partie de la liste
        {
            let colonne = ListeCaseValeur[i].coorLeft
            let colonneATraiter = ListeColonneATraiter.length

            ListeColonneATraiter[colonneATraiter] = colonne                         //rajoute la colonne à traiter


            tasserVersColonne(ListeColonneATraiter[colonneATraiter], grille, "Haut")                //fonction pour tasser les cases dans la direction souhaité prenant en parametre juste les colonnes à traiter
            fusionnerVersColonne(ListeColonneATraiter[colonneATraiter], grille, "Haut")             //fonction pour fusionner les cases dans la direction souhaité prenant en parametre juste les colonnes à traiter
        }
    }
}

function deplacementVersBas(grille)                                             //meme principe que fonction ci-dessus mais pour la touche fléchée Bas
{
    let ListeCaseValeur = genererListeCaseValeur(grille)
    let ListeColonneATraiter = []

    for(let i = 0; i < ListeCaseValeur.length; i ++)
    {
        if(!(ListeColonneATraiter.includes(ListeCaseValeur[i].coorLeft)))
        {
            let colonne = ListeCaseValeur[i].coorLeft
            let colonneATraiter = ListeColonneATraiter.length

            ListeColonneATraiter[colonneATraiter] = colonne


            tasserVersColonne(ListeColonneATraiter[colonneATraiter], grille, "Bas")
            fusionnerVersColonne(ListeColonneATraiter[colonneATraiter], grille, "Bas")
        }
    }
}

function deplacementVersGauche(grille)                              //meme principe que fonction ci-dessus mais pour la touche fléchée Gauche
{
    let ListeCaseValeur = genererListeCaseValeur(grille)
    let ListeLigneATraiter = []

    for(let i = 0; i < ListeCaseValeur.length; i ++)
    {
        if(!(ListeLigneATraiter.includes(ListeCaseValeur[i].coorTop)))
        {
            let ligne = ListeCaseValeur[i].coorTop
            let ligneATraiter = ListeLigneATraiter.length

            ListeLigneATraiter[ligneATraiter] = ligne


            tasserVersLigne(ListeLigneATraiter[ligneATraiter], grille, "Gauche")
            fusionnerVersLigne(ListeLigneATraiter[ligneATraiter], grille, "Gauche")
        }
    }


}

function deplacementVersDroite(grille)                                                          //meme principe que fonction ci-dessus mais pour la touche fléchée Droite
{
    let ListeCaseValeur = genererListeCaseValeur(grille)
    let ListeLigneATraiter = []

    for(let i = 0; i < ListeCaseValeur.length; i ++)
    {
        if(!(ListeLigneATraiter.includes(ListeCaseValeur[i].coorTop)))
        {
            let ligne = ListeCaseValeur[i].coorTop
            let ligneATraiter = ListeLigneATraiter.length

            ListeLigneATraiter[ligneATraiter] = ligne


            tasserVersLigne(ListeLigneATraiter[ligneATraiter], grille, "Droite")
            fusionnerVersLigne(ListeLigneATraiter[ligneATraiter], grille, "Droite")
        }
    }
}

function tasserVersColonne(colonne, grille, sens)                                                   //fonction pour tasser les colonnes
{
    if(sens === "Haut")                                                                             //prend en compte le sens du "tassage"
    {
        let ListeCaseValeurColonne = []
        let EventuelTopCase
        ListeCaseValeurColonne = genererListeCaseValeurColonne(colonne, grille, sens)              //recupere les cases possédant une valeur dans la colonne à traiter

        for(let i = 0; i < ListeCaseValeurColonne.length; i ++)                                    //boucle pour tasser une à une les cases dans la colonne
        {
            let caseActuelValeur = ListeCaseValeurColonne[i]

            EventuelTopCase = caseVideEventuelTop(colonne, grille, sens)

            if(EventuelTopCase !== "Vide")
            {
                if(caseActuelValeur.coorTop > 0 && EventuelTopCase.coorTop < caseActuelValeur.coorTop)                          //si case vide disponible pour tassage alors on "tasse"
                {
                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].valeur = caseActuelValeur.valeur                  //la case vide prend la valeur de l'ancienne case à tasser
                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].bool = true
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].valeur = ""                                     //l'ancienne case à tasser devient une case vide
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].bool = false
                }
            }

        }
    }
    else                                                                                                //meme principe mais dans un sens différent pour simplifier le probleme
    {
        let ListeCaseValeurColonne = []
        let EventuelTopCase
        ListeCaseValeurColonne = genererListeCaseValeurColonne(colonne, grille, sens)

        for(let i = 0; i < ListeCaseValeurColonne.length; i ++)
        {
            let caseActuelValeur = ListeCaseValeurColonne[i]

            EventuelTopCase = caseVideEventuelTop(colonne, grille, sens)

            if(EventuelTopCase !== "Vide")
            {
                if(caseActuelValeur.coorTop < dimension - 1 && EventuelTopCase.coorTop > caseActuelValeur.coorTop)
                {

                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].valeur = caseActuelValeur.valeur
                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].bool = true
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].valeur = ""
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].bool = false
                }
            }

        }
    }

    let affectedCaseValue = []
    affectedCaseValue = genererListeCaseValeurColonne(colonne, grille, sens)
    let affectedCaseVide = []
    affectedCaseVide = genererListeCaseVideColonne(colonne, grille)

    afficherGrille(affectedCaseValue, affectedCaseVide)


}

function genererListeCaseVideColonne(colonne, grille)                                   //fonction pour generer une liste repertoriant les cases vide de la colonne à traiter
{
    let tabCaseVide = genererListeCaseVide(grille)
    let tabCaseVideColonne = []

    if(tabCaseVide !== "Vide")
    {
        for(let i = 0; i < tabCaseVide.length; i ++)
        {

            if(tabCaseVide[i].coorLeft === colonne)
            {
                tabCaseVideColonne[tabCaseVideColonne.length] = tabCaseVide[i]
            }
        }
        if(tabCaseVideColonne.length > 0)
        {
            return tabCaseVideColonne
        }
        else
        {
            return "Vide"
        }
    }
    else
    {
        return "Vide"
    }

}

function caseVideEventuelTop(colonne, grille, sens)                                         //trouve la meilleur case vide pour evutuellement servir à "tasser"
{
    let caseVideMinTop
    let ListeCaseVideColonne = genererListeCaseVideColonne(colonne,grille)
    if(ListeCaseVideColonne !== "Vide")
    {
        if(sens === "Haut")
        {
            caseVideMinTop = ListeCaseVideColonne[0]                                        //prend la premiere valeur car liste trie donc coordonnées la plus basse possible
        }
        else
        {
            caseVideMinTop = ListeCaseVideColonne[ListeCaseVideColonne.length - 1]        //prend la derniere valeur du tableau si le sens est bas car le tableau est trié
        }

        return caseVideMinTop
    }
    else
    {
        return "Vide"
    }

}

function genererListeCaseValeurColonne(colonne, grille, sens)           //meme principe que pour les cases vides
{
    let tabCaseValeur = genererListeCaseValeur(grille)
    let tabCaseValeurColonne = []
    if(sens === "Haut")
    {
        for(let i = 0; i < tabCaseValeur.length; i ++)
        {

            if(tabCaseValeur[i].coorLeft === colonne)
            {
                tabCaseValeurColonne[tabCaseValeurColonne.length] = tabCaseValeur[i]
            }
        }
    }
    else
    {
        for(let i = tabCaseValeur.length - 1; i > -1; i --)
        {

            if(tabCaseValeur[i].coorLeft === colonne)
            {
                tabCaseValeurColonne[tabCaseValeurColonne.length] = tabCaseValeur[i]
            }
        }

    }

    return tabCaseValeurColonne
}

function tasserVersLigne(ligne, grille, sens)                               //meme principe que la fonction de tassage précédente mais en utilisant une coordonnées differente comme base pour ne traiter que les lignes
{

    if(sens === "Gauche")
    {
        let ListeCaseValeurLigne = []
        let EventuelLeftCase
        ListeCaseValeurLigne = genererListeCaseValeurLigne(ligne, grille, sens)

        for(let j = 0; j < ListeCaseValeurLigne.length; j ++)
        {
            let caseActuelValeur = ListeCaseValeurLigne[j]

            EventuelLeftCase = caseVideEventuelLeft(ligne, grille, sens)

            if(EventuelLeftCase !== "Vide")
            {
                if(caseActuelValeur.coorLeft > 0 && EventuelLeftCase.coorLeft < caseActuelValeur.coorLeft)
                {


                    grille[EventuelLeftCase.coorTop][EventuelLeftCase.coorLeft].valeur = caseActuelValeur.valeur
                    grille[EventuelLeftCase.coorTop][EventuelLeftCase.coorLeft].bool = true
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].valeur = ""
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].bool = false
                }
            }
        }
    }
    else
    {
        let ListeCaseValeurLigne = []
        let EventuelLeftCase
        ListeCaseValeurLigne = genererListeCaseValeurLigne(ligne, grille, sens)

        for(let j = 0; j < ListeCaseValeurLigne.length; j ++)
        {
            let caseActuelValeur = ListeCaseValeurLigne[j]

            EventuelLeftCase = caseVideEventuelLeft(ligne, grille, sens)

            if(EventuelLeftCase !== "Vide")
            {
                if(caseActuelValeur.coorLeft < dimension - 1 && EventuelLeftCase.coorLeft > caseActuelValeur.coorLeft)
                {
                    grille[EventuelLeftCase.coorTop][EventuelLeftCase.coorLeft].valeur = caseActuelValeur.valeur
                    grille[EventuelLeftCase.coorTop][EventuelLeftCase.coorLeft].bool = true
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].valeur = ""
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].bool = false
                }
            }
        }
    }

    let affectedCaseValue = []
    affectedCaseValue = genererListeCaseValeurLigne(ligne, grille, sens)
    let affectedCaseVide = []
    affectedCaseVide = genererListeCaseVideLigne(ligne, grille)
    afficherGrille(affectedCaseValue, affectedCaseVide)

}

function genererListeCaseVideLigne(ligne, grille)
{
    let tabCaseVide = genererListeCaseVide(grille)
    let tabCaseVideLigne = []

    if(tabCaseVide !== "Vide")
    {
        for(let i = 0; i < tabCaseVide.length; i ++)
        {

            if(tabCaseVide[i].coorTop === ligne)
            {
                tabCaseVideLigne[tabCaseVideLigne.length] = tabCaseVide[i]
            }
        }
        if(tabCaseVideLigne.length > 0)
        {
            return tabCaseVideLigne
        }
        else
        {
            return "Vide"
        }
    }
    else
    {
        return "Vide"
    }

}

function caseVideEventuelLeft(ligne, grille, sens)
{
    let caseVideEventuelLeft
    let ListeCaseVideLigne = genererListeCaseVideLigne(ligne,grille)
    if(ListeCaseVideLigne !== "Vide")
    {
        if(sens === "Gauche")
        {
            caseVideEventuelLeft = ListeCaseVideLigne[0]
        }
        else
        {
            caseVideEventuelLeft = ListeCaseVideLigne[ListeCaseVideLigne.length - 1]
        }

        return caseVideEventuelLeft
    }
    else
    {
        return "Vide"
    }

}

function genererListeCaseValeurLigne(ligne, grille, sens)
{
    let tabCaseValeur = genererListeCaseValeur(grille)
    let tabCaseValeurLigne = []

    if(sens === "Gauche")
    {
        for(let i = 0; i < tabCaseValeur.length; i ++)
        {

            if(tabCaseValeur[i].coorTop === ligne)
            {
                tabCaseValeurLigne[tabCaseValeurLigne.length] = tabCaseValeur[i]
            }
        }
    }
    else
    {
        for(let i = tabCaseValeur.length - 1; i > -1; i --)
        {
            if(tabCaseValeur[i].coorTop === ligne)
            {
                tabCaseValeurLigne[tabCaseValeurLigne.length] = tabCaseValeur[i]
            }
        }

    }

    return tabCaseValeurLigne
}

function fusionnerVersLigne(ligne, grille, sens)                                    //fonction qui cherche les cases à fusionner et les "fusionnent" si elle en trouve
{
    let ListeCaseValeurLigne = []
    ListeCaseValeurLigne = genererListeCaseValeurLigne(ligne, grille, sens)         //on extrait de la grille les cases à fusionner

    if(sens === "Gauche")
    {
        if(ListeCaseValeurLigne.length > 1)
        {
            for (let i = 0; i < ListeCaseValeurLigne.length; i++)                  //on parcourt les case extraites pour trouver deux cases se touchant
            {
                let caseActuel = ListeCaseValeurLigne[i]

                let caseSuivante = ListeCaseValeurLigne[(i + 1)]

                if (caseActuel.valeur === caseSuivante.valeur)                      //si elles possédent la meme valeur alors on les "fusionnent"
                {
                    grille[caseActuel.coorTop][caseActuel.coorLeft].valeur *= 2                         //la valeur de la case actuelle double
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].valeur = ""                     //la case suivante "disparait"
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].bool = false
                }

                if((ListeCaseValeurLigne.length - i) < 3)                                               //permet de sortir de la boucle si il n'y a plus de cases à traiter car plus de paire
                {
                    i ++
                }

            }
        }
    }
    else
    {
        if(ListeCaseValeurLigne.length > 1)
        {
            for (let i = 0; i < ListeCaseValeurLigne.length; i ++)
            {
                let caseActuel = ListeCaseValeurLigne[i]
                let caseSuivante = ListeCaseValeurLigne[i + 1]

                if (caseActuel.valeur === caseSuivante.valeur)
                {
                    grille[caseActuel.coorTop][caseActuel.coorLeft].valeur *= 2
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].valeur = ""
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].bool = false
                }

                if((ListeCaseValeurLigne.length - i) < 3)
                {
                    i ++
                }

            }
        }
    }
}

function fusionnerVersColonne(colonne, grille, sens)
{
    let ListeCaseValeurColonne = []
    ListeCaseValeurColonne = genererListeCaseValeurColonne(colonne, grille, sens)

    if(sens === "Haut")
    {
        if(ListeCaseValeurColonne.length > 1)
        {
            for (let i = 0; i < ListeCaseValeurColonne.length; i++)
            {
                let caseActuel = ListeCaseValeurColonne[i]

                let caseSuivante = ListeCaseValeurColonne[(i + 1)]

                if (caseActuel.valeur === caseSuivante.valeur)
                {
                    grille[caseActuel.coorTop][caseActuel.coorLeft].valeur *= 2
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].valeur = ""
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].bool = false
                }

                if((ListeCaseValeurColonne.length - i) < 3)
                {
                    i ++
                }

            }
        }
    }
    else
    {
        if(ListeCaseValeurColonne.length > 1)
        {
            for (let i = 0; i < ListeCaseValeurColonne.length; i ++)
            {
                let caseActuel = ListeCaseValeurColonne[i]
                let caseSuivante = ListeCaseValeurColonne[i + 1]

                if (caseActuel.valeur === caseSuivante.valeur)
                {
                    grille[caseActuel.coorTop][caseActuel.coorLeft].valeur *= 2
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].valeur = ""
                    grille[caseSuivante.coorTop][caseSuivante.coorLeft].bool = false
                }

                if((ListeCaseValeurColonne.length - i) < 3)
                {
                    i ++
                }

            }
        }
    }
}





