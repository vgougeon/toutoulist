let selected = null
class Dog {
    static nbDog = 0
    todo = []
    name;
    constructor(value) {
        this.name = "Chien " + (++Dog.nbDog)
        if(value) {
            this.name = value.name
            this.todo = value.todo.map((t) => new Todo(t))
        }
    }

    render() {
        
        const button = document.createElement('button')
        if(selected.name === this.name) button.classList = "selected"
        button.innerText = this.name
        button.onclick = () => { selected = this, updateDisplay()}
        return button
    }

    addTodo(name) {
        this.todo.push(new Todo(name))
    }
}