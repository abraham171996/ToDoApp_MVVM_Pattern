export default class ViewModel {
    constructor(model) {
      this.model = model;
      this.todosContainer = document.querySelector(".todos");
      this.createBtn = document.querySelector(".createBtn");
      this.createTodo = document.querySelector(".createTodo");
      this.headerTitle = document.querySelector(".headerTitle");
      this.todoDetails = document.querySelector(".todoDetails");
      this.cancelBtn = document.querySelector(".createTodo__btns__cancel");
      this.todoCreateBtn = document.querySelector(".createTodo__btns__create");
      this.new_title = document.querySelector(".new_title");
      this.new_body = document.querySelector(".new_body");

      
      this.new_title.addEventListener("input", this.updateCreateButtonState.bind(this));
      this.new_body.addEventListener("input", this.updateCreateButtonState.bind(this));
    }
  
    handleDeleteClick(postId) {
      this.model
        .deleteData(postId)
        .then(() => {
          const deletedTodoDiv = this.todosContainer.querySelector(
            `[data-id="${postId}"]`
          );
          if (deletedTodoDiv) {
            deletedTodoDiv.remove();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    async showAllData() {
      try {
        const data = await this.model.getData();
        const comments = await this.model.getComment();
  
        data.forEach((post) => {
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("todos__todo");
          todoDiv.setAttribute("data-id", post.id);
          todoDiv.innerHTML = `
                      <h2>${post.title}</h2>
                      <button class="deleteBtn">Delete</button>
                  `;
          this.todosContainer.appendChild(todoDiv);
  
          const deleteButton = todoDiv.querySelector(".deleteBtn");
          deleteButton.addEventListener("click", (e) => {
            this.handleDeleteClick(post.id);
            e.stopPropagation();
          });
  
          todoDiv.addEventListener("click", async () => {
            this.model.count = 1;
            this.todosContainer.style.display = "none";
            this.headerTitle.textContent = "Post";
            this.todoDetails.style.display = "flex";
            this.todoDetails.innerHTML = `
                          <div class="icon">
                          <span class="material-symbols-outlined icon_btn">
                          keyboard_backspace
                          </span>
                          </div>
                          <h2>${post.title}</h2>
                          <p>${post.body}</p>
                          <h3>Comments</h3>
                          <ul>
                              ${comments
                                .filter((comment) => comment.postId === post.id)
                                .map((comment) => `<li>${comment.body}</li>`)
                                .join("")}
                          </ul>
                      `;
            const iconBtn = this.todoDetails.querySelector(".icon_btn");
            iconBtn.addEventListener("click", () => {
              this.todoDetails.style.display = "none";
              this.todosContainer.style.display = "flex";
              this.headerTitle.textContent = "Posts";
              this.model.count = 0;
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    listenerPassCreateTodo() {
      this.createBtn.addEventListener("click", () => {
        this.todosContainer.style.display = "none";
        this.createTodo.style.display = "flex";
        this.createBtn.style.display = "none";
        this.todoDetails.style.display = "none";
        this.headerTitle.textContent = "Post";
      });
    }
    listenerCancel() {
      this.cancelBtn.addEventListener("click", () => {
        this.createTodo.style.display = "none";
        this.createBtn.style.display = "flex";
  
        if (this.model.count === 1) {
          this.todosContainer.style.display = "none";
          this.todoDetails.style.display = "flex";
        } else {
          this.todosContainer.style.display = "flex";
        }
      });
    }
    listenerCreateTodo() {
  this.todoCreateBtn.addEventListener("click", async () => {
    const newTitle = this.new_title.value.trim();
    const newBody = this.new_body.value.trim();
    this.todosContainer.style.display = "flex";
    this.createTodo.style.display = "none";
    this.createBtn.style.display = "flex";
    this.headerTitle.textContent = "Posts";
    if (newTitle && newBody) {
      const newData = {
        title: newTitle,
        body: newBody,
      };

      try {
        const response = await this.model.postData(newData);

        if (response && response.ok) {
            
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("todos__todo");
          todoDiv.innerHTML = `
            <h2>${newData.title}</h2>
            <button class="deleteBtn">Delete</button>
          `;
          this.todosContainer.appendChild(todoDiv);

          this.new_title.value = "";
          this.new_body.value = "";

          
        } else {
          console.error('Failed to create a new post.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
 
}

  
    updateCreateButtonState() {
      const newTitle = this.new_title.value.trim();
      const newBody = this.new_body.value.trim();
      const createButton = this.todoCreateBtn;
  
      if (newTitle && newBody) {
        createButton.disabled = false;
      } else {
        createButton.disabled = true;
      }
    }
  
    init() {
      this.showAllData();
      this.listenerPassCreateTodo();
      this.listenerCancel();
      this.listenerCreateTodo();
    }
}
