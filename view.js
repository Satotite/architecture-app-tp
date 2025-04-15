// view.js

export class View {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('#todoInput');
    this.addButton = container.querySelector('#addButton');
    this.taskList = container.querySelector('#todoList');
    this.todoCount = container.querySelector('#todoCount');
    this.clearButton = container.querySelector('#deleteButton');
    this.categorySelect = container.querySelector('#categorySelect');
    this.filterSelect = container.querySelector('#filterSelect');
  }

  bindAddTask(handler) {
    this.addButton.addEventListener('click', () => {
      const task = this.input.value.trim();
      const category = this.categorySelect.value;
      if (task !== '') {
        handler(task, category);
        this.input.value = '';
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const task = this.input.value.trim();
        const category = this.categorySelect.value;
        if (task !== '') {
          handler(task, category);
          this.input.value = '';
        }
      }
    });
  }

  bindDeleteTask(handler) {
    this.taskList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.dataset.index);
        handler(index);
      }
    });
  }

  bindClearAll(handler) {
    this.clearButton.addEventListener('click', () => {
      handler();
    });
  }

  bindFilterByCategory(handler) {
    this.filterSelect.addEventListener('change', () => {
      const category = this.filterSelect.value;
      handler(category);
    });
  }

  updateCount(count) {
    this.todoCount.textContent = count;
  }
}
