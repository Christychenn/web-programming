(function () {
  // No storage - default state every load
  var todos = [
    { name: 'todo 1', description: '' },
    { name: 'todo 2', description: '' }
  ];

  var listEl = document.getElementById('todo-list');
  var newTodoInput = document.getElementById('new-todo');
  var descriptionInput = document.getElementById('description');
  var addBtn = document.getElementById('add-btn');

  function render() {
    listEl.innerHTML = '';
    todos.forEach(function (todo, index) {
      var wrap = document.createElement('div');
      wrap.className = 'todo-item-wrap';
      wrap.dataset.index = index;

      var row = document.createElement('div');
      row.className = 'todo-item';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.checked || false;
      checkbox.addEventListener('click', function (e) {
        e.stopPropagation();
        todo.checked = checkbox.checked;
      });

      var nameSpan = document.createElement('span');
      nameSpan.className = 'todo-name';
      nameSpan.textContent = todo.name;

      var deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'delete';
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        todos.splice(index, 1);
        render();
      });

      row.appendChild(checkbox);
      row.appendChild(nameSpan);
      row.appendChild(deleteBtn);

      var descDiv = document.createElement('div');
      descDiv.className = 'todo-description ' + (todo.expanded ? 'expanded' : 'collapsed');
      descDiv.textContent = todo.description || '';

      wrap.appendChild(row);
      wrap.appendChild(descDiv);

      row.addEventListener('click', function () {
        todo.expanded = !todo.expanded;
        render();
      });

      listEl.appendChild(wrap);
    });
  }

  addBtn.addEventListener('click', function () {
    var name = (newTodoInput.value || '').trim();
    if (!name) return;
    todos.push({
      name: name,
      description: (descriptionInput.value || '').trim(),
      checked: false,
      expanded: false
    });
    newTodoInput.value = '';
    descriptionInput.value = '';
    render();
  });

  newTodoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addBtn.click();
  });

  render();
})();
