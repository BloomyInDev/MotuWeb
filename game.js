function chooseWord() {
    //console.log(listword);
    let randomWord = listword[Math.floor(Math.random() * listword.length)];
    var rerool = true;
    while (rerool) {
        if (randomWord.length>4 && randomWord.length<10) {
            rerool = false;
            console.log("Word chosen, it's '"+randomWord+"'")
        } else {
            randomWord = listword[Math.floor(Math.random() * listword.length)];
            console.log("Reroll")
        }
    }
    return randomWord
}
function addToProposition(){
    var userWord = document.getElementById("typezone").value.toUpperCase();
    if (tryno != 4) {
        if (userWord.length === theWord.length) {
            tryno++
            columntable = ["no1","no2","no3","no4","no5"]
            console.log("In addToProposition()")
            var line = document.getElementById(columntable[tryno])
            finalOut = ""
            if (userWord == theWord) {
                finalOut = `<a id="good">${userWord}</a>`
                alert(`Partie gagnée, le mot était ${theWord} trouvé en ${tryno} essai(s)`)
                window.location.href = "/";
            } else {
                for (var i = 0; i < userWord.length; i++) {
                    if (theWord[i] == userWord[i]) {
                        finalOut+=`<a id="good">${userWord[i]}</a>`
                    } else if (theWord.includes(userWord[i])) {
                        finalOut+=`<a id="inword">${userWord[i]}</a>`
                    } else {
                        finalOut+=`<a id="bad">${userWord[i]}</a>`
                    }
                }
                //console.log(finalOut)
            }
            line.innerHTML = finalOut
        } else if (userWord.length != 0) {
            alert(`Le mot proposé n'est pas de la bonne longueur (longeure requise => ${theWord.length})`)
        }
    } else {
        alert(`Partie perdue, le mot était ${theWord}`)
        window.location.href = "/";
    }
}

var tryno = -1
var theWord = chooseWord().toUpperCase()
document.getElementById("lengthword").innerHTML = `Le mot est de longueur ${theWord.length}`
//document.getElementById("thing").innerHTML = theWord;
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
//var button = document.getElementById("button");
//button.addEventListener("click",addToProposition())

