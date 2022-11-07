/*
I tried to store user data on a text file as to keep data when user
refreches the page and was not able to with vanillia js
if we want to store data we will have to use servers
looked into free servers for begginer and aws seems like the best option
*/
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
//window.alert('Hello world');

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
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


const element = document.getElementById("addBtn");
element.addEventListener("click", myFunction);

function myFunction() {
  //window.alert('pressed');
  newElement();
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
