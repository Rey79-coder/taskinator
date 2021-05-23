//  DEFINE TASK COUNTER TO START FROM 0.
var taskIdCounter = 0;


//  LINK THE FIRST FIELD FORM WITH HTML 'Enter Task Name'.
var formEl = document.querySelector("#task-form");

//  LINK THE FIRST COLUMN 'TASK TO DO' WITH HTML.
var tasksToDoEl = document.querySelector("#tasks-to-do");

//  LINK THE SECOND COLUMN 'TASKS IN PROGRESS' WITH HTML.
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

//  LINK THE FIRST COLUMN 'TASK COMPLETED' WITH HTML.
var tasksCompletedEl = document.querySelector("#tasks-completed");

//  LINK THE THE WHOLE MAIN CONTAINER WITH HTML.
var pageContentEl = document.querySelector("#page-content");


//  WE NEED EMPTY ARRAY TO HOLD NEW TASKS FOR SAVING.
var tasks = [];



// 1ST. FUNCTION TO HANDLE THE FORM INPUT
var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // TO CHECK IF input values are empty strings.
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // RESET FORM FIELDS FOR NEXT TASK TO BE ENTER.
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // CHECK IF TASK IS NEW ON ONE BEING EDITED BY SEEIN IF IT HAS DATA-TASK-ID ATTRIBUTE.
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // NO DATA ATTRIBUTE, so create object as normal and pass to CREATETASK FUNCTION.
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };

    createTaskEl(taskDataObj);
  }
};

// 2ND. FUNCTION TO LIST A NEW ELEMENT INSIDE THE COLUMN.

var createTaskEl = function (taskDataObj) {
  // CREATE A LIST ELEMENT
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // ASS TASK ID as a custom attribute.
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // CREATE A DIV ELEMENT to hold taskS info.
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  // DEFINE WHAT TASKACTIONEL IS EQUALS TO.
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // USE AN ITERATION TO MOVE TASKS AMONG COLUMNS.
  switch (taskDataObj.status) {
    case "to do":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.append(listItemEl);
      break;
    case "in progress":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.append(listItemEl);
      break;
    case "completed":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.append(listItemEl);
      break;
    default:
      console.log("Something went wrong!");
  }

  // SAVE TASK AS AN OBJECT WITH NAME, TYPE, STATUS, AND ID PROPERTIES.
  taskDataObj.id = taskIdCounter;

  // THEN, PUSH IT INTO TASKS ARRAY.
  tasks.push(taskDataObj);

  // SAVE TASK TO LOCAL STORAGE WITH A CALL BACK FUNCTION.
  saveTasks();

  // INCREASE TASK COUNTER FOR NEXT UNIQUE TASK ID.
  taskIdCounter++;
};


// 3RD. FUNCTION TO GIVE ACTION TO ELEMENTS SUCH AS BUTTONS.
var createTaskActions = function (taskId) {

  // THIS WILL BE THE CONTAINER TO HOLD ELEMENTS.
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  ///////////////////////////////////

  // CREATE EDIT button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  // TO MAKE THE PREVIOUS BUTTON APPEAR IN THE BROWSER.
  actionContainerEl.appendChild(editButtonEl);

  ///////////////////////////////////

  // CREATE DELETE button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  // TO MAKE THE PREVIOUS BUTTON APPEAR IN THE BROWSER.
  actionContainerEl.appendChild(deleteButtonEl);

  ///////////////////////////////////

  // CREATE CHANGE STATUS DROPDOWN button
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";

  // TO MAKE THE PREVIOUS BUTTON APPEAR IN THE BROWSER.
  actionContainerEl.appendChild(statusSelectEl);


  // NOW STATUS BUTTON NEEDS OPTIONS.
  var statusChoices = ["to do", "In Progress", "Completed"];

  // ITERATION WILL ASSIGN PREVIOUS BUTTONS TO EACH TASK.
  for (var i = 0; i < statusChoices.length; i++) {

    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // TO MAKE THE PREVIOUS BUTTON APPEAR IN THE BROWSER.
    statusSelectEl.appendChild(statusOptionEl);
  }

  // ACTIVATE THE FUCTION.
  return actionContainerEl;
};




