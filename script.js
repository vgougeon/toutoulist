let dogs = []

function updateDisplay() {
    const pending = document.querySelector("#todoPending");
    const done = document.querySelector("#todoDone");
    pending.innerHTML = "", done.innerHTML = "";

    const pendingList = selected.todo
        .filter(item => item.done === false && item.removed === false)
        .map(item => item.render())
    for (let item of pendingList) { pending.appendChild(item) }

    const doneList = selected.todo
        .filter(item => item.done === true && item.removed === false)
        .map(item => item.render())
    for (let item of doneList) { done.appendChild(item) }

    document.querySelector("#pendingNb").innerText = pendingList.length || 0
    document.querySelector("#doneNb").innerText = doneList.length || 0

    const dogList = document.querySelector("#dogs")
    dogList.innerHTML = ""
    dogs.map(dog => dogList.appendChild(dog.render()))
}

function add() {
    let task = document.querySelector("#taskName")
    if (task.value) {
        selected.addTodo(task.value)
        task.value = ""
        updateDisplay()
    }
}
function keyPress(event) {
    if(event.key === "Enter") add()
}

function newDog() {
    dogs.push(new Dog());
    updateDisplay()
}

function feedback() {
    const container = document.querySelector("#feedback")
    container.innerHTML = ""
    const title = document.createElement("h2")
    title.innerText = "Feedback"
    container.appendChild(title)

    for (let dog of dogs) {
        const h3 = document.createElement("h3")
        h3.innerText = dog.name
        container.appendChild(h3)
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
        for (let item of dog.todo.sort((a, b) => Number(a.done) - Number(b.done))) {
            if (item.removed) continue;
            const row = document.createElement("tr")
            const name = document.createElement("td")
            name.innerText = item.name
            const status = document.createElement("td")
            status.innerText = item.done ? " Terminé" : " En cours"
            if (item.done) row.classList = "done"
            row.appendChild(name)
            row.appendChild(status)
            tbody.appendChild(row)
        }
        container.appendChild(table)
    }


}




function init() {
    fetch('init.json')
        .then((res) => res.json())
        .then((json) => {
            if (Array.isArray(json)) {
                for (let item of json) {
                    dogs.push(new Dog(item))
                }
            }
            selected = dogs[0] || null
            updateDisplay()
        })
}


init()