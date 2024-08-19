// Url de onde rodam as APIs
const urlVisualStudio = "https://localhost:7171/api/";
const urlDotnetWatch = "http://localhost:5173/api/";

//Create/Update modal data
const $modal = document.getElementById("modalTask");
const $modalAss = document.getElementById("modalAss");

//Modal titles
const $creationModeTitle = document.getElementById("creationModeTitle");
const $editionModeTitle = document.getElementById("editionModeTitle");
const $creationModeTitleAss = document.getElementById("creationModeTitleAss");
const $editionModeTitleAss = document.getElementById("editionModeTitleAss");
const $exhibitModeTitle = document.getElementById("exhibitModeTitle");

//Modal action buttons
const $creationModeBtn = document.getElementById("creationModeBtn");
const $editionModeBtn = document.getElementById("editionModeBtn");
const $creationModeAssBtn = document.getElementById("creationModeAssBtn");
const $editionModeAssBtn = document.getElementById("editionModeAssBtn");
const $editTaskBtn = document.getElementById("editTaskBtn");
const $deleteTaskBtn = document.getElementById("deleteTaskBtn");

//Screen data
const $createTask = document.getElementById("CreateTask");
const $createAssignee = document.getElementById("CreateAssignee");
const $assigneeBtn = document.getElementById("Assignees");
const $tasksBtn = document.getElementById("Board");
const $container = document.querySelector(".container");
const $table = document.querySelector(".table");
const $form = document.querySelector(".form");
const $exhibit = document.querySelector(".exhibit");


// Edit and create task data
const $idInput = document.getElementById("idInput");
const $titleInput = document.getElementById("Title");
const $descriptionInput = document.getElementById("Description");
const $assigneeInput = document.getElementById("Assignee");
const $priorityInput = document.getElementById("Priority");
const $expectedDueInput = document.getElementById("ExpectedDue");
const $assigneeSelection = document.querySelector(".form-group #Assignee");
const $columnInput = document.getElementById("column");

//Exhibition data
const $exhibitTitle = document.getElementById("exhibitTitle");
const $exhibitDescription = document.getElementById("exhibitDescription");
const $exhibitAssignee = document.getElementById("exhibitAssignee");
const $exhibitColumn = document.getElementById("exhibitColumn");
const $exhibitPriority = document.getElementById("exhibitPriority");
const $exhibitExpectedDue = document.getElementById("exhibitExpectedDue");

// Assignee data
const $nameInput = document.getElementById("Name");
const $emailInput = document.getElementById("Email");
const $jobInput = document.getElementById("Job");

//assignee grid data
const $tableBody = document.getElementById("PeopleGrid");

$table.style.display = "none";
$container.style.display = "flex";

function openExhibitTask(id) {
    
      
    const getValues = async () => {
        const res = await fetch(`${urlVisualStudio}Task/GetById/${id}`);
        const task = await res.json();
    
        let formattedDue = task.expectedDue.split("T")[0];
    
        console.log(task);
    
        if (!res.ok) {
          throw new Error(`Error fetching task with id ${res.statusText}`);
        }

        $idInput.value = task.id;
        $exhibitTitle.innerHTML = `${task.title}`;
        $exhibitDescription.innerHTML = `${task.description}`;
        $exhibitAssignee.innerHTML = `${task.assigneeId}`;
        $exhibitPriority.innerHTML = `${task.priority}`;
        $exhibitExpectedDue.innerHTML = `${formattedDue}`;
        $exhibitColumn.innerHTML = `${task.status}`;

        $exhibitModeTitle.innerHTML = `Task ${task.id}`
        
        console.log($exhibitTitle);
        console.log($exhibitColumn);
    };
    
    getValues();
 
    $editionModeTitle.style.display = "none";
    $editionModeBtn.style.display = "none";
    
    $creationModeTitle.style.display = "none";
    $creationModeBtn.style.display = "none";
    
    $exhibitModeTitle.style.display = "block";
    $editTaskBtn.style.display = "block";
    $deleteTaskBtn.style.display = "block";
    
    $exhibit.style.display = "flex";
    $form.style.display = "none";
    $modal.style.display = "flex";

}

