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
function addTaskToDOM(text, isDone) {
  let list;
  if (isDone) {
    list = document.getElementById('done');
  } else {
    list = document.getElementById('not-yet');
  }

  let task = document.createElement('li');
  task.textContent = text;

  // ボタンを格納するdiv要素を生成
  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //削除ボタンを作成
  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeIcon;

  //削除ボタンをクリックした時の動作を追加
  remove.addEventListener('click', removeTask);

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

//削除ボタンを押したとき
function removeTask() {
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  //画面から削除
  task.remove();

  // HTML以外のテキストのみ取得できる
  let value = task.textContent;

  //ストレージから削除
  //ストレージから削除
  if (id === 'not-yet') {
    data.task.splice(data.task.indexOf(value), 1);
  } else {
    data.done.splice(data.done.indexOf(value), 1);
  }
  dataObjectUpdated();
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

  for (let value of data.done) {
    addTaskToDOM(value, true);
  }
}
