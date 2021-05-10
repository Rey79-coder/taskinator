
// console.dir() displays the HTML element as an object.
// Kown as a DOM element
// console.dir(window.document);

// console.log(event); best way to explore the data provided to an event object.

// window.document.querySelector("button"); // use in console brower to get an object representation of the <button> element.

// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl); // DELETE LATER

// buttonEl.addEventListener("click", function() {
//     alert("button clicked");
//   });

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

// THIS FUNCTION ADDS AND HTML ELEMENT USING DOM
var createTaskHandler = function(event) {
   event.preventDefault();
   // console.log(event)
   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

    
 // create list item
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 

// create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
  taskInfoEl.className = "task-info"; // given a class name
  
// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
listItemEl.appendChild(taskInfoEl);

  // HERE THE taskNameInput is DEFINED

  listItemEl.innerHTML = taskNameInput;
  tasksToDoEl.appendChild(listItemEl);  
}; 

  formEl.addEventListener("submit", createTaskHandler);