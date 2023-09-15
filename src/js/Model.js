export default class Model {
    constructor() {
        this.BASE_URL = "https://jsonplaceholder.typicode.com";
        this.allData = [];
    }

    async getData() {
        try {
            const response = await fetch(`${this.BASE_URL}/posts`);
            const data = await response.json();
            this.allData = data;
        } catch (err) {
            console.error(err);
        }
    }
    async deleteData(postId) {
        try {
            const response = await fetch(`${this.BASE_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Successfully deleted post with ID ${postId}`);
                // You can update your data or UI here if needed.
            } else {
                console.error(`Failed to delete post with ID ${postId}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
}