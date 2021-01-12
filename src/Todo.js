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
        if(this.done) this.container.classList = "done"
        
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