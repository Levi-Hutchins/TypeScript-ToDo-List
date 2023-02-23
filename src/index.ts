import {v4 as uuidV4} from "uuid"

//console.log(uuidV4())
// Task object for every new to do task
type Task = { 
  id: string,
  title: string,
  completed: false,
  createdAt: Date
}

// get each element while also defining its HTMlL type
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task")
const input = document.querySelector<HTMLInputElement>("#task-title")

const tasks: Task[] = loadTasks() // Populate the task array of task objects

// Iterate through each task and call addListItem function
tasks.forEach(addListItem)



form?.addEventListener("submit", e =>{
  e.preventDefault()

  if(input?.value == " " || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title:input.value,
    completed: false,
    createdAt:new Date(),
  }
  tasks.push(newTask)

  addListItem(newTask)

  input.value = ""

})
function addListItem(task: Task){
  const item = document.createElement("li")

  const label = document.createElement("label")

  const checkbox  = document.createElement("input")
  checkbox.addEventListener("change", () =>{
      saveTasks()    
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)

  item.append(label)
  list?.append(item)
}


function saveTasks(){
  localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS")
  if(taskJson == null ) return []
  return JSON.parse(taskJson)
  
}