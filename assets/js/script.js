
// console.dir() displays the HTML element as an object.
// Kown as a DOM element
// console.dir(window.document);

// window.document.querySelector("button"); // use in console brower to get an object representation of the <button> element.

// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl); // DELETE LATER

// buttonEl.addEventListener("click", function() {
//     alert("button clicked");
//   });


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

// check if input values are empty strings


var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
// check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset()

    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };
  
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

  };

  // NEW FUNCTION START 
var createTaskEl = function(taskDataObj) {

    // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// create div to hold task info
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

 // add entire list item to list
 tasksToDoEl.appendChild(listItemEl);

};

formEl.addEventListener("submit", taskFormHandler);


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

var buttonEl = document.querySelector("#save-task"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  listItemEl.textContent = "This is a new task."; 
  tasksToDoEl.appendChild(listItemEl); 
  }; 

buttonEl.addEventListener("click", createTaskHandler);
