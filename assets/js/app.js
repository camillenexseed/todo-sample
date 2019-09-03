let data;
//チェックマークとゴミ箱マークのアイコン
let removeIcon = '<i class="far fa-trash-alt fa-lg"></i>';
let doneIcon = '<i class="far fa-check-circle fa-lg"></i>';

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

  // DOMの生成
  addTaskToDOM(value);
}

// DOMの生成
function addTaskToDOM(text) {
  let list = document.getElementById('not-yet');
  let task = document.createElement('li');
  task.textContent = text;

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //削除ボタンを作成
  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeIcon;

  //完了ボタンを作成
  let done = document.createElement('button');
  done.classList.add('done');
  done.innerHTML = doneIcon;

  //DOMの組み立て
  buttons.appendChild(remove);
  buttons.appendChild(done);
  task.appendChild(buttons);

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
