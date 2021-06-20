// Define UI variables
const form = document.querySelector('#task-form');
const tasklist  = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter  = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

// Load all Event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
// DOM load event
 document.addEventListener('DOMContentLoaded',gettasks);
// Add task event
 form.addEventListener('submit',addTask);
// Remove task event 
 tasklist.addEventListener('click',removetask);
// Clear task event
 clearbtn.addEventListener('click',cleartasks);
// Filter tasks event
 filter.addEventListener('keyup',filtertasks);
}

// Get tasks from LS
function gettasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
   tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);

  // Append li to ul
  tasklist.appendChild(li);
  });
}


// Add Task
function addTask(e) {
  if(taskinput.value === '') {
    alert('Add a task');
  }
   
  // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskinput.value));
  // Create new element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);

  // Append li to ul
  tasklist.appendChild(li);
  // console.log(li);

  // Store in local storage
  storeTaskInLocalStorage(taskinput.value);

  // Clear the input
  taskinput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
   tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Remove task
function removetask(e){
   if(e.target.parentElement.classList.contains('delete-item')) {
     if(confirm('Are you sure')) {

      e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
     }
   }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
   tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
     task.splice(index, 1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Clear tasks
function cleartasks() {
  // tasklist.innerHTML = '';  // 1st way to delete all tasks.
  while(tasklist.firstChild) {
      tasklist.removeChild(tasklist.firstChild);
  }  // 2nd method to delete all tasks. This method is faster.

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


// Filter Tasks
function filtertasks(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block';
     } else {
       task.style.display = 'none';
     }
 });
}