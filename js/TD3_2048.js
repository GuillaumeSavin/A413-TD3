dimension = 4
function init()
{
    tabCase = document.querySelectorAll(".case")
    creerGrille()
    document.body.addEventListener("keydown", actionClavier)
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


}

function creerGrille()
{
    grille =  []
    for(i = 0; i <= dimension; i ++)
    {
        grille[i] = []
        for(j = 0; j <= dimension; j ++)
        {
            grille[i][j] = new maCase(i, j)
        }
    }
    ListeCaseVide = genererListeCaseVide(grille)
    insertCase = choixAleatoireCase(ListeCaseVide)
    newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    insertCase = choixAleatoireCase(ListeCaseVide)
    newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    afficherGrille(grille)
}

function actionClavier(keyPressed)
{
    detectedKey = keyPressed.key
    console.log(detectedKey)

    if(detectedKey === "ArrowUp")
    {
        console.log("Flèche Haut")
        deplacementVersHaut()
    }
    else if(detectedKey === "ArrowDown")
    {
        console.log("Flèche Bas")
        deplacementVersBas()
    }
    else if(detectedKey === "ArrowLeft")
    {
        console.log("Flèche Gauche")
        deplacementVersGauche()
    }
    else if(detectedKey === "ArrowRight")
    {
        console.log("Flèche Droite")
        deplacementVersDroite()
    }
    else
    {
        console.log("not arrow key")
    }
}

function deplacementVersHaut()
{

}

function deplacementVersBas()
{

}

function deplacementVersGauche()
{

}

function deplacementVersDroite()
{

}

function insertionValeur(valeur, caseVide, grille)
{
    coorX = caseVide.coorX
    coorY = caseVide.coorY

    grille[coorX][coorY] = valeur
    grille[coorX][coorY] = true
}

function genererListeCaseVide(grille)
{
    tabCaseVide = []

    for(i = 0; i < dimension; i ++)
    {
        console.log("i = " + i)
        for(j = 0; j < dimension; j ++)
        {
            console.log("j = " + j)
            console.log("test dimensionnement tableau par la taille :" + tabCaseVide.length)
            caseActuel = grille[i][j]

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
    Max = listeCaseVide.length - 1
    IndiceCaseAlea = Math.ceil(Math.random() * (Max + 1))

    caseVideChoisi = listeCaseVide[IndiceCaseAlea]
    listeCaseVide.splice(IndiceCaseAlea)

    console.log("coordonnées case : " + caseVideChoisi.coorX + " ," + caseVideChoisi.coorY)

    return caseVideChoisi
}

function obtenirNouvelleValeur()
{
    valeurAlea = Math.ceil(Math.random() * (9 + 1))

    if(valeurAlea <= 9)
    {
        return 2;
    }
    else
    {
        return 4;
    }
}

function afficherGrille()
{
    tabCase = document.querySelectorAll(".case")



    console.log(tabCase.length)

}

function genererListeCaseValeur(grille)
{
    tabCaseValeur = []
    for(i = 0; i < dimension; i ++)
    {
        for (j = 0; j < dimension; j ++)
        {
            caseActuel = grille[i][j]
            if(caseActuel.bool)
            {
                tabCaseValeur[tabCaseValeur.length] = caseActuel
            }
        }
    }

    return tabCaseValeur
}





