const usersDom = document.querySelector("#users");
const winner = document.querySelector("#winner");
const button = document.querySelector(".clame");
const input = document.querySelector("#input");
const add = document.querySelector("#add");
const error = document.querySelector(".error");


const users = JSON.parse(localStorage.getItem("users")) ?? [];

// Append child
const appendChild = (user) => {
    const close = document.createElement("span");
    close.innerText = "X";
    close.className = "close";
    close.onclick = () => deleteUser(user);

    const li = document.createElement("li");
    li.className = `user user-${user.id}`;
    li.innerText = `${user.id} ${user.name}`;
    li.appendChild(close);

    usersDom.appendChild(li);
};

// Render users
users.forEach((user) => {
    appendChild(user);
});

// Draw
button.addEventListener("click", () => {
    const { id, name } = users[Math.floor(Math.random() * users.length)];
    winner.innerText = `Winner: ${name} \nId: ${id}`;
    alert(`Winner: ${name} \nId: ${id}`)
});

// Add user
add.addEventListener("click", () => {
    if (!input.value) {
        error.innerText = "Name is required";
        return;
    }

    users.push({
        id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
        name: input.value,
    });
    appendChild(users[users.length - 1]);

    input.value = "";
    error.innerText = "";

    localStorage.setItem("users", JSON.stringify(users));
});

// Delete user
function deleteUser(user) {
    if (!confirm("Are you sure want to delete?")) return;

    let index;
    users.map(({ id }, i) => {
        if (id === user.id) {
            index = i;
        }
    });

    users.splice(index, 1);

    const node = document.querySelector(`.user-${user.id}`);
    usersDom.removeChild(node);

    localStorage.setItem("users", JSON.stringify(users));
}
