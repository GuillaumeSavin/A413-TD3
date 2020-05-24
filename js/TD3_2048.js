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
    coorX
    coorY

    constructor(X, Y)
    {
        this.valeur = ""
        this.bool = false
        this.coorX = X
        this.coorY = Y
    }
    setValue(value)
    {
        this.valeur = value
    }
    setBool(statusBool)
    {
        this.bool = statusBool
    }
    setCoorX(X)
    {
        this.coorX = X
    }
    setCoorY(Y)
    {
        this.coorY = Y
    }
    getCoorX()
    {
        return this.coorX
    }
    getCoorY()
    {
        return this.coorY
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

        str += "coordonnées : (" + this.coorX + "," + this.coorY + ") ,valeur : " + this.valeur + ", status : " + this.bool + "\n";

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
}

function insertionValeur(valeur, caseVide, grille)
{
    let coorX = caseVide.coorX
    let coorY = caseVide.coorY

    let caseActuel = grille[coorX][coorY]

    caseActuel.valeur = valeur
    caseActuel.bool = true
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

    return tabCaseVide
}

function choixAleatoireCase(listeCaseVide)
{

    let Max = listeCaseVide.length - 1
    let IndiceCaseAlea = Math.floor(Math.random() * 11)
    IndiceCaseAlea = Math.floor(Math.random() * (Max + 1))
    let caseVideChoisi = listeCaseVide[IndiceCaseAlea]
    listeCaseVide.splice(IndiceCaseAlea, 1)

    return caseVideChoisi


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
        let coorTop = tabCaseValeur[i].coorX
        let coorLeft = tabCaseValeur[i].coorY
        tabCase[coorTop * dimension + coorLeft].innerHTML = tabCaseValeur[i].valeur
    }

    for (let j = 0; j < tabCaseVide.length; j ++)
    {
        let coorTop = tabCaseVide[j].coorX
        let coorLeft = tabCaseVide[j].coorY
        tabCase[coorTop * dimension + coorLeft].innerHTML = ""
    }
}

function genererListeCaseValeur(grille)
{
    let tabCaseValeur = []
    console.log("grille buggé : \n" + grille)
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
    let ListeCaseVide = genererListeCaseVide(grille)

    let ListeCaseValeur = genererListeCaseValeur(grille)
    let ListeColonneATraiter = []


    for(let i = 0; i < ListeCaseValeur.length; i ++)
    {
        if(!(ListeColonneATraiter.includes(ListeCaseValeur[i].coorY)))
        {
            let colonne = ListeCaseValeur[i].coorY
            let colonneATraiter = ListeColonneATraiter.length

            ListeColonneATraiter[colonneATraiter] = colonne


            tasserVersColonneHaut(ListeColonneATraiter[colonneATraiter], grille)
        }

    }
    //tasserVersColonne(ListeCaseValeur)

}

function deplacementVersBas()
{
    tasserVersColonne()
}

function deplacementVersGauche()
{
    tasserVersLigne()
}

function deplacementVersDroite()
{
    tasserVersLigne()
}

function tasserVersColonneHaut(colonne, grille)
{
    let ListeCaseValeurColonne = []
    let ListeCaseVideColonne = []

    ListeCaseVideColonne = genererListeCaseVideColonne(colonne, grille)
    ListeCaseValeurColonne = genererListeCaseValeurColonne(colonne, grille)

    console.log("grille before :\n" + grille)

    for(let i = 0; i < ListeCaseValeurColonne.length; i ++)
    {
        let caseActuelValeur = ListeCaseValeurColonne[i]
        console.log("case à tasser : " + caseActuelValeur)
        for(let j = 0; j < ListeCaseVideColonne.length; j ++)
        {
            let caseActuelVide = ListeCaseVideColonne[j]
            console.log("case vide actuel : " + caseActuelVide)
            if(caseActuelValeur.coorX > 0 && caseActuelVide.coorX < caseActuelValeur.coorX)
            {
                console.log("rentre")
                grille[caseActuelVide.coorX][caseActuelVide.coorY].valeur = caseActuelValeur.valeur
                grille[caseActuelVide.coorX][caseActuelVide.coorY].bool = true
                grille[caseActuelValeur.coorX][caseActuelValeur.coorY].valeur = ""
                grille[caseActuelValeur.coorX][caseActuelValeur.coorY].bool = false
                j = ListeCaseVideColonne.length
            }
        }

    }
    console.log("grille after :\n" + grille)

    let affectedCaseValue = genererListeCaseValeurColonne(grille)
    let affectedCaseVide = genererListeCaseVideColonne(grille)
    console.log("casesValeur : " + affectedCaseValue)

    afficherGrille(affectedCaseValue, affectedCaseVide)


    /*
    console.log("paramatrer tasser : " + colonne)
    j = colonne
    for(i = 1; i < dimension; i ++)
    {
        if (grille[i][j].valeur !== "")
        {
            console.log("caseValeur : " + grille[i][j].valeur)
            lastCaseVide = 4
            pasDeValeur = true
            ligne = i - 1

            while (ligne >= 0 && pasDeValeur)
            {
                console.log("ligne : " + ligne)
                if (grille[ligne][j].valeur === "")
                {
                    lastCaseVide = ligne
                    console.log("lastCaseVide : " + lastCaseVide)
                }
                else
                {

                    pasDeValeur = false

                }
                ligne --

            }

            console.log("test i : " + i + " lastCaseVide : " + lastCaseVide)
            if(i < lastCaseVide)
            {
                console.log("rentre modif")
                grille[lastCaseVide][j].valeur = grille[i][j].valeur
                grille[i][j].valeur = ""
                tabCaseValeur = genererListeCaseValeur(grille)
                afficherGrille(tabCaseValeur)

            }
        }
    }

     */
}

function genererListeCaseVideColonne(colonne, grille)
{
    let tabCaseVide = genererListeCaseVide(grille)
    let tabCaseVideColonne = []

    for(let i = 0; i < tabCaseVide.length; i ++)
    {

        if(tabCaseVide[i].coorY === colonne)
        {
            tabCaseVideColonne[tabCaseVideColonne.length] = tabCaseVide[i]
        }
    }

    return tabCaseVideColonne
}

function genererListeCaseValeurColonne(colonne, grille)
{
    console.log("grille bugge 2 : \n" + grille)
    let tabCaseValeur = genererListeCaseValeur(grille)
    let tabCaseValeurColonne = []



    for(let i = 0; i < tabCaseValeur.length; i ++)
    {

        if(tabCaseValeur[i].coorY === colonne)
        {
            tabCaseValeurColonne[tabCaseValeurColonne.length] = tabCaseValeur[i]
        }
    }

    return tabCaseValeurColonne
}

//test





