
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

var taskIdCounter = 0;
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

 // add task id as a custom attribute
 listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

 // add entire list item to list
 tasksToDoEl.appendChild(listItemEl);

   // increase task counter for next unique id
   taskIdCounter++;

};


// NEW FUNCTION START

var createTaskActions = function(taskId) {

  var actionContainerEl = document.createElement("div");
actionContainerEl.className = "task-actions";

// create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

var statusChoices = ["To Do", "In Progress", "Completed"];
for (var i = 0; i < statusChoices.length; i++) {
  
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select
  statusSelectEl.appendChild(statusOptionEl);
}


return actionContainerEl;

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


  
