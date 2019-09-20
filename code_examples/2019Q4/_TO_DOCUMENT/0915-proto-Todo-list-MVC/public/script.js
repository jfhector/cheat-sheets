// Model
const Model = {
    // _toDos array of objects (with properties for that name, and an id number
    _toDos: [],

    // getter
    getToDos: () => {
        return Model._toDos;
    },

    // addTodo(toDoName)
    addTodo(toDoName) {
        // Get a new id
        const newId = Math.floor(Math.random() * Math.pow(10,10));

        // Create an object with that text and the new id
        const newToDo = {
            id: newId,
            label: toDoName,
        };

        // Push that object onto the _toDos array
        Model._toDos.push(newToDo);

        // Call all functions in the toDosUpdatedCallBacks array
        Model.toDosUpdatedCallBacks.forEach(cb => cb());
    },

    // deleteTodo(toDoId)
    deleteTodo(idOfToDoToDelete) {
        // Filter the _toDos array and return the same array without the item with that toDoId
        const filteredToDosArray = Model._toDos.filter(toDo => toDo.id !== idOfToDoToDelete);
        Model._toDos = filteredToDosArray;

        // Call all functions in the toDosUpdatedCallBacks array
        Model.toDosUpdatedCallBacks.forEach(cb => cb());
    },

    // toDosUpdatedCallBacks array of functions
    toDosUpdatedCallBacks: [],
}

// View
const View = {

    // References
    references: {
        form: undefined,
        input: undefined,
        toDoList: undefined,
    },

    // View init function
    init: () => {

        // Populate the references
        View.references.form = document.querySelector('.js-to-do-add-form');
        View.references.input = document.querySelector('#to-do-add-field');
        View.references.toDoList = document.querySelector('.js-to-do-list');
    },

    // To-do-list render function
    render() {
        // Clear the toDoList
        View.references.toDoList.innerHTML = '';

        // For each toDo in _toDos
        Model.getToDos().forEach(toDo => {
            // create a li element. give it a data-todo-id attribute with a unique id (from the model)
            const newListItem = document.createElement('li');
            newListItem.dataset.todoId = toDo.id;

            // create a text node for that li element. append it to the li element
            const textNodeForNewListItem = document.createTextNode(toDo.label);
            newListItem.appendChild(textNodeForNewListItem);

            // create a delete button for that li element. append it to the li element
            const deleteButtonForNewListItem = document.createElement('button');
            deleteButtonForNewListItem.type = 'button';
            deleteButtonForNewListItem.textContent = 'Delete';
            deleteButtonForNewListItem.classList.add('js-todo-delete-button')
            newListItem.appendChild(deleteButtonForNewListItem);

            // append the new list item onto the toDoList
            View.references.toDoList.appendChild(newListItem);

            // call Controller.setUpListItem(with that li element) to set up a click handler on the delete button
            Controller.setUpListItem(newListItem);
        });
    },
};

// Controller
const Controller = {
    
    // Controller init function
    init: () => {
        
        // Add submit handler on form
        View.references.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get the value of the toDoAddField. trim it
            const trimmedValueOfInputField = View.references.input.value.trim();

            // If the value is truthy
            if (trimmedValueOfInputField) {

                // Create an object (with properties for that name, and an unused id number). Push that object onto the 'toDos' array
                Model.addTodo(trimmedValueOfInputField);
    
                // Reset the value of the toDoAddField
                View.references.input.value = "";
            }
        });

        // Register View.render as a callback to be called when the model gets updated
        Model.toDosUpdatedCallBacks.push(View.render);
    },

    // setUpListItem(listItem)
    setUpListItem: (listItem) => {
        
        // get the data-todoid associated with the item
        const toDoId = parseInt(listItem.dataset.todoId);

        // get the delete button for that list item
        const deleteButtonOfThatListItem = listItem.querySelector('.js-todo-delete-button');

        // adds a click handler
        deleteButtonOfThatListItem.addEventListener('click', () => {

            // to call Model.deleteTodo(toDoId)
            Model.deleteTodo(toDoId);
        });
    },
};

// Initialise Model
// Nothing needs initialising for now

// Initialise View
View.init();

// Initialise Controller
Controller.init();