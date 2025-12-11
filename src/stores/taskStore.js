import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/tasks";

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
        newTask: "",
    }),
    actions: {
        async getTasks() { //visualizar
            try{
                const response = await axios.get(apiUrl);
                this.tasks = response.data;
                console.log(this.tasks)
            } catch (error) {
                console.error("Error fetching tasks: "+error);
            }
        },
        async addTasks() {
    if (!this.newTask.trim()) return; 
    try {
        const response = await axios.post(apiUrl, {
        title: this.newTask,
        completed: false
        });
        this.tasks.push(response.data);
        this.newTask = "";
    } catch (error) {
        console.error("Error adding task:", error);
    }},
        async updateTasks(task) { //actualizar
            try{
                await axios.put(`${apiUrl}/${task.id}`, task);
            } catch (error) {
                console.error("Error updating task: "+error);
            }
        },
        async deleteTasks(id) { //borrar
                        try{
                await axios.delete(`${apiUrl}/${id}`);
                this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (error) {
                console.error("Error deleting task: "+error);
            }
        }
    }
})

//REVISAR ESTE CODIGO