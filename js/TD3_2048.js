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

    constructor()
    {
        this.valeur = ""
        this.bool = false
    }
    setValue(value)
    {
        this.valeur = value
    }
    setBool(statusBool)
    {
        this.bool = statusBool
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
    for(i = 0; i < dimension; i ++)
    {
        grille[i] = []
        for(j = 0; j < dimension; j ++)
        {
            grille[i][j] = new maCase()
        }

        ListeCaseVide = genererListeCaseVide(grille)

        insertionValeur()
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

function insertionValeur(valeur, coordonnee)
{

}

function genererListeCaseVide(grille)
{
    tabCaseVide = []
    for(i = 0; i < dimension; i ++)
    {
        for(j = 0; j < dimension; j ++)
        {
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