// Abrir modal de criação das tasks
function openModalTask() {
  console.log($table);
  console.log($container);

  getAssigneesSelection();

  $modal.style.display = "flex";
  $form.style.display = "flex";
  $exhibit.style.display = "none";
  $exhibitTitle.style.display = "none";

  $editionModeTitle.style.display = "none";
  $editionModeBtn.style.display = "none";

  $creationModeTitle.style.display = "block";
  $creationModeBtn.style.display = "block";

  console.log("Creation mode");
}

// Abrir modal de edição das tasks
function openModalEditTask(id) {

    const getValues = async () => {
    const res = await fetch(`${urlVisualStudio}Task/GetById/${id}`);
    const task = await res.json();

    let formattedDue = task.expectedDue.split("T")[0];

    console.log(task);

    if (!res.ok) {
      throw new Error(`Error fetching task with id ${res.statusText}`);
    }

    $idInput.value = task.id;
    $titleInput.value = task.title;
    $descriptionInput.value = task.description;
    $assigneeInput.value = task.assigneeId;
    $priorityInput.value = task.priority;
    $expectedDueInput.value = formattedDue;
    $columnInput.value = task.status;
  };

  getValues();
  getAssigneesSelection();

  $editionModeTitle.style.display = "block";
  $editionModeBtn.style.display = "block";

  $creationModeTitle.style.display = "none";
  $creationModeBtn.style.display = "none";

  $exhibitModeTitle.style.display = "none";
  $editTaskBtn.style.display = "none";
  $deleteTaskBtn.style.display = "none";

  $modal.style.display = "flex";
  $form.style.display = "flex";
  $exhibit.style.display = "none";

  console.log($table);
  console.log($container);

  console.log("Edition mode");
}

// Abrir modal de criação dos funcionarios
function openModalAssignees() {
  console.log($table);
  console.log($container);

  $modalAss.style.display = "flex";

  $editionModeAssBtn.style.display = "none";
  $editionModeTitleAss.style.display = "none";

  $creationModeTitleAss.style.display = "block";
  $creationModeAssBtn.style.display = "block";

  console.log($editionModeTitleAss);
  console.log($creationModeTitleAss);
  console.log("Creation mode");
}

