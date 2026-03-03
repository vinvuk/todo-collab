(() => {
  const STORAGE_KEY = 'todo-collab-items';
  const input = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('todoList');

  function loadTodos() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function renderTodos() {
    const todos = loadTodos();
    list.innerHTML = '';
    todos.forEach((todo, i) => {
      const li = document.createElement('li');
      if (todo.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '\u00d7';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTodo(i);
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      li.addEventListener('click', () => toggleTodo(i));
      list.appendChild(li);
    });
  }

  function addTodo() {
    const text = input.value.trim();
    if (!text) return;
    const todos = loadTodos();
    todos.push({ text, completed: false });
    saveTodos(todos);
    input.value = '';
    renderTodos();
  }

  function toggleTodo(index) {
    const todos = loadTodos();
    if (todos[index]) {
      todos[index].completed = !todos[index].completed;
      saveTodos(todos);
      renderTodos();
    }
  }

  function removeTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
  }

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  renderTodos();
})();