// 4TH. FUNCTION TO HOLD THE COMPLETED TASKS.
var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // SET NEW VALUES ACCORDING TO THE FUNCTIONS.
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // LOOP FOR EACH TASK ARRAY AND TASK OBJECT WITH NEW CONTENT AND CONDITIONALS.
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  alert("Task Updated!");

  // REMOVE DATA ATTRIBUTE FROM FORM.
  formEl.removeAttribute("data-task-id");

  // UPDATE FORMEL BUTTON TO GO BACK AND DISPLAY "ADD TASK" INSTEAD OF "EDIT TASK".
  document.querySelector("#save-task").textContent = "Add Task";

  // SAVE TASK TO LOCAL STORAGE WITH A CALL BACK FUNCTION.
  saveTasks();
};




// 5TH. FUNCTION TO HANDLE THE BEHAVIOR OF THE BUTTONS.
var taskButtonHandler = function (event) {

  /// TARGETS THE ELEMENT WITH AN EVENT.
  var targetEl = event.target;

  // CONDITION FOR edit button WHEN IS clicked.
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);

    // Multiple if...else statements can be nested to create an ELSE IF CLAUSE (stipulation).
  } else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};



// 6TH. FUNCTION TO HANDLE THE STATUS.
var taskStatusChangeHandler = function (event) {

  // FIND THE TASK LIST item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // CONVERT VALUE TO LOWER CASES.
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {

    tasksToDoEl.appendChild(taskSelected);

  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);

  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // ITERATION TO UPDATE TASKS in tasks array.
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  // SAVE TASK TO LOCAL STORAGE WITH A CALL BACK FUNCTION.
  saveTasks();
};


// 7TH. FUNCTION TO EDIT TASKS.
var editTask = function (taskId) {

  // GET TASK ID ELEMENT.
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );


  // GET CONTENT FROM TASK NAME AND TYPE.
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // WRITE .VALUE OF TASKNAME AND TASKTYPE TO FORM TO BE EDITED.
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // SET DATA ATTRIBUTE TO THE FORM WITH A VALUE OF THE TASK'S ID.
  // SO, IT KNOWS WHICH ONE IS BEING EDITED.
  formEl.setAttribute("data-task-id", taskId);

  // UPDATE TEXT'S BUTTON TO REFLECT 'EDITING A TASK' RATHER THAT CREATING A NEW ONE.
  formEl.querySelector("#save-task").textContent = "Save Task";
};



// 8TH FUNCTION TO REMOVE TASKS.
var deleteTask = function (taskId) {

  // FIND TASK LIST ELEM WITH TASKID VALUE AND DELETE IT.
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  // CREATE AND UPDATED ARRAY TO HOLD THE UPDATED LIST OF TASKS.
  var updatedTaskArr = [];

  // LOOP THROUGH CURRENT TASKS.
  for (var i = 0; i < tasks.length; i++) {

    // IF TASK [i].id DOESN'T MATCH the value of taskId, let's keep that task and push it into the new array.
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // REASIGN TASK ARRAY to be the same as updatedTaskArr.
  tasks = updatedTaskArr;

  saveTasks();
};



// 9TH. FUNCTION TO SAVE TASKS IN LOCAL STORAGE 
// (FINALLY AFTER BEING CALLED 4 TIMES PREVIOUSLY).
var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


// 10TH. FUNCTION TO LOAD TASKS. 
// (THIL WILL MAKE THE TASKS PERSIST AFTER BEING REFRESHED).
var loadTasks = function () {
  var savedTasks = localStorage.getItem("tasks");

  // IF THERE ARE NO TASKS, SET TASKS TO AN EMPTY ARRAY AND RETURN OUT TO THE FUNCTION. 
  if (!savedTasks) {
    return false;
  }

  // IF NOT, LOAD UP SAVED TASKS.
  savedTasks = JSON.parse(savedTasks);

  // LOOP FOR SAVEDTASKS ARRAY
  for (var i = 0; i < savedTasks.length; i++) {

    // PASS EACH TASK OBJECT into the `createTaskEl()` function.
    createTaskEl(savedTasks[i]);
  }
};


// WE HAVE TO ADD EVENT LISTENER SO WILL EXECUTE THE PREVIOUS CODE.

// CREATE A NEW TASK.
formEl.addEventListener("submit", taskFormHandler);

// FOR EDIT AND DELETE TASK
pageContentEl.addEventListener("click", taskButtonHandler);

// FOR CHANGING THE STATUS.
pageContentEl.addEventListener("change", taskStatusChangeHandler);


// FINALLY EVERY SINGLE TIME THE WEBPAGE RENDERS.
loadTasks();