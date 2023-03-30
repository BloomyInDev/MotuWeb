function chooseWord() {
    let randomWord = listword[Math.floor(Math.random() * listword.length)];
    var rerool = true;
    while (rerool) {
        if (randomWord.length>4 && randomWord.length<10) {
            rerool = false;
        } else {
            randomWord = listword[Math.floor(Math.random() * listword.length)];
        }
    }
    return randomWord
}
function copyList(originalList){
    newList = []
    for (i = 0; i < originalList.length; i++) {
        newList[i] = originalList[i];
    }
    return newList
}
function addToProposition(){
    var userWord = document.getElementById("typezone").value.toUpperCase();
    if (tryno != 4) {
        if (userWord.length === theWord.length) {
            tryno++
            columntable = ["no1","no2","no3","no4","no5"]
            var line = document.getElementById(columntable[tryno])
            finalOut = ""
            if (userWord == theWord) {
                finalOut = `<a id="good">${userWord}</a>`
                alert(`Partie gagnée, le mot était ${theWord} trouvé en ${tryno} essai(s)`)
                history.back()
            } else {
                testFromUser = copyList(listOfTheWord)
                for (var i = 0; i < userWord.length; i++) {
                    //console.log(userWord[i], testFromUser.indexOf(userWord[i]))
                    if (testFromUser.indexOf(userWord[i]) == i) {
                        testFromUser[i]=-1
                        finalOut+=`<a id="good">${userWord[i]}</a>`
                    } else if (testFromUser.indexOf(userWord[i]) != -1) {
                        testFromUser[i]=-1
                        finalOut+=`<a id="inword">${userWord[i]}</a>`
                    } else {
                        finalOut+=`<a id="bad">${userWord[i]}</a>`
                    }
                    //console.log(testFromUser)
                }
            }
            line.innerHTML = finalOut
        } else if (userWord.length != 0) {
            alert(`Le mot proposé n'est pas de la bonne longueur (longeure requise => ${theWord.length})`)
        }
    } else {
        alert(`Partie perdue, le mot était ${theWord}`)
        history.back()
    }
}

var tryno = -1
var theWord = chooseWord().toUpperCase()
var listOfTheWord = copyList(theWord)
//console.log(listOfTheWord)
document.getElementById("lengthword").innerHTML = `Le mot est de longueur ${theWord.length}`
document.getElementById("hint").innerHTML = '<a id="good">'+theWord[0]+'</a><a id="gray">'+'*'.repeat(theWord.length-1)+"</a>"
document.getElementsByClassName("load")[0].classList.add("hide")
document.getElementsByClassName("game")[0].classList.remove("hide")
const textzone = document.getElementById("typezone");
textzone.value = ""
textzone.maxLength = theWord.length
textzone.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addToProposition()
    }
});

