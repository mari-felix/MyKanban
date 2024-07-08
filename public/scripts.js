
//Create/Update modal data
const $modal = document.getElementById("modalTask");
const $modalAss = document.getElementById("modalAss");
//Modal titles
const $creationModeTitle = document.getElementById("creationModeTitle");
const $editionModeTitle = document.getElementById("editionModeTitle");
const $creationModeTitleAss = document.getElementById("creationModeTitleAss");
const $editionModeTitleAss = document.getElementById("editionModeTitleAss");

//Modal action buttons
const $creationModeBtn = document.getElementById("creationModeBtn");
const $editionModeBtn = document.getElementById("editionModeBtn");
const $creationModeAssBtn = document.getElementById("creationModeAssBtn");
const $editionModeAssBtn = document.getElementById("editionModeAssBtn");

//Screen data
const $createTask = document.getElementById("CreateTask");
const $createAssignee = document.getElementById("CreateAssignee");
const $assigneeBtn = document.getElementById("Assignees");
const $tasksBtn = document.getElementById("Board");
const $container = document.querySelector(".container");
const $table = document.querySelector(".table");

// task data
const $idInput = document.getElementById("idInput");
const $titleInput = document.getElementById("Title");
const $descriptionInput = document.getElementById("Description");
const $assigneeInput = document.getElementById("Assignee");
const $priorityInput = document.getElementById("Priority");
const $expectedDueInput = document.getElementById("ExpectedDue");
const $assigneeSelection = document.querySelector(".form-group #Assignee");
const $columnInput = document.getElementById("column");

// Assignee data
const $nameInput = document.getElementById("Name");
const $emailInput = document.getElementById("Email");
const $jobInput = document.getElementById("Job");


//assignee grid data
const $tableBody = document.getElementById("PeopleGrid");

let taskList = [];
let assigneesList = [];

$table.style.display = "none";
$container.style.display = "flex";

// Abrir modal para preencher informações
// Se for o modal das tasks
function openModalTask() {
  
  console.log($table);
  console.log($container);

  getAssignees();

  $modal.style.display = "flex";
  $editionModeTitle.style.display = "none";
  $editionModeBtn.style.display = "none";

  $creationModeTitle.style.display = "block";
  $creationModeBtn.style.display = "block";

  console.log("Creation mode");

}

// Se for para editar as tasks
function openModalEditTask(id) {
  getAssignees();

  console.log("Edition mode");

  $modal.style.display = "flex";
  $editionModeTitle.style.display = "block";
  $editionModeBtn.style.display = "block";

  $creationModeTitle.style.display = "none";
  $creationModeBtn.style.display = "none";

  const index = taskList.findIndex(function (task) {
    return task.Id == id;
  });

  if (index !== -1) {
    const task = taskList[index];

    $idInput.value = task.Id;
    $titleInput.value = task.Title;
    $descriptionInput.value = task.Description;
    $assigneeInput.value = task.Assignee;
    $priorityInput.value = task.Priority;
    $expectedDueInput.value = task.ExpectedDue;
    $columnInput.value = task.ColumnId;
  } else {
    console.error(`Task with id ${id} not found in taskList.`);
  }
}

// Se for o modal dos assignees
function openModalAssignee() {
  console.log("ID passed to openModal:", id);

  $modalAss.style.display = "flex";

  $editionModeTitleAss.style.display = "none";
  $editionModeAssBtn.style.display = "none";

  $creationModeTitleAss.style.display = "flex";
  $creationModeAssBtn.style.display = "flex";

  console.log("Creation mode");
  console.log($editionModeTitleAss);
  console.log($creationModeTitleAss);
}

// Para editar assignees
function openModalEditAssignee(id) {
  console.log("Edition mode");

  $editionModeTitleAss.style.display = "block";
  $editionModeAssBtn.style.display = "block";

  $creationModeTitleAss.style.display = "none";
  $creationModeAssBtn.style.display = "none";

  console.log($editionModeTitleAss);
  console.log($creationModeTitleAss);

  const index = assigneesList.findIndex(function (assignee) {
    return assignee.Id == id;
  });

  if (index !== -1) {
    const assignee = assigneesList[index];

    $idInput.value = assignee.Id;
    $nameInput.value = assignee.Name;
    $emailInput.value = assignee.Email;
    $jobInput.value = assignee.Job;
  } else {
    console.error(`Task with id ${id} not found in taskList.`);
  }
}

// Fechar o modal de coleta de informações
function closeModal() {
  if ($table.style.display === "none" && $container.style.display === "flex") {
    $modal.style.display = "none";

    $titleInput.value = "";
    $descriptionInput.value = "";
    $assigneeInput.value = "";
    $priorityInput.value = "";
    $expectedDueInput.value = "";
    $columnInput.value = "";
  } else if (
    $table.style.display === "flex" &&
    $container.style.display === "none"
  ) {
    $modalAss.style.display = "none";

    $nameInput.value = "";
    $emailInput.value = "";
    $jobInput.value = "";
  }
}

