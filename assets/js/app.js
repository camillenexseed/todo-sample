let data;

//もしデータが保存されていれば
if (localStorage.getItem('todoList')) {
  data = JSON.parse(localStorage.getItem('todoList')); //データを取り出す
  renderTodoList();
  //もしデータが保存されていなければ
} else {
  // データの保存先を作成
  data = {
    task: [],
    done: []
  };
}

document.getElementById('add').addEventListener('click', function () {
  let value = document.getElementById('task').value;
  addTask(value);
});

function addTask(value) {
  data.task.push(value);
  dataObjectUpdated();
  console.log(localStorage.getItem('todoList'));

  // DOMの生成
  addTaskToDOM(value);
}

// DOMの生成
function addTaskToDOM(text) {
  let list = document.getElementById('not-yet');
  let task = document.createElement('li');
  task.textContent = text;
  //組み立てたDOMをインサート
  list.insertBefore(task, list.childNodes[0]);
}

// localストレージに登録
function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// 一覧出力するための関数
function renderTodoList() {
  for (let value of data.task) {
    addTaskToDOM(value);
  }
}
