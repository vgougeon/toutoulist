let todo = []
class Todo {
    name; 
    done = false; 
    removed = false;
    container = null;
    editMode = false;
    constructor(name) {
        this.name = name;
    }

    render() {
        this.container = document.createElement('div')
        
        const status = document.createElement('span')
        const toggle = document.createElement('button')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const remove = document.createElement('button')

        let title;
        if(!this.editMode) {
            title = document.createElement('span')
            title.innerText = this.name
            title.classList = "title"
        }
        else {
            title = document.createElement('div')
            title.classList = "flex"
            const input = document.createElement('input')
            const sendEdit = document.createElement('button')
            input.value = this.name
            input.onkeyup = (event) => { if(event.key === "Enter") this.sendEdit()}
            input.focus();
            sendEdit.innerText = "Valider"
            sendEdit.onclick = () => this.sendEdit()
            title.appendChild(input)
            title.appendChild(sendEdit)
        }
        

        status.innerText = this.done ? "Terminé" : "En cours"
        status.classList = "status"

        toggle.innerText = this.done ? "Déplacer dans 'En cours'" : "FINI !"
        toggle.onclick = () => this.toggle();

        edit.innerText = "Editer"; edit.classList = "ml-auto mr-1"
        edit.onclick = () => this.edit();

        remove.innerText = "Supprimer"
        remove.onclick = () => this.remove();

        actions.classList = "flex"
        actions.appendChild(toggle)
        actions.appendChild(edit)
        actions.appendChild(remove)

        this.container.appendChild(title)
        this.container.appendChild(status)
        this.container.appendChild(actions)
        return this.container
    }
    sendEdit() {
        this.name = this.container.children[0].children[0].value
        this.editMode = false;
        updateDisplay()
    }
    edit() {
        this.editMode = !this.editMode 
        updateDisplay()
    }
    remove() {
        this.removed = true
        updateDisplay()
    }
    toggle() {
        this.done = !this.done
        updateDisplay()
    }
}

function updateDisplay() {
    const pending = document.querySelector("#todoPending");
    const done = document.querySelector("#todoDone");
    pending.innerHTML = "", done.innerHTML = "";

    const pendingList = todo
    .filter(item => item.done === false && item.removed === false)
    .map(item => item.render())
    for(let item of pendingList) { pending.appendChild(item) }
    
    const doneList = todo
    .filter(item => item.done === true && item.removed === false)
    .map(item => item.render())
    for(let item of doneList) { done.appendChild(item) }

    document.querySelector("#pendingNb").innerText = pendingList.length || 0
    document.querySelector("#doneNb").innerText = doneList.length || 0
}

function add() {
    let task = document.querySelector("#taskName")
    if(task.value) {
        todo.push(new Todo(task.value))
        updateDisplay()
    }
}

function feedback() {
    const container = document.querySelector("#feedback")
    container.innerHTML = ""
    const title = document.createElement("h2")
    title.innerText = "Feedback"
    container.appendChild(title)

    const table = document.createElement("table")
    const thead = document.createElement("thead")
    table.appendChild(thead)
    const trhead = document.createElement("tr")
    thead.appendChild(trhead)
    const trh1 = document.createElement("th"); trh1.innerText = "Nom de la tâche"
    const trh2 = document.createElement("th"); trh2.innerText = "Status"
    trhead.appendChild(trh1); trhead.appendChild(trh2);

    const tbody = document.createElement("tbody")
    table.appendChild(tbody)
    for(let item of todo.sort((a, b) =>  Number(a.done) - Number(b.done))) {
        if(item.removed) continue;
        const row = document.createElement("tr")
        const name = document.createElement("td")
        name.innerText = item.name
        const status = document.createElement("td")
        status.innerText = item.done ? " Terminé" : " En cours"
        if(item.done) row.classList = "done"
        row.appendChild(name)
        row.appendChild(status)
        tbody.appendChild(row)
    }
    container.appendChild(table)
}




function init() {
    fetch('init.json')
    .then((res) => res.json())
    .then((json) => {
        if(Array.isArray(json)) {
            for(let item of json) {
                todo.push(new Todo(item))
            }
        }
        updateDisplay()
    })
}


init()