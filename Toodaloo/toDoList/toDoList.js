
//Retrieving HTML elements related to lists
const myLists = document.querySelector('[data-multiple-lists]')
const listForm = document.querySelector('[data-list-form]')
const listInput = document.querySelector('[data-list-input]')
const deleteListBtn = document.querySelector('[data-delete-list-btn]')

//Retrieving HTML elements related to tasks/todo-list
const listDisplay = document.querySelector('[data-list-display]')
const listNameIn = document.querySelector('[data-list-name]')
const listCountIn = document.querySelector('[data-list-count]')
const myTasks = document.querySelector('[data-tasks]')
const taskForm = document.querySelector('[new-task-form]')
const taskIn = document.querySelector('[task-input]')
const taskTemplate = document.getElementById('task-template')


// Key value for referencing the lists array when retrieving it from persistent local storage
const listsLocalStorageKey = 'todo.lists'

// Id of the  selected list
const chosenListIdKey = 'todo.chosenList'

// Retrieve array of lists or make empty array of lists if it doesn't exist
var lists = JSON.parse(localStorage.getItem(listsLocalStorageKey)) || []
var chosenListId = localStorage.getItem(chosenListIdKey)


/* Takes user input for a new list and creates a new list object  */
listForm.addEventListener('submit', (event) =>{
  event.preventDefault() //Prevents form from submitting itself when submitting a new list

  const listName = listInput.value

  // Makes sure event listener doesn't do anything if the input for a new list is empty
  if(listName == null || listName === '') return
  const newList = createNewList(listName)
  listInput.value = null; //Clears out the input in the form when submitted

  lists.push(newList) //Adds new list to lists array
  save()
  render()

})

myLists.addEventListener('click', event =>{
  if (event.target.tagName.toLowerCase() === 'li'){
    chosenListId = event.target.dataset.listId //Retrieves data attribute called list-Id for the list element
    save()
    render()
  }
})


deleteListBtn.addEventListener('click', event => {
  lists = lists.filter(list => list.id !== chosenListId)
  chosenListId = null
  save()
  render()
})



taskForm.addEventListener('submit', event=> {
  event.preventDefault() //Prevents form from submitting itself when submitting a new list
  
  const taskNameIn = taskIn.value
  if (taskNameIn == null || taskNameIn === '') return
  const task = createTask(taskNameIn)
  taskIn.value = null


  const chosenList = lists.find(list => list.id === chosenListId)
  chosenList.tasks.push(task)

  //window.alert(taskNameIn);

  save()
  render()
})
function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }
}
// Saves needed variables into the persistent local storage
function save(){
  /* Saves the array of lists into the local storage so the lists will still be present
     after closing the extension */
  localStorage.setItem(listsLocalStorageKey, JSON.stringify(lists))

  /* Saves the id of the selected list to local storage so the selected state (bold)
     doesn't disappear */
  localStorage.setItem(chosenListIdKey, chosenListId)
}
/* Clears existing lists   */
function clearList(list){
  while (list.firstChild){
    list.removeChild(list.firstChild)
  }
}

//Creates a new list 
function createNewList(listName){
  return {id: Date.now().toString(), 
          name: listName, 
          tasks: [{id: 1, name: "test", complete: false}]
        }
}

/* Displays the multiple lists and tasks corresponding to each list */
function render(){
  clearList(myLists)
  displayLists()

  const chosenList = lists.find(list => list.id === chosenListId)

  //Display the selected list 
  if(chosenListId == null){ //Don't display unselected lists
    listDisplay.style.display = 'none'
  }
  else{
    listDisplay.style.display = ''
    listNameIn.innerText = chosenList.name
    displayTaskCount(chosenList)
    clearList(myTasks)
    renderTasks(chosenList) 
  }

}

// // ***************

function renderTasks(chosenList) {

  chosenList.tasks.forEach(task => {
    // window.alert("1")

    const addTask = document.importNode(taskTemplate.content, true)
    const checkbox = addTask.querySelector('input')
    // window.alert("2")

    checkbox.id = task.id
    checkbox.checked = task.complete
    // window.alert("3")

    const label = addTask.querySelector('label')
    label.htmlFor = task.id
    // window.alert("4")

    label.append(task.name)
    myTasks.appendChild(addTask)
    // window.alert("5")

    // window.alert(task.name)

  })
}

function displayLists(){
  //Sets object attributes to each element for the multiple lists 
  lists.forEach(list =>{
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id   //Sets data attribute called list-Id for the list element
    listElement.classList.add("list-name") //Sets list element as the HTML li element with class "list-name"
    listElement.innerText = list.name

    //Gives the selected list the chosen-list class in the HTML
    if(list.id === chosenListId){
      listElement.classList.add('chosen-list')
    }

    myLists.appendChild(listElement)
  })
}

//Displays number of tasks that are not checked/complete
function displayTaskCount(chosenList){
  //filters for unchecked tasks in selected list and returns the amount
  const uncheckedTaskCount = chosenList.tasks.filter(task => !task.complete).length 

  /*Displays the word 'task' if only one task is unchecked, or the word 'tasks' if 0 or more than one
    Example: 1 task remaining or 3 tasks remaining
  */
  const taskCountLabel = uncheckedTaskCount === 1 ? "task" : "tasks"
  listCountIn.innerText = `${uncheckedTaskCount} ${taskCountLabel} remaining` //String interpolation for task count

}

render();