const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// Adding todos
const generateTemplate = todo => {
  const html = `<li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="w-100">${todo}</span>
          <i class="far fa-edit edit mx-2"></i>
          <i class="far fa-trash-alt delete"></i>
        </li>
    `;
  list.innerHTML += html;
};

addForm.addEventListener("submit", e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// Deleting Todos
list.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }

  // Editing Todos
  if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement;
    const span = li.querySelector("span");
    const currentText = span.textContent;

    // Create an input field with the current todo text
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("form-control");

    // Replace the span with the input field
    li.replaceChild(input, span);

    // Listen for the 'blur' event on the input field to save the edited todo
    input.addEventListener("blur", () => {
      if (input.value.trim().length) {
        span.textContent = input.value.trim();
      }
      li.replaceChild(span, input);
    });

    // Also listen for the 'keypress' event to save on 'Enter' key press
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (input.value.trim().length) {
          span.textContent = input.value.trim();
        }
        li.replaceChild(span, input);
      }
    });

    // Focus the input field and select its content
    input.focus();
    input.select();
  }
});

// Searching
const filterTodos = term => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add("filtered"));
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove("filtered"));
};

// Keyup
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
