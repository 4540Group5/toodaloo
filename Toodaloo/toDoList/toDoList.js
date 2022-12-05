
//Retrieving HTML elements related to lists
const myLists = document.querySelector('[data-multiple-lists]')
const listForm = document.querySelector('[data-list-form]')
const listInput = document.querySelector('[data-list-input]')
const deleteListBtn = document.querySelector('[data-delete-list-btn]')
const deleteCheckedTasksBtn = document.querySelector('[data-delete-checked-tasks-btn]')

//Retrieving HTML elements related to tasks/todo-list
const listDisplay = document.querySelector('[data-list-display]')
const listNameIn = document.querySelector('[data-list-name]')
const listCountIn = document.querySelector('[data-list-count]')
const myTasks = document.querySelector('[data-tasks]')
const taskForm = document.querySelector('[new-task-form]')
const taskIn = document.querySelector('[task-input]')
const taskTemplate = document.getElementById('task-template')


//Retrieving HTML/CSS elements for theme color changing
const themeDropdown = document.querySelector('[data-theme-dropdown]')
const chosenTheme = document.querySelector('[data-theme-dropdown]').value
const root = document.querySelector(':root')


// Key value for referencing the lists array when retrieving it from persistent local storage
const listsLocalStorageKey = 'todo.lists'

// Id of the  selected list
const chosenListIdKey = 'todo.chosenList'

//Key values of extension's color theme
const chosenThemeKey = 'todo.chosenTheme'
const mainHeaderClrKey = 'todo.main-header-color'
const mainHeaderContentClrKey = 'todo.main-header-content-color'
const todoHeaderClrKey = 'todo.todolist-header-color'
const todoHeaderContentClrKey = 'todo.todolist-header-content-color'
const taskClrKey = 'todo.task-color-key'
const taskNthChildClrKey = 'todo.task-nthChild-color'
const taskCheckboxClrKey = 'task-checkbox-color'
const labelTextClrKey = 'todo.label-text-color'
const deleteSectionClrKey = 'todo.delete-color'
const deleteBtnClrKey = 'todo.delete-btn-color'
const themeSectionClrKey = 'todo.theme-section-color'
const themeDropdownClrKey = 'todo.theme-dropdown-color'
const changeThemeTextKey = 'todo.change-theme-text=color'

//Retrieve array of lists or make empty array of lists if it doesn't exist
var lists = JSON.parse(localStorage.getItem(listsLocalStorageKey)) || []

//Retrieve id value of chosen/selected list
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


/* When a list label is clicked, it sets the list as the selected list  */
myLists.addEventListener('click', event =>{
  if (event.target.tagName.toLowerCase() === 'li'){
    chosenListId = event.target.dataset.listId //Retrieves data attribute called list-Id for the list element
    save()
    render()
  }
})


/* Sets the task label as checked when clicked on */
myTasks.addEventListener('click', event =>{
  if(event.target.tagName.toLowerCase() === 'input') {
    const chosenList = lists.find(list => list.id === chosenListId)
    const chosenTask = chosenList.tasks.find(task => task.id === event.target.id)

    chosenTask.isChecked = event.target.checked //sets the task's isChecked value to true or false

    save()
    displayTaskCount(chosenList)
  }
})


/* Deletes the selected lists */
deleteListBtn.addEventListener('click', event => {
  //Filters out the selected list in the lists object
  lists = lists.filter(list => list.id !== chosenListId)
  chosenListId = null
  save()
  render()
})


/* Deletes the checked tasks from the todo-list*/
deleteCheckedTasksBtn.addEventListener('click', event =>{
  const chosenList = lists.find(list => list.id === chosenListId)
  chosenList.tasks = chosenList.tasks.filter(task => !task.isChecked) //Filters out checked tasks from the tasks array

  save()
  render()
})


/* Takes user input for a new task and creates a task object */
taskForm.addEventListener('submit', event=> {
  event.preventDefault() //Prevents form from submitting itself when submitting a new list
  
  const taskNameIn = taskIn.value
  if (taskNameIn == null || taskNameIn === '') return
  const task = createNewTask(taskNameIn)
  taskIn.value = null


  const chosenList = lists.find(list => list.id === chosenListId)
  chosenList.tasks.push(task)

  save()
  render()
})


