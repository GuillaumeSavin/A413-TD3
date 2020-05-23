function init()
{
    tabCase = document.querySelectorAll(".case")

    for(i = 0; i < tabCase.length; i++)
    {
        tabCase[i].addEventListener("click", selection)
    }
}

function selection()
{
    element = event.currentTarget
    vide = document.querySelector(".vide")
    videTop = vide.style.top
    videLeft = vide.style.left
    elementTop = element.style.top
    elementLeft = element.style.left

    elementTopInt = parseInt(elementTop)
    elementLeftInt = parseInt(elementLeft)
    videTopInt = parseInt(videTop)
    videLeftInt = parseInt(videLeft)

    console.log(elementTopInt)
    console.log(elementLeftInt)

    if(elementTop !== videTop && elementLeft !== videLeft)
    {
        console.log("pas à côté de case vide : pas du tout meme coordonnes")
    }
    else if(elementTop === videTop && elementLeft === videLeft)
    {
        console.log("case vide")
    }
    else
    {
        if(elementTopInt === videTopInt && (elementLeftInt === (videLeftInt - 102)) || (elementLeftInt === (videLeftInt + 102)))
        {
            element.classList.toggle("vide")
            vide.classList.toggle("vide")

            vide.innerHTML = element.innerHTML
            element.innerHTML = ""
            console.log("swap possible côté")
        }
        else if(elementLeftInt === videLeftInt && (elementTopInt === (videTopInt - 102)) || (elementTopInt === (videTopInt + 102)))
        {
            element.classList.toggle("vide")
            vide.classList.toggle("vide")

            vide.innerHTML = element.innerHTML
            element.innerHTML = ""
            console.log("swap possible bas")
        }
        else
        {
            console.log("pas à côté de case vide : une coordonnées une case plus loin")
        }
    }
}