//Limpa os campos das colunas
function resetColumns() {
  document.querySelector(`[data-column="0"] .body`).innerHTML = "";
  document.querySelector(`[data-column="1"] .body`).innerHTML = "";
  document.querySelector(`[data-column="2"] .body`).innerHTML = "";
}

// Geração de cards de task
function generateCards() {
  resetColumns();

  taskList.forEach((task) => {
    var formattedDate = moment(task.ExpectedDue).format("DD MMMM, YYYY");

    const columnBody = document.querySelector(
      `[data-column="${task.ColumnId}"] .body`
    );

    console.log(columnBody);

    const card = `
        <div class="card" 
        id="${task.Id}" 
        onclick="openModalEditTask(${task.Id})" 
        draggable="true"
        ondragstart="dragstartHandler(event)">
            <div class="info">
                <b>[${task.Id}] <br> ${task.Title}</b>
                <br>
                <span>${task.Description}</span>
            </div>
            <div class="info">
                <b>Prioridade:</b>
                <span>${task.Priority}</span>
            </div>
            <div class="info">
                <b>Assignee:</b>
                <span>${task.Assignee}</span>
            </div>
            <div class="info">
                <b>Deadline:</b>
                <span>${task.ExpectedDue}</span>
            </div>
        </div>
        `;

    columnBody.innerHTML += card;
  });
}

// Criar task
function createTask() {
  const newTask = {
    Id: Math.floor(Math.random() * 999999),
    Title: $titleInput.value,
    Description: $descriptionInput.value,
    AssigneeId: $assigneeInput.value,
    Priority: $priorityInput.value,
    ExpectedDue: $expectedDueInput.value,
    ColumnId: $columnInput.value,
  };

  taskList.push(newTask);

  console.log(taskList);

  closeModal();

  generateCards();
}

// Atualizar task
function updateTask() {
  console.log("editar tarefa");
  const task = {
    Id: $idInput.value,
    Title: $titleInput.value,
    Description: $descriptionInput.value,
    Assignee: $assigneeInput.value,
    Priority: $priorityInput.value,
    ExpectedDue: $expectedDueInput.value,
    ColumnId: $columnInput.value,
  };

  const index = taskList.findIndex(function (task) {
    return task.Id == $idInput.value;
  });

  taskList[index] = task;

  console.log(taskList[index]);

  closeModal();

  generateCards();
  console.log("task salva");
}

function changeColumn(taskId, columnId) {
  if (taskId && columnId) {
    
    taskList = taskList.map((task) => {
      if (taskId != task.Id) return task;

      return {
        ... task,
        ColumnId: columnId,
      };
    });

  }
}

// Criar funcionário
function createAssignee() {
  const newAssignee = {
    Id: Math.floor(Math.random() * 999999),
    Name: $nameInput.value,
    Email: $emailInput.value,
    Job: $jobInput.value,
  };

  assigneesList.push(newAssignee);

  console.log(assigneesList);

  closeModal();

  generateGrid();
}

// Atualizar funcionário
function updateAssignee() {
  const assignee = {
    Id: $idInput.value,
    Name: $nameInput.value,
    Email: $emailInput.value,
    Job: $jobInput.value,
  };

  console.log(assignee);

  const index = assigneesList.findIndex(function (assignee) {
    return assignee.Id == $idInput.value;
  });

  console.log("funcionario achado");

  assigneesList[index] = assignee;

  console.log(assigneesList[index]);

  console.log(assigneesList);

  closeModal();

  generateGrid();
  console.log("funcionario salvo");
}

// Retornar funcionários para seleção
function getAssignees() {
  assigneesList.forEach((assignee) => {
    const assigneesListHtml = assigneesList.map(function (assignee) {
      return `
            <div class="option">
                <option>${assignee.Name} - ${assignee.Job}</option>
            </div>
            `;
    });
    $assigneeSelection.innerHTML = assigneesListHtml.join("");
  });
}

// Retorna linha para funcionários
function generateGrid() {
  const assigneesListHtml = assigneesList.map(function (assignee) {
    return `
        <div class="info">
            <tr onclick="openModalEditAssignee(${assignee.Id})">
                <th>${assignee.Id}</th>
                <th>${assignee.Name}</th>
                <th>${assignee.Email}</th>
                <th>${assignee.Job}</th>
            </tr>
        </div>
        `;
  });

  $tableBody.innerHTML = assigneesListHtml.join("");
}

function dragstartHandler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("my-data", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const task_id = ev.dataTransfer.getData("my-data");
  const column_id = ev.target.dataset.column;

  changeColumn(task_id, column_id);
}

function closeBoard() {
  $container.style.display = "none";
  $createTask.style.display = "none";
  $assigneeBtn.style.display = "none";
}

function openAssignees() {
  closeBoard();
  $tasksBtn.style.display = "flex";
  $createAssignee.style.display = "flex";
  $table.style.display = "flex";
}

function closeAssignees() {
  $tasksBtn.style.display = "none";
  $createAssignee.style.display = "none";
  $table.style.display = "none";
}

function openBoard() {
  closeAssignees();
  $container.style.display = "flex";
  $createTask.style.display = "flex";
  $assigneeBtn.style.display = "flex";
}
