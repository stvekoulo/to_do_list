<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Ajouter une tâche</h2>
        <form @submit.prevent="submitTask">
          <label>Nom de la tâche:</label>
          <input v-model="newTaskName" required>
          <label>Statut:</label>
          <select v-model="newTaskStatus" required>
            <option value="non débuté">Non débuté</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTaskName: "",
        newTaskStatus: "non débuté",
      };
    },
    methods: {
      submitTask() {
        this.$emit('add-task', {
          name: this.newTaskName,
          status: this.newTaskStatus,
        });
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
        this.newTaskName = "";
        this.newTaskStatus = "non débuté";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles pour la boîte modale au besoin */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  