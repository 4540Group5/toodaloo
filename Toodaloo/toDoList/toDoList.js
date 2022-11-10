/*
I tried to store user data on a text file as to keep data when user
refreches the page and was not able to with vanillia js
if we want to store data we will have to use servers
looked into free servers for begginer and aws seems like the best option
*/
/*
const fs = require('fs/promises');

async function example() {
  window.alert('It almost ran');
  try {
    window.alert('It ran');

    const content = 'Some content!';
    await fs.writeFile('../toDoList/data.txt', content);
    window.alert('It worked');
  } catch (err) {
    window.alert('It failed');
    console.log(err);
  }
}
example();
*/
//window.alert('Hello world');
// Create a delete/close button and append it to each list item
var tasks = document.getElementsByTagName("LI");
var i;
for (i = 0; i < tasks.length; i++) {
  var span = document.createElement("SPAN");
  var text = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(text);
  tasks[i].appendChild(span);
}

/*
Click on a the delete button to hide the current list item from appearing in the list.
Hides the list element by applying display none to, "deleting" it.
*/
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }

}, false);

//Get the Add button from the HTML and adds a click event listner calling the add function
const element = document.getElementById("addBtn");
element.addEventListener("click", myFunction);

function myFunction() {
  newElement();
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var inputText = document.createTextNode(inputValue);
  li.appendChild(inputText);
  if (inputValue === '') {
    alert("Input is empty, try again");
  } else {
    document.getElementById("taskList").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var text = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(text);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
