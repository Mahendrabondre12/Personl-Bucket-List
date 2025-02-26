document.addEventListener("DOMContentLoaded", loadItems);

const input = document.getElementById("new-item");
const addButton = document.getElementById("add-button");
const bucketList = document.getElementById("bucket-list");

addButton.addEventListener("click", addItem);
bucketList.addEventListener("click", removeItem);

function addItem() {
    if (input.value.trim() === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${input.value} <button class="delete-btn">X</button>`;
    bucketList.appendChild(li);

    saveItems();
    input.value = "";
}

function removeItem(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
        saveItems();
    }
}

function saveItems() {
    const items = Array.from(bucketList.children).map(li => li.innerText.replace(" X", ""));
    localStorage.setItem("bucketList", JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem("bucketList")) || [];
    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item} <button class="delete-btn">X</button>`;
        bucketList.appendChild(li);
    });
}
