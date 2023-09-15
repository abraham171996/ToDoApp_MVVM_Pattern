export default class ViewModel {
    constructor(model) {
        this.model = model;
        this.todosContainer = document.querySelector('.todos'); 
        this.createBtn = document.querySelector('.createBtn')
    }

    async handleDeleteClick(postId) {
        await this.model.deleteData(postId);
        const deletedTodoDiv = this.todosContainer.querySelector(`[data-id="${postId}"]`);
        if (deletedTodoDiv) {
            deletedTodoDiv.remove();
        }
    }

    showAllData() {
        this.model.getData().then(() => {
            this.model.allData.forEach(data => {
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todos__todo');
                todoDiv.setAttribute('data-id', data.id);
                todoDiv.innerHTML = `
                    <h2>${data.title}</h2>
                    <button class="deleteBtn">Delete</button>
                `;
                this.todosContainer.appendChild(todoDiv);

                const deleteButton = todoDiv.querySelector('.deleteBtn');
                deleteButton.addEventListener('click', () => {
                    this.handleDeleteClick(data.id);
                });

                
            });
        });
    }

  

    init() {
        this.showAllData();
    }
}
