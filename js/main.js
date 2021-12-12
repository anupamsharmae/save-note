const root = document.getElementById('root')
const addNotebtn = document.getElementById('addNotebtn')
const listSection = document.getElementById('listSection')
const editSection = document.getElementById('editSection')
const textBox = document.getElementById('textBox')
const textArea = document.getElementById('textArea')
const saveBtn = document.getElementById('saveBtn')
const listArray = []
let id = 0
let currentId = 0


saveBtn.addEventListener('click', (e) => {
    
    if (!textArea.value == '' || !textBox.value =='') {

        if (currentId != 0) {
            let currentObj = new CardList(textBox.value, textArea.value, currentId)
            listArray[currentId] = currentObj
            listSection.replaceChild(currentObj, listSection.childNodes[currentId])
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


function update(heading, content, id) {
    textBox.value = heading
    textArea.value = content
    currentId = id
}

function reset(){
    textBox.value = ''
    textArea.value = ''
    currentId = 0
}

class CardList {
    constructor(heading, text, id) {
        this.div = document.createElement('div')
        this.title = document.createElement('h1')
        this.closeBtn = document.createElement('span')
        
        this.li = document.createElement('li')
        this.div.setAttribute('id', id)
        this.div.setAttribute('class', 'card')
        this.div.setAttribute('tabindex','-1')
        this.closeBtn.setAttribute('class','closeBtn')
        this.title.innerText = heading
        this.li.innerText = text
        this.closeBtn.innerText = 'X'

        this.div.addEventListener('focusin', () => this.listCard())
        this.div.addEventListener('focusout',()=> this.focusOutMethod())
        this.closeBtn.addEventListener('click', ()=>this.close())
        this.div.appendChild(this.title)
        this.div.appendChild(this.closeBtn)
        this.div.appendChild(this.li)
        return this.div
    }

    listCard() {
        update(this.title.innerText, this.li.innerText, this.div.id)
    }
    focusOutMethod(){ 
        //reset()
    }
    close(){
        reset()
        this.div.remove()
    }
}