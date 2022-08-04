const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  //your code here
  if (inputAdd.value == "") {
    alert("To do cannot be empty");
    return;
  }
  addTodo(inputAdd.value, false);
  inputAdd = "";
  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through")
      span.style.textDecoration = "";
    else span.style.textDecoration = "line-through";
    saveTodo();
  };

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  //your code here
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);
  //append todo to HTML...

  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  localStorage.setItem("items", JSON.stringify(data));
  //your code here
}

function loadTodo() {
  const data = JSON.parse(localStorage.getItem("items"));
  for (let i = data.length - 1; i >= 0; i--) {
    addTodo(data[i].title, data[i].completed);
  }
  //your code here
}

loadTodo();
