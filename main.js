function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    var taskList = document.getElementById('taskList');
    var taskId = 'task_' + Date.now();
    var taskItem = document.createElement('li');
    taskItem.classList.add('taskItem','list-group-item');
    taskItem.innerHTML = '<input type="checkbox" class="form-check-input check-task" onchange="saveState(\'' + taskId + '\')" id="' + taskId + '">' + taskText + ' <button class="btn btn-outline-danger btn-clear-item" onclick="removeTask(\'' + taskId + '\')">&#10008;</button>';
    taskList.appendChild(taskItem);

    taskInput.value = '';
    saveState();
}

function removeTask(taskId) {
    var taskItem = document.getElementById(taskId);
    if (taskItem && taskItem.parentNode && taskItem.parentNode.parentNode) {
      taskItem.parentNode.parentNode.removeChild(taskItem.parentNode);
      saveState();
    } 
}

function clearList() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    saveState();
}

function saveState() {
  var taskList = document.getElementById('taskList');
  var tasks = [];

  for (var i = 0; i < taskList.children.length; i++) {
      var taskItem = taskList.children[i];
      var taskId = taskItem.querySelector('input').id;
      var taskText = taskItem.querySelector('input').nextSibling.nodeValue.trim();
      var taskChecked = taskItem.querySelector('input').checked;

      tasks.push({
          id: taskId,
          text: taskText,
          checked: taskChecked
      });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadState() {
    var taskList = document.getElementById('taskList');
    var savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      savedTasks = JSON.parse(savedTasks);

      savedTasks.forEach(function (task) {
        var taskItem = document.createElement('li');
        taskItem.classList.add('taskItem','list-group-item');
        taskItem.innerHTML = '<input type="checkbox" class="form-check-input check-task" id="' + task.id + '" onchange="saveState()" ' + (task.checked ? 'checked' : '') + '>' + task.text + ' <button class="btn btn-outline-danger btn-clear-item" onclick="removeTask(\'' + task.id + '\')">&#10008;</button>';
        taskList.appendChild(taskItem);
      });
    }
}

loadState();
