const root = document.getElementById('root')
const listSection = document.getElementById('listSection')
const editSection = document.getElementById('editSection')
const currentTime = document.getElementById('currentTime')
const textBox = document.getElementById('textBox')
const textArea = document.getElementById('textArea')
const saveBtn = document.getElementById('saveBtn')
const closeBtn = document.getElementById('closeBtn')
const addNotebtn = document.getElementById('addnote')

const listArray = []
let id = 0
let currentId = 0

function updateTime(){
    let date = new Date()
    let dateNow = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    let timeNow = date.getHours() + ':' + date.getMinutes()
    return (dateNow + ' / ' + timeNow)
}


saveBtn.addEventListener('click', () => {

    if (!textArea.value == '' || !textBox.value == '') {

        if (currentId != 0) {
            let currentObj = new CardList(textBox.value, textArea.value, currentId)
            listArray[currentId] = currentObj
            listSection.replaceChild(currentObj, listSection.children[currentId-1])
            reset()
        } else {
            id = id + 1
            //console.log("text area = " + textArea.value)
            let obj = new CardList(textBox.value, textArea.value, id)
            listArray.push(obj)

            //console.log(listArray.at(-1))
            listSection.appendChild(obj)

            reset()
        }


    } else {
        console.log('empty')
    }
})


function closePopup() {
    reset()
    editSection.style.display = 'none'
    addNotebtn.style.display = ''
}

function openPopup() {
    currentTime.innerText = updateTime()
    editSection.style.display = 'block'
    addNotebtn.style.display = 'none'
}

closeBtn.addEventListener('click', closePopup)
addNotebtn.addEventListener('click', openPopup)

function update(heading, content, id) {
    textBox.value = heading
    textArea.value = content
    currentId = id
    openPopup()
}

function reset() {
    textBox.value = ''
    textArea.value = ''
    currentId = 0
}

function resetCardID(){
    let divCard = document.querySelectorAll('.card')
        for(let i=0; i< divCard.length; i++)
        {
            divCard[i].setAttribute('id', i+1)        
        }
        if(divCard.length == 0){
            id = 0
        }
}

class CardList {
    constructor(heading, text, id) {
        this.div = document.createElement('div')
        this.title = document.createElement('h1')
        this.bannerCard = document.createElement('div')
        this.dateTime = document.createElement('span')
        this.discardBtn = document.createElement('button')
        this.openBtn = document.createElement('button')

        this.li = document.createElement('li')
        this.div.setAttribute('id', id)
        this.div.setAttribute('class', 'card')
        this.div.setAttribute('tabindex', '-1')
        this.bannerCard.setAttribute('class', 'banner')
        this.dateTime.setAttribute('id', 'dateTime')
        this.openBtn.setAttribute('id','openCard')
        this.discardBtn.setAttribute('id', 'discard')

        this.title.innerText = heading
        this.li.innerText = text
       this.dateTime.innerText = updateTime()
       this.openBtn.innerText = 'Open'
       this.discardBtn.innerText = 'Discard'

        this.div.addEventListener('dblclick', () => this.listCard())
        this.openBtn.addEventListener('click', () => this.listCard())
        
        //this.div.addEventListener('focusout', () => this.focusOutMethod())
        //this.closeCard.addEventListener('click', () => this.close())
        this.discardBtn.addEventListener('click', () => this.close())
        

        this.bannerCard.appendChild(this.dateTime)
        this.bannerCard.appendChild(this.openBtn)
        this.bannerCard.appendChild(this.discardBtn)
        this.div.appendChild(this.title)
       // this.div.appendChild(this.closeCard)
        this.div.appendChild(this.li)
        this.div.appendChild(this.bannerCard)
        return this.div
    }
    Card(id){
        update(this.title.innerText, this.li.innerText, id)
        console.log(id)
    }
    listCard() {
        update(this.title.innerText, this.li.innerText, this.div.id)
    }
    focusOutMethod() {
        //reset()
    }
    close() {
        reset()  
        this.div.remove()
        resetCardID()
    }
}