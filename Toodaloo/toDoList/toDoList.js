const myLists = document.querySelector('[data-multiple-lists]')

const listForm = document.querySelector('[data-list-form]')
const listInput = document.querySelector('[data-list-input]')
const deleteListBtn = document.querySelector('[data-delete-list-btn]')

// Key value for referencing the lists array when retrieving it from persistent local storage
const listsLocalStorageKey = 'todo.lists'

// Id of the  selected list
const chosenListIdKey = 'todo.chosenList'

// Retrieve array of lists or make empty array of lists if it doesn't exist
var lists = JSON.parse(localStorage.getItem(listsLocalStorageKey)) || []
var chosenListId = localStorage.getItem(chosenListIdKey)

/* Takes user input for a new list and creates a new list object  */
listForm.addEventListener('submit', event =>{
  event.preventDefault() //Prevents form from submitting itself when submitting a new list

  const listName = listInput.value

  // Makes sure event listener doesn't do anything if the input for a new list is empty
  if(listName == null || listName === '') return
  const newList = createNewList(listName)
  listInput.value = null; //Clears out the input in the form when submitted

  lists.push(newList) //Adds new list to lists array
  save()
  render();
})

myLists.addEventListener('click', event =>{
  if (event.target.tagName.toLowerCase() === 'li'){
    chosenListId = event.target.dataset.listId //Retrieves data attribute called list-Id for the list element
    save()
    render()
  }
})


deleteListBtn.addEventListener('click', event =>{
  lists = lists.filter(list => list.id !== chosenListId)
  chosenListId = null
  save()
  render()
})

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
          tasks: []
        }
}

/* Displays the multiple lists and tasks corresponding to each list */
function render(){
  clearList(myLists)

  //Sets object attributes to each element for the multiple lists 
  lists.forEach(list =>{
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id //Sets data attribute called list-Id for the list element
    listElement.classList.add("list-name") //Sets list element as the HTML li element with class "list-name"
    listElement.innerText = list.name

    //Gives the selected list the chosen-list class in the HTML
    if(list.id === chosenListId){
      listElement.classList.add('chosen-list')
    }

    myLists.appendChild(listElement)
  })

}


render();