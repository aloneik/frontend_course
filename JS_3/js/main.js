"use strict"

const LIST_ID = "list";
const INPUT_ID = "listItemInput";

const LIST_ITEM_TAG = "LI";
const DELETE_BUTTON_TAG = "SPAN";
const COMPLETE_BUTTON_TAG = "SPAN";

const COMPLETE_BUTTON_CLASS = "completeBtn";
const DELETE_BUTTON_CLASS = "deleteBtn";

const STORAGE_KEY = "todoItems";

function createCloseButton() {
  let closeButton = document.createElement(DELETE_BUTTON_TAG);
  closeButton.className = DELETE_BUTTON_CLASS;
  closeButton.onclick = removeItem;
  closeButton.appendChild(document.createTextNode("Delete"));
  return closeButton;
}

function createCompleteButton() {
  let completeButton = document.createElement(COMPLETE_BUTTON_TAG);
  completeButton.className = COMPLETE_BUTTON_CLASS;
  completeButton.onclick = resolveItem;
  completeButton.appendChild(document.createTextNode("Complete"));
  return completeButton;
}

function removeItem() {
  document.getElementById(LIST_ID).removeChild(this.parentElement);
  updateStoredItems();
}

function resolveItem() {
  this.parentElement.classList.toggle("checked");
  updateStoredItems();
}

function getInputElement() {
  let itemDescriptionInput = document.getElementById(INPUT_ID);
  return itemDescriptionInput;
}

function createToDoItem(description) {
  let listItem = document.createElement(LIST_ITEM_TAG);

  const textItem = document.createTextNode(description);
  listItem.appendChild(textItem);
  listItem.appendChild(createCompleteButton());
  listItem.appendChild(createCloseButton());

  return listItem;
}

function addNewElement() {
  const itemDescription = getInputElement().value;
  if (itemDescription === "") {
    alert("Trying to add empty ToDo item");
  }

  const todoList = document.getElementById(LIST_ID);
  let newItem = createToDoItem(itemDescription);
  todoList.appendChild(newItem);

  updateStoredItems();

  // Clear input text
  getInputElement().value = "";
}

function getItemsInfo() {
  const todoList = document.getElementById(LIST_ID);
  let items = [];
  for (let item of todoList.children) {
    items.push({
      description: item.firstChild.data,
      completed: item.classList.contains("checked")
    });
  }
  return items;
}

function updateStoredItems() {
  const items = getItemsInfo();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getStoredItems() {
  console.log(localStorage.getItem(STORAGE_KEY));
  if (localStorage.hasOwnProperty(STORAGE_KEY)) {
    const todoList = document.getElementById(LIST_ID);
    for (let item of JSON.parse(localStorage.getItem(STORAGE_KEY))) {
      let todoItem = createToDoItem(item.description);
      if (item.completed) {
        todoItem.classList.toggle("checked");
      }
      todoList.appendChild(todoItem);
    }
  }
}