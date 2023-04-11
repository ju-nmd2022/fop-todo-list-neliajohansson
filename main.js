// The following 96 lines of code were adapted from https://www.youtube.com/watch?v=6eFwtaZf6zc Accessed: 2023-04-05
window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTaskForm = document.querySelector("#new-task-form");

  // Save new task in localStorage
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.reset();

    DisplayTasks();
  });

  DisplayTasks();
});

// Display task in to-do list
function DisplayTasks() {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const deleteButton = document.createElement("button");

    // Display task category
    input.type = "checkbox";
    input.checked = task.done;
    span.classList.add("bubble");
    if (task.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("school");
    }

    // Display task buttons
    content.classList.add("task-content");
    actions.classList.add("actions");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
    deleteButton.innerHTML = "x";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(deleteButton);
    taskItem.appendChild(label);
    taskItem.appendChild(content);
    taskItem.appendChild(actions);

    taskList.appendChild(taskItem);

    // Save task as done in localStorage
    if (task.done) {
      taskItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      task.done = e.target.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));

      if (task.done) {
        taskItem.classList.add("done");
      } else {
        taskItem.classList.remove("done");
      }

      DisplayTasks();
    });

    // Delete task
    deleteButton.addEventListener("click", (e) => {
      tasks = tasks.filter((t) => t != task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      DisplayTasks();
    });
  });
}
