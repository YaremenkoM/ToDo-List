const clear = document.querySelector('.clear')
const date = document.querySelector('.date')
const list = document.getElementById('list')
const input = document.getElementById('input')
const addindCircle = document.querySelector('.addindCircle')

const check = "fa-check-circle"
const uncheck = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

let amountOfImages = 8
let indexOfBackground = Math.floor(Math.random()*(amountOfImages - 1) + 1)
const header = document.querySelector('.header')
header.style.backgroundImage = `url(./img/bg${indexOfBackground}.jpg)`

const dateElement = document.querySelector('.date')
const options = {weekday: 'long', month: 'short', day: 'numeric'}
let today = new Date()
dateElement.innerHTML = today.toLocaleDateString("ua-GB", options)

let LiST, id

let data = localStorage.getItem("TODO")

if(data){
    LIST = JSON.parse(data)
    loadToDo(LIST)
    id = LIST.length

} else {
    LIST = []
    id = 0
} 

function loadToDo(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


function addToDo(toDo, id, done, trash){

    if(trash) { return }

    const DONE = done ? check : uncheck 
    const LINE = done ? LINE_THROUGH : ""

    const text = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`

    const position = "beforeend"
    list.insertAdjacentHTML(position, text)
}

function drawToDo(){
    const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false)
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
        }
    input.value = ""
    id++
}


document.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        drawToDo()
    }
})

addindCircle.addEventListener("click", function(event){
    drawToDo()
})


function completeToDo(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true
}

list.addEventListener('click', function(event){
    let element = event.target
    const elementJOB = event.target.attributes.job.value
    if(elementJOB == "complete"){
        completeToDo(element)
    } else if (elementJOB == "delete"){
        removeToDo(element)
    }

    localStorage.setItem("TODO", JSON.stringify(LIST))
})


