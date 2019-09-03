let data;
// localStorage.removeItem('todoList')
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
  // データの保存
  data.task.push(value);
  // DOMの生成
  addTaskToDOM(value);
  // 保存
  dataObjectUpdated();
}

// DOMの生成
function addTaskToDOM(text, isDone) {
  let list;
  if (isDone) {
    list = document.getElementById('done');
  } else {
    list = document.getElementById('not-yet');
  }

  // テキストを格納するli要素を生成
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
  // ボタンの親要素の親要素を取得（一覧を格納しているul要素）
  let task = this.parentNode.parentNode;
  // ul要素のid
  let id = task.parentNode.id;
  //画面から削除
  task.remove();

  // HTML以外のテキストのみ取得できる
  let value = task.textContent;

  //ストレージから削除
  if (id === 'not-yet') {
    // data.task == data['task']
    // array.indexOf(value)で配列からn番目の要素か探すことができる
    data.task.splice(data.task.indexOf(value), 1);
  } else {
    // data.task == data['done']
    // array.indexOf(value)で配列からn番目の要素か探すことができる
    data.done.splice(data.done.indexOf(value), 1);
  }
  // ローカルストレージに保存
  dataObjectUpdated();
}

//完了ボタンを押したとき
function doneTask() {
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  if (id !== 'not-yet') {
    return;
  }

  let value = task.textContent;

  //完了一覧に追加
  let target = document.getElementById('done');
  target.insertBefore(task, target.childNodes[0]);

  //ストレージも更新
  data.task.splice(data.task.indexOf(value), 1);
  data.done.push(value);
  dataObjectUpdated();
}


// ローカルストレージに登録
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
