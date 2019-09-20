// Getting references to elements
const newToDoTextInput = document.querySelector('#new-to-do-text-field');
// const addButton = document.querySelector('.js-add-button');
const form = document.querySelector('.js-form');
const toDoList = document.querySelector('.js-to-do-list');

// Adding a click event listener to the native add button
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Putting the value of the text field
    const trimmedTextFieldValue = newToDoTextInput.value.trim();

    // Guard
    if (!trimmedTextFieldValue) {
        return;
    }

    // Resetting the text field
    newToDoTextInput.value = "";

    // Creating a new list item
    
    // Creating a `li` item
    const newListItem = document.createElement('li');
    newListItem.tabIndex = -1;

    // Creating a text node with the value of the text field. Adding it to the `li` item. Appending it
    const textNodeForNewListItem = document.createTextNode(trimmedTextFieldValue);
    newListItem.appendChild(textNodeForNewListItem);

    // Creating a button called `delete`. Adding it to the `li` item
    const deleteButtonForNewListItem = document.createElement('button');
    deleteButtonForNewListItem.type = 'button';
    deleteButtonForNewListItem.textContent = 'Delete';
    newListItem.appendChild(deleteButtonForNewListItem);

    // Appendung the `li` element to the list
    toDoList.appendChild(newListItem);

    // Adding a click listener to the native delete button
        deleteButtonForNewListItem.addEventListener('click', () => {
            const toDoListItemToBeDeleted = deleteButtonForNewListItem.parentElement;

            // // Moving focus to the next item, if there's one. Else back on the list.
            // const nextElementSiblingOfTheToDoListItemToBeDeleted = toDoListItemToBeDeleted.nextElementSibling;

            // if (
            //     nextElementSiblingOfTheToDoListItemToBeDeleted
            //     && nextElementSiblingOfTheToDoListItemToBeDeleted.tagName.toUpperCase === 'li'.toUpperCase
            // ) {
            //     nextElementSiblingOfTheToDoListItemToBeDeleted.focus();
            // } else {
            //     toDoList.focus();
            // }

            // deleting the list item from its parent
            toDoListItemToBeDeleted.parentElement.removeChild(toDoListItemToBeDeleted);
        });
});