/* Sets the selected theme from dropdown as the current theme */
themeDropdown.addEventListener('change', event =>{

  //Sets the designated colors for each css property depending on the selected theme in the dropdown

  if(themeDropdown.value === 'sky'){ //Sky
    localStorage.setItem(chosenThemeKey, 'sky') 

    //Saves colors to the keys of their css properties in the local storage
    localStorage.setItem(mainHeaderClrKey, '#36bbf4')
    localStorage.setItem(mainHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(todoHeaderClrKey, '#EEEEEE')
    localStorage.setItem(todoHeaderContentClrKey, '#000000')
    localStorage.setItem(taskClrKey, '#EEEEEE')
    localStorage.setItem(taskNthChildClrKey, '#F9F9F9')
    localStorage.setItem(taskCheckboxClrKey, '#36bbf4')
    localStorage.setItem(labelTextClrKey, '#000000')
    localStorage.setItem(deleteSectionClrKey, '#36bbf4')
    localStorage.setItem(deleteBtnClrKey, '#FFFFFF')
    localStorage.setItem(themeSectionClrKey, '#EEEEEE')
    localStorage.setItem(themeDropdownClrKey, '#36bbf4')
    localStorage.setItem(changeThemeTextKey , '#000000')
  }
  else if(themeDropdown.value === 'prairie'){ //Prairie
    localStorage.setItem(chosenThemeKey, 'prairie') 


    localStorage.setItem(mainHeaderClrKey, '#008017')
    localStorage.setItem(mainHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(todoHeaderClrKey, '#F6E09A')
    localStorage.setItem(todoHeaderContentClrKey, '#000000')
    localStorage.setItem(taskClrKey, '#F6E09A')
    localStorage.setItem(taskNthChildClrKey, '#FAECBE')
    localStorage.setItem(taskCheckboxClrKey, '#008017')
    localStorage.setItem(labelTextClrKey, '#000000')
    localStorage.setItem(deleteSectionClrKey, '#008017')
    localStorage.setItem(deleteBtnClrKey, '#FFFFFF')
    localStorage.setItem(themeSectionClrKey, '#F6E09A')
    localStorage.setItem(themeDropdownClrKey, '#008017')
    localStorage.setItem(changeThemeTextKey , '#000000')
  }
  else if(themeDropdown.value ==='raven'){ //Raven
    localStorage.setItem(chosenThemeKey, 'raven') 


    localStorage.setItem(mainHeaderClrKey, '#490FBD')
    localStorage.setItem(mainHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(todoHeaderClrKey, '#101010')
    localStorage.setItem(todoHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(taskClrKey, '#1E1E1E')
    localStorage.setItem(taskNthChildClrKey, '#101010')
    localStorage.setItem(taskCheckboxClrKey, '#490FBD')
    localStorage.setItem(labelTextClrKey, '#FFFFFF')
    localStorage.setItem(deleteSectionClrKey, '#490FBD')
    localStorage.setItem(deleteBtnClrKey, '#FFFFFF')
    localStorage.setItem(themeSectionClrKey, '#101010')
    localStorage.setItem(themeDropdownClrKey, '#490FBD')
    localStorage.setItem(changeThemeTextKey , '#FFFFFF')
  }
  else if(themeDropdown.value === 'light'){ //Light
    localStorage.setItem(chosenThemeKey, 'light')


    localStorage.setItem(mainHeaderClrKey, '#FBFCFC')
    localStorage.setItem(mainHeaderContentClrKey, '#000000')
    localStorage.setItem(todoHeaderClrKey, '#B9B9B9')
    localStorage.setItem(todoHeaderContentClrKey, '#000000')
    localStorage.setItem(taskClrKey, '#C4C4C4')
    localStorage.setItem(taskNthChildClrKey, '#D5D5D5')
    localStorage.setItem(taskCheckboxClrKey, '#FBFCFC')
    localStorage.setItem(labelTextClrKey, '#000000')
    localStorage.setItem(deleteSectionClrKey, '#FBFCFC')
    localStorage.setItem(deleteBtnClrKey, '#000000')
    localStorage.setItem(themeSectionClrKey, '#B9B9B9')
    localStorage.setItem(themeDropdownClrKey, '#FBFCFC')
    localStorage.setItem(changeThemeTextKey , '#000000')
  }
  else if(themeDropdown.value ==='dark'){ //Dark
    localStorage.setItem(chosenThemeKey, 'dark')


    localStorage.setItem(mainHeaderClrKey, '#1B1C21')
    localStorage.setItem(mainHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(todoHeaderClrKey, '#272930')
    localStorage.setItem(todoHeaderContentClrKey, '#FFFFFF')
    localStorage.setItem(taskClrKey, '#272930')
    localStorage.setItem(taskNthChildClrKey, '#1B1C21')
    localStorage.setItem(taskCheckboxClrKey, '#5D616E')
    localStorage.setItem(labelTextClrKey, '#FFFFFF')
    localStorage.setItem(deleteSectionClrKey, '#333640')
    localStorage.setItem(deleteBtnClrKey, '#FFFFFF')
    localStorage.setItem(themeSectionClrKey, '#1B1C21')
    localStorage.setItem(themeDropdownClrKey, '#333640')
    localStorage.setItem(changeThemeTextKey , '#FFFFFF')
  }

  render()
})



/* Creates a new list */
function createNewList(listName){
  return {id: Date.now().toString(), 
          name: listName, 
          tasks: []
        }
}


/* Creates a new task */      
function createNewTask(name) {
  return { id: Date.now().toString(), name: name, isChecked: false }
}


/* Saves needed variables into the persistent local storage */
function save(){
  /* Saves the array of lists into the local storage so the lists will still be present
     after closing the extension */
  localStorage.setItem(listsLocalStorageKey, JSON.stringify(lists))

  /* Saves the id of the selected list to local storage so the selected state (bold)
     doesn't disappear */
  localStorage.setItem(chosenListIdKey, chosenListId)
}


/* Clears existing lists  */
function clearList(list){
  while (list.firstChild){
    list.removeChild(list.firstChild)
  }
}


/* Displays the multiple lists and tasks corresponding to each list */
function render(){
  clearList(myLists)
  displayLists()
  displayChosenThemeValue()
  displayThemeColors()

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
    displayTasks(chosenList) 
  }

}


/* Displays tasks */
function displayTasks(chosenList) {

  chosenList.tasks.forEach(task => {

    const addTask = document.importNode(taskTemplate.content, true)
    const checkbox = addTask.querySelector('input')

    checkbox.id = task.id
    checkbox.checked = task.isChecked

    const label = addTask.querySelector('label')
    label.htmlFor = task.id

    label.append(task.name)
    myTasks.appendChild(addTask)

  })
}


/* Displays the lists */
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


/* Displays number of tasks that are not checked/complete */
function displayTaskCount(chosenList){
  //Filters for unchecked tasks in selected list and returns the amount
  const uncheckedTaskCount = chosenList.tasks.filter(task => !task.isChecked).length 

  /*Displays the word 'task' if only one task is unchecked, or the word 'tasks' if 0 or more than one
    Example: 1 task unchecked or 3 tasks unchecked
  */
  const taskCountLabel = uncheckedTaskCount === 1 ? "task" : "tasks"
  listCountIn.innerText = `${uncheckedTaskCount} ${taskCountLabel} unchecked` //String interpolation for task count

}

/* Display the selected theme in the dropdown */
function displayChosenThemeValue(){
  const currentTheme = localStorage.getItem(chosenThemeKey)
  
  //Set the value of the theme dropdown 
  if(currentTheme !== null){
    themeDropdown.value = currentTheme
  }
}

/* Display the chosen/selected theme color */
function displayThemeColors(){
  const mainHeaderColor = localStorage.getItem(mainHeaderClrKey)
  const mainHeaderContentColor = localStorage.getItem(mainHeaderContentClrKey)
  const todoHeaderColor = localStorage.getItem(todoHeaderClrKey)
  const todoHeaderContentColor = localStorage.getItem(todoHeaderContentClrKey)
  const taskColor = localStorage.getItem(taskClrKey)
  const taskNthChildColor = localStorage.getItem(taskNthChildClrKey)
  const taskCheckboxColor = localStorage.getItem(taskCheckboxClrKey)
  const labelTextColor = localStorage.getItem(labelTextClrKey)
  const deleteSectionColor = localStorage.getItem(deleteSectionClrKey)
  const deleteBtnColor = localStorage.getItem(deleteBtnClrKey)
  const themeSectionColor = localStorage.getItem(themeSectionClrKey)
  const themeDropdownColor = localStorage.getItem(themeDropdownClrKey)
  const changeThemeTextColor = localStorage.getItem(changeThemeTextKey)

  //Set
  if(mainHeaderColor !== null){
    root.style.setProperty('--clr-main-header', mainHeaderColor);
  }
  if(mainHeaderContentColor !== null){
    root.style.setProperty('--clr-main-header-content', mainHeaderContentColor);
  }
  if(todoHeaderColor !== null){
    root.style.setProperty('--clr-todo-header', todoHeaderColor);
  }
  if(todoHeaderContentColor !== null){
    root.style.setProperty('--clr-todo-header-content', todoHeaderContentColor);
  }
  if(taskColor !== null){
    root.style.setProperty('--clr-task', taskColor);
  }
  if(taskNthChildColor !== null){
    root.style.setProperty('--clr-task-nthChild', taskNthChildColor);
  }
  if(taskCheckboxColor !== null){
    root.style.setProperty('--clr-task-checkbox', taskCheckboxColor);
  }
  if(labelTextColor !== null){
    root.style.setProperty('--clr-label-text', labelTextColor);
  }
  if(deleteSectionColor !== null){
    root.style.setProperty('--clr-delete-section', deleteSectionColor);
  }
  if(deleteBtnColor !== null){
    root.style.setProperty('--clr-delete-btn-text', deleteBtnColor);
  }
  if(themeSectionColor !== null){
    root.style.setProperty('--clr-theme-section', themeSectionColor);
  }
  if(themeDropdownColor !== null){
    root.style.setProperty('--clr-theme-dropdown', themeDropdownColor);
  }
  if(changeThemeTextColor !== null){
    root.style.setProperty('--clr-change-theme-text', changeThemeTextColor);
  }
}
render();