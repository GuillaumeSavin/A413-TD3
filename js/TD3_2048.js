dimension = 4
function init()
{
    tabCase = document.querySelectorAll(".case")
    creerGrille()
    ListeCaseVide = genererListeCaseVide(grille)
    insertCase = choixAleatoireCase(ListeCaseVide)
    newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    insertCase = choixAleatoireCase(ListeCaseVide)
    newValue = obtenirNouvelleValeur()
    insertionValeur(newValue, insertCase , grille)
    ListeCaseValeur = genererListeCaseValeur(grille)
    afficherGrille(ListeCaseValeur)
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
    toString()
    {
        let str = ""

        str += "coordonnées : (" + this.coorX + "," + this.coorY + ") ,valeur : " + this.valeur + ", status : " + this.bool + "\n";

        return str
    }


}

function creerGrille()
{
    grille =  []
    for(i = 0; i < dimension; i ++)
    {
        grille[i] = []
        for(j = 0; j < dimension; j ++)
        {
            grille[i][j] = new maCase(i, j)
        }
    }
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
    console.log("tests acces :\n" + grille)
    ListeCaseVide = genererListeCaseVide(grille)
    console.log("tab case Vide : \n" + ListeCaseVide)

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

    caseActuel = grille[coorX][coorY]

    caseActuel.valeur = valeur
    caseActuel.bool = true
}

function genererListeCaseVide(grille)
{
    tabCaseVide = []

    for(i = 0; i < dimension; i ++)
    {
        for(j = 0; j < dimension; j ++)
        {
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
    IndiceCaseAlea = Math.floor(Math.random() * 11)
    IndiceCaseAlea = Math.floor(Math.random() * (Max + 1))
    console.log("Indice = " + IndiceCaseAlea + " Max = " + Max + " Taille Tableau = " + listeCaseVide.length)
    console.log("Tableau Before= \n" + listeCaseVide.toString())
    caseVideChoisi = listeCaseVide[IndiceCaseAlea]
    listeCaseVide.splice(IndiceCaseAlea, 1)
    console.log("Tableau After= \n" + listeCaseVide.toString())
    console.log(caseVideChoisi)

    console.log("coordonnées case : " + caseVideChoisi.coorX + " ," + caseVideChoisi.coorY)

    return caseVideChoisi


}

function obtenirNouvelleValeur()
{
    valeurAlea = Math.floor(Math.random() * 11)
    console.log(valeurAlea);

    if(valeurAlea <= 9)
    {
        return 2;
    }
    else
    {
        return 4;
    }
}

function afficherGrille(tabCaseValeur)
{
    tabCase = document.querySelectorAll(".case")

    for(i = 0; i < tabCase.length; i ++)
    {
        caseTop = parseInt(tabCase[i].style.top)
        caseLeft = parseInt(tabCase[i].style.left)
        valeur = tabCase[i].innerHTML
        console.log("coor HTML : (" + caseTop + ", " + caseLeft + ")" + " Valeur = " + valeur)
    }

    for (i = 0; i < tabCaseValeur.length; i ++)
    {
        coorTop = tabCaseValeur[i].coorX
        coorLeft = tabCaseValeur[i].coorY
        console.log("indice case affecté : " + (coorTop * dimension + coorLeft))
        tabCase[coorTop * dimension + coorLeft].innerHTML = tabCaseValeur[i].valeur
    }

    console.log(tabCase[0].style.top)
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
            console.log(caseActuel)
            if(caseActuel.bool)
            {
                console.log("passeValeur")
                tabCaseValeur[tabCaseValeur.length] = caseActuel
            }
        }
    }

    for(i = 0; i < tabCaseValeur.length; i ++)
    {
        console.log("test tabValeur = \n" + tabCaseValeur.toString())
    }



    return tabCaseValeur
}

//test





