const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "") {
    if (!editFlag) {
      addItemToDOM(id, value);
      displayAlert("item added to the list", "success");
      addToLocalStorage(id, value);
    } else {
      editElement.innerHTML = value;
      displayAlert("value changed", "success");
      editLocalStorage(editID, value);
      setBackToDefault();
    }
  } else {
    displayAlert("please enter value", "danger");
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.className = `alert alert-${action}`;
  setTimeout(() => {
    alert.textContent = "";
    alert.className = "alert";
  }, 1000);
}

function clearItems() {
  list.innerHTML = "";
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

function deleteItem(e) {
  const element = e.target.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.target.parentElement.parentElement;
  editElement = element.querySelector(".title");
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

function addToLocalStorage(id, value) {
  let items = getLocalStorage();
  items.push({ id, value });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(item => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(item => (item.id === id ? { ...item, value } : item));
  localStorage.setItem("list", JSON.stringify(items));
}

function setupItems() {
  const items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(item => addItemToDOM(item.id, item.value));
    container.classList.add("show-container");
  }
}

function addItemToDOM(id, value) {
  const element = document.createElement("article");
  element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
      <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
  `;
  element.classList.add("grocery-item");
  element.dataset.id = id;
  element.querySelector(".delete-btn").addEventListener("click", deleteItem);
  element.querySelector(".edit-btn").addEventListener("click", editItem);
  list.appendChild(element);
}
