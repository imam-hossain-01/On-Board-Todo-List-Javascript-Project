/*
* Todo List App - Javascript Project
* Author - MD Imam Hossain
* Contact - https://www.facebook.com/prantoislam.jim.3/
*           https://www.fiverr.com/imamhossain0049
*           https://github.com/mdimamhossain0049
*/


// Initial
let formSubmit = document.getElementById('submit');
let newTask = document.getElementById('new-task');
let inProgressTask = document.getElementById('in-progress-task');
let completeTask = document.getElementById('complete-task');
let taskDelete = document.getElementsByClassName('delete');
let taskInput = document.getElementsByClassName('input');
let taskClass = document.getElementsByClassName('task-title');
let taskItem = document.getElementsByClassName('task-item');
let taskList = document.getElementsByClassName('task-list');
let dragItem = null;


// Intial Storage
let setStorage = function()
{
    let getStorage = JSON.parse(localStorage.getItem('task'));
    if(!getStorage){
        localStorage.setItem('task', JSON.stringify([]));
    }
}


// Generate Task Id
let generateId = function()
{
    let data = JSON.parse(localStorage.getItem('task'));
    let id = data.length + 1;
    return id;
}


// Print Data 
let printData = function()
{
    let taskData = JSON.parse(localStorage.getItem('task'));
    newTask.innerHTML = '';
    inProgressTask.innerHTML = '';
    completeTask.innerHTML = '';

    for(let i of taskData)
    {
        if(i.status == 1)
        {
            newTask.innerHTML += '' +
            '<div class="task-item mb-2" draggable="true" data-id="'+ i.id +'">\n' +
            '<span class="task-title">'+ i.task +'</span>' +
            '<input type="text" class="form-control input" value="'+ i.task +'">\n' +
            '<button class="delete">Delete</button>\n' +
            '</div>\n';
        }
        else if(i.status == 2)
        {
            inProgressTask.innerHTML += '' +
            '<div class="task-item mb-2" draggable="true" data-id="'+ i.id +'">\n' +
            '<span class="task-title">'+ i.task +'</span>' +
            '<input type="text" class="form-control input" value="'+ i.task +'">\n' +
            '<button class="delete">Delete</button>\n' +
            '</div>\n';
        }
        else if(i.status == 3)
        {
            completeTask.innerHTML += '' +
            '<div class="task-item mb-2" draggable="true" data-id="'+ i.id +'">\n' +
            '<span class="task-title">'+ i.task +'</span>' +
            '<input type="text" class="form-control input" value="'+ i.task +'">\n' +
            '<button class="delete">Delete</button>\n' +
            '</div>\n';
        }
    }
    addEvent();
}


// Add Task
let addTask = function(e)
{
    e.preventDefault();

    let taskId = generateId();
    let taskValue = document.getElementById('task').value;
    let taskStatus = 1;
    let getTaskData = JSON.parse(localStorage.getItem('task'));
    let taskData = [];

    if(taskValue != '')
    {
        for(let i of getTaskData)
        {
            let dataObj = {
                id : i.id,
                task : i.task,
                status : i.status
            };
            taskData.push(dataObj);
        }

        taskData.push({id:taskId, task:taskValue, status:taskStatus});
        document.getElementById('task').value = '';
        localStorage.setItem('task', JSON.stringify(taskData));
        printData();
    }
}


// Change Status
let changeStatus = function(itemId, itemStatus)
{
    let getData = JSON.parse(localStorage.getItem('task'));
    let taskData = [];

    for(let i of getData)
    {
        if(i.id == itemId)
        {
            let dataObj = {
                id : i.id,
                task : i.task,
                status : itemStatus
            };
            taskData.push(dataObj);
        }
        else taskData.push(i);
    }

    localStorage.setItem('task', JSON.stringify(taskData));
}


// Edit Item
let editItem = function()
{
    this.parentElement.classList.add('edit-on');
}

let saveItem = function()
{
    let newValue = this.value;
    let itemId = this.parentElement.getAttribute('data-id');
    let getData = JSON.parse(localStorage.getItem('task'));
    let taskData = [];

    for(let i of getData)
    {
        if(i.id == itemId)
        {
            taskData.push({id:i.id, task:newValue, status:i.status});
        }
        else taskData.push(i);
    }
    localStorage.setItem('task', JSON.stringify(taskData));
    printData();
}


// Delete Item
let deleteItem = function()
{
    let itemId = this.parentElement.getAttribute('data-id');
    let getData = JSON.parse(localStorage.getItem('task'));
    let taskData = [];
    let newId = null;
    
    for(let i of getData)
    {
        if(i.id != itemId)
        {
            if(i.id > itemId)
            {
                newId = i.id - 1;
                taskData.push({id: newId, task: i.task, status: i.status});
            }
            else {
                taskData.push(i);
            }
        }
    }
    localStorage.setItem('task', JSON.stringify(taskData));
    printData();
}


// Drag Handle
let dragStartHandle = function()
{
    dragItem = this;
    setTimeout(()=>this.style.display = "block", 0);
}
let dragEndHandle = function(e)
{
    setTimeout(()=>this.style.display = "block", 0);
    dragItem = null;
    let status = parseInt(this.parentElement.getAttribute('data-status'));
    let itemId = this.getAttribute('data-id');
    changeStatus(itemId, status);
    printData();
}
let dragEnterHandle = function(e)
{
    e.target.style.background = 'white';
}
let dragleaveHandle = function(e)
{
    e.target.style.background = '';
}
let dragOverHandle = function(e)
{
    e.preventDefault();
}
let dragDropItem = function(e)
{
    e.preventDefault();
    this.append(dragItem);
    e.target.style.background = '';
}


// Add Event Listener
let addEvent = function()
{
    for(let i of taskClass)
    {
        i.addEventListener('click', editItem);
    }
    for(let i of taskItem)
    {
        i.addEventListener('dragstart', dragStartHandle);
        i.addEventListener('dragend', dragEndHandle);
    }
    for(let i of taskList)
    {
        i.addEventListener('dragenter', dragEnterHandle);
        i.addEventListener('dragleave', dragleaveHandle);
        i.addEventListener('dragover', dragOverHandle);
        i.addEventListener('drop', dragDropItem);
    }
    for(let i of taskDelete)
    {
        i.addEventListener('click', deleteItem)
    }
    for(let i of taskInput)
    {
        i.addEventListener('change', saveItem);
    }
}


// Call Function
setStorage();
printData();
formSubmit.addEventListener('submit', addTask);