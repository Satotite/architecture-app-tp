import { View } from './view.js';
import { TaskManager, SimpleTaskRenderer } from './model.js';

const container = document.querySelector('#to-do-container');
const view = new View(container);
const model = TaskManager.getInstance();
const renderer = new SimpleTaskRenderer();

function updateUI(tasks = model.getTasks()) {
  renderer.render(tasks, view.taskList);
  view.updateCount(tasks.length);
}

view.bindAddTask((task, category) => {
  model.addTask(task, category);
  updateUI();
});

view.bindDeleteTask((index) => {
  model.removeTask(index);
  updateUI();
});

view.bindClearAll(() => {
  model.clearAll();
  updateUI();
});

view.bindFilterByCategory((category) => {
  if (category === 'All') {
    updateUI();
  } else {
    const filtered = model.getByCategory(category);
    updateUI(filtered);
  }
});

updateUI();
