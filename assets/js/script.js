
// console.dir() displays the HTML element as an object.
// Kown as a DOM element
// console.dir(window.document);

// window.document.querySelector("button"); // use in console brower to get an object representation of the <button> element.

// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl); // DELETE LATER

// buttonEl.addEventListener("click", function() {
//     alert("button clicked");
//   });
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");


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


// above the declaration for var taskDataObj
  var isEdit = formEl.hasAttribute("data-task-id");

    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };
  
    // send it as an argument to createTaskEl
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
    
      createTaskEl(taskDataObj);
    }

  };

  var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
     taskSelected.querySelector("h3.task-name").textContent = taskName;
     taskSelected.querySelector("span.task-type").textContent = taskType;

     alert("Task Updated!");

     formEl.removeAttribute("data-task-id");
     document.querySelector("#save-task").textContent = "Add Task";
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

// create EDIT button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create DELETE button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.addEventListener("click", deleteButtonEl);

deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

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

var buttonEl = document.querySelector("#save-task"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  listItemEl.textContent = "This is a new task."; 
  tasksToDoEl.appendChild(listItemEl); 
  }; 


// NEW FUNCTION START

var taskButtonHandler = function(event) {
 /// get target element from event
 var targetEl = event.target;

 // edit button was clicked
if (targetEl.matches(".edit-btn")) {
  var taskId = targetEl.getAttribute("data-task-id");
  editTask(taskId);
} 

  // NEW FUNCTION START

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

if (event.target.matches(".delete-btn")) {
  var taskId = event.target.getAttribute("data-task-id");
  deleteTask(taskId);
}
// delete button was clicked
else if (targetEl.matches(".delete-btn")) {
  var taskId = targetEl.getAttribute("data-task-id");
  deleteTask(taskId);
  
};
}

pageContentEl.addEventListener("click", taskButtonHandler);


 // NEW FUNCTION

  var editTask = function(taskId) {
  

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);

}
  
pageContentEl.addEventListener("click", taskButtonHandler);


var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected)
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);

  }

};

  pageContentEl.addEventListener("change", taskStatusChangeHandler);


buttonEl.addEventListener("click", createTaskHandler);

