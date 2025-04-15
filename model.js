// Abstraction pour le rendu
export class TaskRenderer {
  render(tasks, container) {
    throw new Error("La méthode render() doit être implémentée.");
  }
}

// Rendu concret
export class SimpleTaskRenderer extends TaskRenderer {
  // render(tasks, container) {
  //   container.innerHTML = '';
  //   tasks.forEach((task, index) => {
  //     const li = document.createElement('li');
  //     li.textContent = `[${task.category}] ${task.text}`;
  //     li.style.color = task.color;

  //     const deleteBtn = document.createElement('button');
  //     deleteBtn.textContent = 'X';
  //     deleteBtn.classList.add('delete-btn');
  //     deleteBtn.dataset.index = index;

  //     li.appendChild(deleteBtn);
  //     container.appendChild(li);
  //   });
  // }
  render(tasks, container) {
    container.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task-item', `cat-${task.category.toLowerCase()}`);
  
      const categorySpan = document.createElement('span');
      categorySpan.textContent = `[${task.category}]`;
      categorySpan.classList.add('task-category');
  
      const textSpan = document.createElement('span');
      textSpan.textContent = ` ${task.text}`;
      textSpan.classList.add('task-text');
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.dataset.index = index;
  
      li.appendChild(categorySpan);
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);
  
      container.appendChild(li);
    });
  }
  
}

// Singleton Task Manager
export class TaskManager {
  constructor() {
    if (TaskManager.instance) return TaskManager.instance;
    this.tasks = [];
    TaskManager.instance = this;
  }

  static getInstance() {
    return new TaskManager();
  }

  addTask(text, category) {
    const task = {
      id: Date.now(),
      text,
      complete: false,
      category,
      color: this.getCategoryColor(category),
    };
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  clearAll() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  getByCategory(category) {
    return this.tasks.filter(t => t.category === category);
  }

  getCategoryColor(category) {
    const colors = {
      Work: 'blue',
      Home: 'green',
      Study: 'purple',
      Other: 'gray'
    };
    return colors[category] || 'black';
  }
}
