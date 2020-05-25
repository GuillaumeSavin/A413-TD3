dimension = 4
function init()
{
    let grille = creerGrille()
    let ListeCaseVide = genererListeCaseVide(grille)
    let insertCase = choixAleatoireCase(ListeCaseVide)
    let newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    insertCase = choixAleatoireCase(ListeCaseVide)
    newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    let ListeCaseValeur = genererListeCaseValeur(grille)
    ListeCaseVide = genererListeCaseVide(grille)
    afficherGrille(ListeCaseValeur, ListeCaseVide)

    document.body.addEventListener("keydown", function(key)
    {
        actionClavier(key, grille)
    })
}

class maCase
{
    valeur
    bool
    coorTop
    coorLeft

    constructor(Top, Left)
    {
        this.valeur = ""
        this.bool = false
        this.coorTop = Top
        this.coorLeft = Left
    }
    setValue(value)
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
    toString()
    {
        let str = ""

        str += "coordonnées : (" + this.coorTop + "," + this.coorLeft + ") ,valeur : " + this.valeur + ", status : " + this.bool + "\n";

        return str
    }


}

function creerGrille()
{
    let grille =  []
    for(let i = 0; i < dimension; i ++)
    {
        grille[i] = []
        for(let j = 0; j < dimension; j ++)
        {
            grille[i][j] = new maCase(i, j)
        }
    }

    return grille
}

function actionClavier(keyPressed, grille)
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
    let ListeCaseVide = genererListeCaseVide(grille)
    let insertCase = choixAleatoireCase(ListeCaseVide)
    if(insertCase !== "Bloqué")
    {
        let newValue = obtenirNouvelleValeur()
        insertionValeur(newValue, insertCase , grille)
        let ListeCaseValeur = genererListeCaseValeur(grille)
        ListeCaseVide = genererListeCaseVide(grille)
        afficherGrille(ListeCaseValeur, ListeCaseVide)
    }

}

function insertionValeur(valeur, caseVide, grille)
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

function genererListeCaseVide(grille)
{
    let tabCaseVide = []

    for(let i = 0; i < dimension; i ++)
    {
        for(let j = 0; j < dimension; j ++)
        {
            let caseActuel = grille[i][j]

            if(!caseActuel.bool)
            {
                tabCaseVide[tabCaseVide.length] = caseActuel
            }
        }
    }

    if(tabCaseVide.length === 0)
    {
        return "Vide"
    }
    else
    {
        return tabCaseVide
    }
}

function choixAleatoireCase(listeCaseVide)
{

    let Max = listeCaseVide.length - 1
    let IndiceCaseAlea = Math.floor(Math.random() * 11)
    IndiceCaseAlea = Math.floor(Math.random() * (Max + 1))
    let caseVideChoisi = listeCaseVide[IndiceCaseAlea]

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

function obtenirNouvelleValeur()
{
    let valeurAlea = Math.floor(Math.random() * 11)

    if(valeurAlea <= 9)
    {
        return 2;
    }
    else
    {
        return 4;
    }
}

function afficherGrille(tabCaseValeur,tabCaseVide)
{
    let tabCase = document.querySelectorAll(".case")

    for (let i = 0; i < tabCaseValeur.length; i ++)
    {
        let coorTop = tabCaseValeur[i].coorTop
        let coorLeft = tabCaseValeur[i].coorLeft
        tabCase[coorTop * dimension + coorLeft].innerHTML = tabCaseValeur[i].valeur
    }

    if(tabCaseVide !== "Vide")
    {
        for (let j = 0; j < tabCaseVide.length; j ++)
        {
            let coorTop = tabCaseVide[j].coorTop
            let coorLeft = tabCaseVide[j].coorLeft
            tabCase[coorTop * dimension + coorLeft].innerHTML = ""
        }
    }
}

function genererListeCaseValeur(grille)
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

function deplacementVersHaut(grille)
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


            tasserVersColonne(ListeColonneATraiter[colonneATraiter], grille, "Haut")
        }
    }
}

function deplacementVersBas(grille)
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
        }
    }
}

function deplacementVersGauche(grille)
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
        }
    }
}

function deplacementVersDroite(grille)
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
        }
    }
}

function tasserVersColonne(colonne, grille, sens)
{
    if(sens === "Haut")
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
                if(caseActuelValeur.coorTop > 0 && EventuelTopCase.coorTop < caseActuelValeur.coorTop)
                {
                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].valeur = caseActuelValeur.valeur
                    grille[EventuelTopCase.coorTop][EventuelTopCase.coorLeft].bool = true
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].valeur = ""
                    grille[caseActuelValeur.coorTop][caseActuelValeur.coorLeft].bool = false
                }
            }

        }
    }
    else
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

function genererListeCaseVideColonne(colonne, grille)
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

function caseVideEventuelTop(colonne, grille, sens)
{
    let caseVideMinTop
    let ListeCaseVideColonne = genererListeCaseVideColonne(colonne,grille)
    if(ListeCaseVideColonne !== "Vide")
    {
        if(sens === "Haut")
        {
            caseVideMinTop = ListeCaseVideColonne[0]
        }
        else
        {
            caseVideMinTop = ListeCaseVideColonne[ListeCaseVideColonne.length - 1]
        }

        return caseVideMinTop
    }
    else
    {
        return "Vide"
    }

}

function genererListeCaseValeurColonne(colonne, grille, sens)
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

function tasserVersLigne(ligne, grille, sens)
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