// FUNCIONANDO
// Abrir modal de edição dos funcionarios
function openModalEditAssignee(id) {
  console.log("Edition mode");

  $editionModeTitleAss.style.display = "block";
  $editionModeAssBtn.style.display = "block";

  $creationModeTitleAss.style.display = "none";
  $creationModeAssBtn.style.display = "none";

  $modalAss.style.display = "flex";

  console.log($editionModeTitleAss);
  console.log($creationModeTitleAss);

  const getValues = async () => {
    const res = await fetch(`${urlVisualStudio}Assignee/GetById/${id}`);
    const assignee = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching asssignee with id ${res.statusText}`);
    }

    $idInput.value = assignee.id;
    $nameInput.value = assignee.name;
    $emailInput.value = assignee.email;
    $jobInput.value = assignee.job;
  };

  getValues();
}

// Fechar o modal de coleta de informações
function closeModal() {
  if ($table.style.display === "none" && $container.style.display === "flex") {
      
    if ($exhibitTitle.style.display === "block") {
        
        $exhibitTitle.innerHTML = "";
        $exhibitDescription.innerHTML = "";
        $exhibitAssignee.innerHTML = "";
        $exhibitPriority.innerHTML = "";
        $exhibitExpectedDue.innerHTML = "";
        $exhibitColumn.innerHTML = "";

        $exhibitModeTitle.innerHTML = "";
    }

    $modal.style.display = "none";
    
    $titleInput.value = "";
    $descriptionInput.value = "";
    $assigneeInput.value = "";
    $priorityInput.value = "";
    $expectedDueInput.value = "";
    
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

// FUNCIONANDO!!
// Limpa os campos das colunas
function resetColumns() {
  document.querySelector(`[data-column="ToDo"] .body`).innerHTML = "";
  document.querySelector(`[data-column="InProgress"] .body`).innerHTML = "";
  document.querySelector(`[data-column="Done"] .body`).innerHTML = "";
}

// FUNCIONANDO!!
// Geração de cards de task
async function generateCards() {
  resetColumns();

  const res = await fetch(`${urlVisualStudio}Task`);
  const tasks = await res.json();

  console.log(tasks);

  if (!res.ok) {
    throw new Error(`Erro ao recuperar funcionarios: ${res.statusText}`);
  }

  tasks.forEach((task) => {
    let formattedDue = task.expectedDue.split("T")[0];
    formattedDue = formattedDue.split("-");
    formattedDue =
      formattedDue[2] + "/" + formattedDue[1] + "/" + formattedDue[0];
    const $columnBody = document.querySelector(
      `[data-column="${task.status}"] .body`
    );

    console.log($columnBody);

    const card = `
            <div class="card" id="${task.id}" onclick="openExhibitTask(${task.id})" draggable="true" ondragstart="dragstartHandler(event)">
                <div class="info">
                    <b>[${task.id}] <br> ${task.title}</b>
                    <br>
                    <span>${task.description}</span>
                </div>
                <div class="info">
                    <b>Prioridade:</b>
                    <span>${task.priority}</span>
                </div>
                <div class="info">
                    <b>Assignee:</b>
                    <span>${task.assigneeId}</span>
                </div>
                <div class="info">
                    <b>Deadline:</b>
                    <span>${formattedDue}</span>
                </div>
            </div>
            `;
    if ($columnBody) {
      $columnBody.insertAdjacentHTML("beforeend", card);
    } else {
      throw new Error(`Erro ao recuperar estrutura html: ${console.error()}`);
    }
  });
}

// FUNCIONANDO!!
// Criar task
async function createTask() {
  const newTask = {
    Id: Math.floor(Math.random() * 999999),
    AssigneeId: $assigneeInput.value,
    Title: $titleInput.value,
    Status: $columnInput.value,
    Priority: $priorityInput.value,
    Description: $descriptionInput.value,
    ExpectedDue: $expectedDueInput.value,
  };

  console.log(JSON.stringify(newTask));

  const response = await fetch(`${urlVisualStudio}Task/CreateTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error(`Erro ao adicionar task: ${response.statusText}`);
  }

  closeModal();

  generateCards();
}

// FUNCIONANDO!!
// Atualizar task
async function updateTask() {
  console.log("editar tarefa");
  const task = {
    id: $idInput.value,
    title: $titleInput.value,
    description: $descriptionInput.value,
    status: $columnInput.value,
    assigneeId: $assigneeInput.value,
    priority: $priorityInput.value,
    expectedDue: $expectedDueInput.value,
  };

  console.log("tarefa achada");

  const response = await fetch(`${urlVisualStudio}Task/EditTask/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Erro ao adicionar funcionario: ${response.statusText}`);
  }

  console.log("tarefa achada");

  closeModal();

  generateCards();
  console.log("task salva");
}

// Deletar task
async function deleteTask() {
  console.log("editar tarefa");

  const task = {
    id: $idInput.value,
    title: $titleInput.value,
    description: $descriptionInput.value,
    status: $columnInput.value,
    assigneeId: $assigneeInput.value,
    priority: $priorityInput.value,
    expectedDue: $expectedDueInput.value,
  };

  console.log("tarefa achada");

  const response = await fetch(`${urlVisualStudio}Task/DeleteTask/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar funcionario: ${response.statusText}`);
  }

  console.log("tarefa achada");

  closeModal();

  generateCards();
  console.log("task salva");
}

