<template>
    <div class="todo-container">
        <h1 class="title">Tasks</h1>
        <input 
        type="text" 
        v-model="taskStore.newTask" 
        @keyup.enter="taskStore.addTasks"
        placeholder="Add a Task"
        class="task-input"
        />
        <ul class="task-list">
            <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
                <input 
                type="checkbox" 
                v-model="task.completed" 
                @change="taskStore.updateTasks(task)" 
                class="task-checkbox"
                />
                <span :class="{ completed: task.completed }">{{  task.task  }}</span>
                <button 
                @click="taskStore.deleteTasks(task.id)" 
                class="task-remove">Delete
            </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'


const taskStore = useTaskStore()
onMounted(() => {
    taskStore.getTasks()
})

</script>