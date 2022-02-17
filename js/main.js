/* 변수 */
const taskInput = document.getElementById('new-task'); // 새로운 일 input
const addButton = document.getElementsByTagName('button')[0]; // 첫번째 버튼
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); // 일 진행중
const completedTasksHolder = document.getElementById('completed-tasks'); // 일 완료

/* 함수 */
// 새로운 일과 이벤트 추가요소 생성
const newTaskGroup = {
  createElements: function (taskString) {
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
  },
  createEvents: function (taskListItem, checkBoxEventHandler) {
    const editButton = taskListItem.querySelector('button.edit');
    const deleteButton = taskListItem.querySelector('button.delete');
    const checkBox = taskListItem.querySelector('input[type=checkbox]');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  },
};

// 추가했을 시
const addTask = () => {
  const listItemName = taskInput.value || 'New Item';
  const listItem = newTaskGroup.createElements(listItemName);
  incompleteTaskHolder.appendChild(listItem);
  newTaskGroup.createEvents(listItem, completeGroup.taskCompleted);
  taskInput.value = '';
};

// 편집할 시
const editTask = (e) => {
  const listItem = e.target.parentNode;
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

// 완료 여부 체크시
const completeGroup = {
  taskCompleted: function (e) {
    const listItem = e.target.parentNode;
    completedTasksHolder.appendChild(listItem);
    newTaskGroup.createEvents(listItem, completeGroup.taskIncomplete);
  },
  taskIncomplete: function (e) {
    const listItem = e.target.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    newTaskGroup.createEvents(listItem, completeGroup.taskCompleted);
  },
};

// 삭제
const deleteTask = (e) => {
  const listItem = e.target.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

/* 이벤트  */
addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  newTaskGroup.createEvents(
    incompleteTaskHolder.children[i],
    completeGroup.taskCompleted
  );
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  newTaskGroup.createEvents(
    completedTasksHolder.children[i],
    completeGroup.taskIncomplete
  );
}
