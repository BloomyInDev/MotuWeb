function chooseWord() {
    let randomWord = listword[Math.floor(Math.random() * listword.length)];
    var rerool = true;
    while (rerool) {
        if (randomWord.length>3 && randomWord.length<9 && randomWord === randomWord.toLowerCase()) {
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
function updatehintzone(){
    console.log(lettersDiscovered)
    var line = document.getElementsByClassName('hint')[0]
    line.innerHTML = ''
    for (var i = 0; i < lettersDiscovered.length; i++) {
        let newDiv = document.createElement('div')
        newDiv.classList.add('column')
        if (lettersDiscovered[i] != -1){
            newDiv.innerText = lettersDiscovered[i]
            newDiv.classList.add('good')
        } else {
            newDiv.innerText = '*'
            newDiv.classList.add('gray')
        }
        line.appendChild(newDiv)
    }
}
function addToProposition(){
    var userWord = document.getElementById("typezone").value.toUpperCase();
    console.log(userWord, tryno)
    if (userWord.length === theWord.length){
        console.log("coucou")
        let line = document.getElementsByClassName('propositions')
        console.log(line.length)
        if (tryno <= line.length) {
            let actualLine = line[tryno]
            actualLine.classList.add('border')
            testFromUser = copyList(listOfTheWord)
            for (var i = 0; i < userWord.length; i++) {
                let newDiv = document.createElement('div')
                newDiv.innerText = userWord[i]
                newDiv.classList.add('column')
                //console.log(userWord[i], testFromUser.indexOf(userWord[i]))
                if (testFromUser.indexOf(userWord[i]) == i) {
                    if (lettersDiscovered[i] == -1) {lettersDiscovered.splice(i,1,theWord[i])}
                    testFromUser[i]=-1
                    newDiv.classList.add('good')
                } else if (testFromUser.indexOf(userWord[i]) != -1) {
                    testFromUser[i]=-1
                    newDiv.classList.add('inword')
                } else {
                    newDiv.classList.add('bad')
                }
                actualLine.appendChild(newDiv)
            }
        }
        tryno++
    }
    updatehintzone()
}
console.log(getComputedStyle(document.querySelector('body')).getPropertyValue('--widthword'))
var tryno = 0
var theWord = chooseWord().toUpperCase()
var listOfTheWord = copyList(theWord)
var lettersDiscovered = []
var canhint = true
document.querySelector('body').style.setProperty('--widthword', `${80/theWord.length <= 20 ? 80/theWord.length : 15}vw`)
for (var i = 0; i < theWord.length; i++) {
    if (i === 0 || theWord[i]===lettersDiscovered[0]) {lettersDiscovered.push(theWord[0])} else {lettersDiscovered.push(-1)}
}
//console.log(listOfTheWord)
document.getElementById("lengthword").innerHTML = `Le mot est de longueur ${theWord.length}`
//document.getElementById("hint").innerHTML = '<a id="good">'+theWord[0]+'</a><a id="gray">'+'*'.repeat(theWord.length-1)+"</a>"

document.getElementsByClassName("load")[0].classList.add("hide")
document.getElementsByClassName("game")[0].classList.remove("hide")
const textzone = document.getElementById("typezone");
textzone.value = ""
textzone.maxLength = theWord.length
updatehintzone()
textzone.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addToProposition()
    }
});
document.getElementById("hintbutton").addEventListener('click', function(event) {
    if (canhint) {
        if (confirm("Êtes-vous sur de vouloir un indice ?")) {
            canhint = false
            var retry = true
            while (retry) {
                var randomLetter = Math.floor(Math.random() * theWord.length)
                if (lettersDiscovered[randomLetter]==-1) {
                    retry = false
                }
            }
            lettersDiscovered.splice(randomLetter,1,theWord[randomLetter])
            updatehintzone()
            alert("Votre indice est arrivé !")
        }
    }
})
document.getElementById("youareanlooser").addEventListener('click', function(event){
    if (confirm("Êtes-vous sur de vouloir abandonner ?")) {
        alert(`Partie perdue, le mot était ${theWord}`)
        history.back()
    }
})
document.getElementById("getword").addEventListener('click', function(event){
    alert(theWord)
})