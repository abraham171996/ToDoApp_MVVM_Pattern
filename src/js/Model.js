export default class Model {
    constructor() {
        this.BASE_URL = "https://jsonplaceholder.typicode.com";
    }

    async getData() {
        try {
            const response = await fetch(`${this.BASE_URL}/posts`);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getComment() {
        try{
            const res = await fetch(`${this.BASE_URL}/comments`)
            return await res.json()
        }
        catch(err){
            console.log(err);
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
            } else {
                console.error(`Failed to delete post with ID ${postId}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}