// Mudança drag and drop de colunas entre as tasks
async function changeColumn(taskId, statusColumn) {
  if (taskId && statusColumn) {
    const res = await fetch(`${urlVisualStudio}Task`);
    let taskList = await res.json();
    let taskTarget;

    taskList = taskList.map(function (task) {
      if (taskId != task.id) return task;

      return {
        ...task,
        status: statusColumn,
      };
    });

    taskList.forEach((task) => {
      if (task.id == taskId) {
        taskTarget = task;
      }
    });

    const response = await fetch(`${urlVisualStudio}Task/EditTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskTarget),
    });

    generateCards();
  }
}

// FUNCIONANDO!!
// Criar funcionário
async function createAssignee() {
  const newAssignee = {
    Id: Math.floor(Math.random() * 999999),
    Name: $nameInput.value,
    Job: $jobInput.value,
    Email: $emailInput.value,
  };

  const response = await fetch(`${urlVisualStudio}Assignee/CreateAssignee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAssignee),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error(`Erro ao adicionar funcionario: ${response.statusText}`);
  }

  closeModal();

  generateGrid();
}

// FUNCIONANDO!!
// Atualizar funcionário
async function updateAssignee() {
  const assignee = {
    Id: $idInput.value,
    Name: $nameInput.value,
    Email: $emailInput.value,
    Job: $jobInput.value,
  };

  console.log(assignee);

  const res = await fetch(
    `${urlVisualStudio}Assignee/EditAssignee/${assignee.Id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignee),
    }
  );

  if (!res.ok) {
    throw new Error(`Erro ao adicionar funcionario: ${response.statusText}`);
  }

  console.log(res.body);

  closeModal();

  generateGrid();
  console.log("funcionario salvo");
}

// FUNCIONANDO!!
// Retornar funcionários para seleção
async function getAssigneesSelection() {
  const res = await fetch(`${urlVisualStudio}Assignee`);
  const assignees = await res.json();

  if (!res.ok) {
    throw new Error(`Erro ao recuperar funcionarios: ${res.statusText}`);
  }

  assignees.forEach((ass) => {
    console.log(ass);
    const assigneesListHtml = assignees.map(function (ass) {
      return `
            <div class="option">
                <option value="${ass.id}">${ass.name} - ${ass.job}</option>
            </div>
            `;
    });
    $assigneeSelection.innerHTML = assigneesListHtml.join("");
  });
}

// FUNCIONANDO!!
// Retorna linha para funcionários
async function generateGrid() {
  const res = await fetch(`${urlVisualStudio}Assignee`);
  const assignees = await res.json();

  console.log(res);

  if (!res.ok) {
    throw new Error(`Erro ao recuperar funcionarios: ${res.statusText}`);
  }

  assignees.forEach((ass) => {
    const assigneesListHtml = assignees.map(function (ass) {
      return `
            <div class="info">
                <tr onclick="openModalEditAssignee(${ass.id})">
                    <th>${ass.id}</th>
                    <th>${ass.name}</th>
                    <th>${ass.email}</th>
                    <th>${ass.job}</th>
                </tr>
            </div>
            `;
    });

    $tableBody.innerHTML = assigneesListHtml.join("");
  });
}

// Funções relacionadas à mudança de telas
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
  generateGrid();
}

function closeAssignees() {
  $tasksBtn.style.display = "none";
  $createAssignee.style.display = "none";
  $table.style.display = "none";
}

function openBoard() {
  generateCards();
  closeAssignees();
  $container.style.display = "flex";
  $createTask.style.display = "flex";
  $assigneeBtn.style.display = "flex";
}

// Funções Drag and Drop
function dragstartHandler(ev) {
  ev.dataTransfer.setData("application/json", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
  ev.preventDefault();

  console.log(ev.target);
  const taskId = ev.dataTransfer.getData("application/json");

  try {
    const columnStatus = ev.target.dataset.column;
    if (columnStatus == null || columnStatus == undefined) {
      throw new Error("Erro ao mudar de coluna:" + console.error());
    }

    changeColumn(taskId, columnStatus);
  } catch (err) {
    console.log(err.message);
  }
}
