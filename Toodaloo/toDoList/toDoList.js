const myLists = document.querySelector('[data-multiple-lists]')

const listForm = document.querySelector('[data-list-form]')
const listInput = document.querySelector('[data-list-input]')

// Array to store todo-lists
var lists = [{
  id: 1,
  name: 'list 1'
}, {
  id: 2,
  name: 'list 2'
}]

/* Takes user input for a new list and creates a new list object  */
listForm.addEventListener('submit', event =>{
  event.preventDefault() //Prevents form from submitting itself when submitting a new list

  const listName = listInput.value

  // Makes sure event listener doesn't do anything if the input for a new list is empty
  if(listName == null || listName === '') return
  const newList = createNewList(listName)
  listInput.value = null; //Clears out the input in the form when submitted

  lists.push(newList) //Adds new list to lists array
  render();
})

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
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name") //Sets list element as the HTML li element with class "list-name"
    listElement.innerText = list.name

    myLists.appendChild(listElement)
  })

}


render();