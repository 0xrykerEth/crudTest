document.addEventListener('DOMContentLoaded', function() {
    axios
        .get("https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book")
        .then((result) => {
            const user = result.data;
            user.forEach((users) => {
                displayItem(users);
            });
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
});

function handleFormSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value.trim();  
    const desc = event.target.desc.value.trim();

 
    

    const bookDetails = {
        title: title,
        desc: desc,
    };

    axios
        .post("https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book", bookDetails)
        .then((response) => {
            console.log("Note added:", response.data);
            displayItem(response.data);
        })
        .catch((error) => {
            console.log("Error adding note:", error);
        });

    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
}

function displayItem(bookDetails) {
    const userItem = document.createElement('li');
    userItem.classList.add('notItem');

    const notTitle = document.createElement('h3');
    notTitle.textContent = bookDetails.title;
    userItem.appendChild(notTitle);

    const noteDesc = document.createElement("p");
    noteDesc.textContent = bookDetails.desc;
    userItem.appendChild(noteDesc);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    userItem.appendChild(deleteBtn);
    const list = document.getElementById("userList");
    list.appendChild(userItem);

    deleteBtn.addEventListener('click', function() {
        axios
            .delete(`https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book/${bookDetails._id}`)
            .then(() => {
                console.log(bookDetails._id)
                userItem.remove();
            })
            .catch((error) => {
                console.log("Error deleting note:", error);
            });
    });
}

module.exports = handleFormSubmit;
