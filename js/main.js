/* 변수 */
const taskInput = document.getElementById('new-task'); // 새로운 일 input
const addButton = document.getElementsByTagName('button')[0]; // 첫번째 버튼
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); // 일 진행중
const completedTasksHolder = document.getElementById('completed-tasks'); // 일 완료

/* 함수 */
// 새로운 일 생성
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement('li'); // li item 생성
  const checkBox = document.createElement('input'); // Input (checkbox)
  const label = document.createElement('label'); // Label
  const editInput = document.createElement('input'); // Input(text)
  const editButton = document.createElement('button'); // Button.edit
  const deleteButton = document.createElement('button'); // Button.delete

  checkBox.type = 'checkbox'; //element요소의 프로퍼티
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  label.innerText = taskString;

  listItem.appendChild(checkBox); //element요소 추가
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//일 추가 생성
const addTask = function () {
  const listItemName = taskInput.value || 'New Item';
  const listItem = createNewTaskElement(listItemName);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

//일 편집
const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const button = listItem.getElementsByTagName('button')[0];

  const containsClass = listItem.classList.contains('editMode');
  if (containsClass) {
    label.innerText = editInput.value;
    button.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    button.innerText = 'Save';
  }
  listItem.classList.toggle('editMode');
};

//일 삭제
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//일 완료된 상태
const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//일 완료
const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log('AJAX request');
};

/* 이벤트 */
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');
  const checkBox = taskListItem.querySelector('input[type=checkbox]');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

//함수 스코프
// const bb = () => {
//   return name
// }
// const name = "hi"
// console.log(bb())
