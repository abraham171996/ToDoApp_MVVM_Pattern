export default class ViewModel {
    constructor(model) {
        this.model = model;
        this.todosContainer = document.querySelector('.todos');
        this.createBtn = document.querySelector('.createBtn');
        this.createTodo = document.querySelector('.createTodo');
        this.headerTitle = document.querySelector('.headerTitle');
        this.todoDetails = document.querySelector('.todoDetails');
    }

    handleDeleteClick(postId) {
        this.model.deleteData(postId)
            .then(() => {
                const deletedTodoDiv = this.todosContainer.querySelector(`[data-id="${postId}"]`);
                if (deletedTodoDiv) {
                    deletedTodoDiv.remove();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    async showAllData() {
        try {
            const data = await this.model.getData();
            const comments = await this.model.getComment();
            
            data.forEach(post => {
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todos__todo');
                todoDiv.setAttribute('data-id', post.id);
                todoDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <button class="deleteBtn">Delete</button>
                `;
                this.todosContainer.appendChild(todoDiv);

                const deleteButton = todoDiv.querySelector('.deleteBtn');
                deleteButton.addEventListener('click', (e) => {
                    this.handleDeleteClick(post.id);
                    e.stopPropagation()
                });

                todoDiv.addEventListener("click", async () => {
                    this.todosContainer.style.display = 'none';
                    this.headerTitle.textContent = 'Post';
                    this.todoDetails.style.display = 'flex';
                    this.todoDetails.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                        <h3>Comments</h3>
                        <ul>
                            ${comments
                                .filter(comment => comment.postId === post.id)
                                .map(comment => `<li>${comment.body}</li>`)
                                .join('')}
                        </ul>
                    `;
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    listenerCreateTodo() {
        this.createBtn.addEventListener("click", () => {
            this.todosContainer.style.display = 'none';
            this.createTodo.style.display = 'flex';
            this.createBtn.style.display = 'none';
            this.todoDetails.style.display = 'none'
        });
    }

    init() {
        this.showAllData();
        this.listenerCreateTodo();
    }
}