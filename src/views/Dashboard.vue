<template>
    <div>
      <!-- Barre de navigation Bootstrap -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png" alt="Logo" class="logo" />
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <!-- Aligner à droite -->
              <li class="nav-item active">
                <a class="nav-link" href="#">Accueil</a>
              </li>
              <li class="nav-item">
                <a @click="logout" class="nav-link" href="#">Déconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- Contenu de votre composant -->
      <div class="container mt-4">
        <h2>Bienvenue, {{ userName }}!</h2>
  
        <button @click="showAddTaskForm" class="btn btn-primary mt-2">Ajouter une tâche</button>
  
        <!-- Formulaire d'ajout de tâche (initiallement masqué) -->
        <div v-if="showForm">
         <h2>{{ isEditing ? 'Modifier une tâche' : 'Ajouter une tâche' }}</h2>
          <form @submit.prevent="saveData">
            <!-- Ajoutez les champs du formulaire selon vos besoins -->
            <div class="form-group">
              <label for="title">Titre :</label>
              <input v-model="task.title" type="text" class="form-control" id="title" required>
            </div>
            <div class="form-group">
              <label for="description">Description :</label>
              <textarea v-model="task.description" class="form-control" id="description"></textarea>
            </div>
            <div class="form-group">
              <label for="status">Statut :</label>
              <select v-model="task.status" class="form-control" id="status" required>
                <option value="non débuté">Non débuté</option>
                <option value="en cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success">
            {{ isEditing ? 'Modifier' : 'Enregistrer' }}
            </button>
          </form>
        </div>
  
        <div class="mt-4 row">
          <h2>Statistiques des tâches</h2>
  
          <div class="col-md-3">
            <p>Total de tâches: {{ taskStats.total }}</p>
          </div>
          <div class="col-md-3">
            <p>Tâches non débutées: {{ taskStats.notStarted }}</p>
          </div>
          <div class="col-md-3">
            <p>Tâches en cours: {{ taskStats.inProgress }}</p>
          </div>
          <div class="col-md-3">
            <p>Tâches terminées: {{ taskStats.completed }}</p>
          </div>
        </div>
  
        <div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Status</th>
        <th scope="col">Changer Status</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in result" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.status }}</td>
        <td>
          <button v-if="task.status !== 'terminé'" @click="changeTaskStatus(task)" class="btn btn-success">Changer Statut</button>
          <button v-else class="btn btn-secondary" disabled>Désactivé</button>
        </td>
        <td>
          <button @click="edit(task)" class="btn btn-warning">Edit</button>
          <button @click="remove(task)" class="btn btn-danger">Delete</button>
          <button @click="showTaskDetailsModal" class="btn btn-info">Détails</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'DashboardComponent',
    data() {
      return {
        userName: 'John Doe', // Remplacez par votre logique de récupération du nom d'utilisateur
        showForm: false,
        task: {
          id:'',
          title: '',
          description: '',
          status: ''
        },
        taskStats: {
          total: 0, // Remplacez par votre logique de récupération des statistiques des tâches
          notStarted: 0,
          inProgress: 0,
          completed: 0
        },
        isEditing: false,
        result: [] // Remplacez par votre logique de récupération de la liste des tâches
      };
    },

    created() {
        this.TaskLoad();
    },
    methods: {
   async logout() {
    const token = localStorage.getItem('token');

    try {
         axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      // Effacez le stockage local et effectuez d'autres actions nécessaires
      localStorage.removeItem('token');

      // Redirection vers la page de connexion
      this.$router.push({ name: 'connexion' });

    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  },
  // Autres méthodes...

      showAddTaskForm() {
        this.showForm = true;
      },
      
      TaskLoad() {
  const token = localStorage.getItem('token');
  axios.get('http://127.0.0.1:8000/api/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  .then(response => {
    this.result = response.data;
    this.calculatetaskStats(); // Calculate task statistics after loading tasks
  })
  .catch(error => {
    console.error('Error fetching tasks:', error);
  });
},


    calculatetaskStats() {
            this.taskStats.total = this.result.length;
            this.taskStats.notStarted = this.result.filter(task => task.status === 'not_started').length;
            this.taskStats.inProgress = this.result.filter(task => task.status === 'in_progress').length;
            this.taskStats.completed = this.result.filter(task => task.status === 'completed').length;
// eslint-disable-next-line no-irregular-whitespace
        },
       saveData() {
            const token = localStorage.getItem('token');
            axios.post('http://127.0.0.1:8000/api/tasks', this.task, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                })
                .then(() => {
                    alert('Enregistrement réussi!');
                    this.TaskLoad();
                    this.task.title = '';
                    this.task.description = '';
                    this.task.status = '';
                    this.id = '';
                })
                .catch(error => {
                    console.error('Error saving task:', error);
                });
            this.showForm = false;
// eslint-disable-next-line no-irregular-whitespace
        },
        changeTaskStatus(task) {
        const authToken = localStorage.getItem('token');

        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/change-status`, {}, {
            headers: {
            Authorization: `Bearer ${authToken}`, // Ajoutez les backticks et la variable
            Accept: 'application/json',
            },
        })
        // eslint-disable-next-line no-unused-vars
        .then(_response => {
            // Mettez à jour la liste des tâches après avoir changé le statut
            this.TaskLoad();
        })
        .catch(error => {
            console.error('Error changing task status:', error);
        });
        },
      edit(task) {
        // TODO: Implement the edit logic using 'task'
        // This is a placeholder to avoid the warning
        console.log('Editing task:', task);
      },
      remove (task) {
      const token = localStorage.getItem('token');
      const url = `http://127.0.0.1:8000/api/tasks/${task.id}`;

      axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then(() => {
          alert('Suppression réussie!');
          this.TaskLoad(); // Rechargez la liste des tâches après la suppression
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    },
      showTaskDetailsModal() {
        // Logic that does not require the 'task' parameter
      }
    },
    mounted() {
    // Appeler TaskLoad lors de la création du composant
    this.TaskLoad();
  }
  };

  </script>
  <style scoped>
  /* Styles pour la barre de navigation Bootstrap */
  .navbar {
    background-color: #2c3e50;
    color: #ffffff;
  }

  .logo {
    width: 90px;
    height: auto;
    margin-bottom: 10px;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav-link {
    color: #ffffff !important;
  }

  /* Styles pour le formulaire d'ajout de tâche */
  form {
    max-width: 400px;
    margin: 0 auto;
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .btn-main {
    background-color: #3498db;
    color: #ffffff;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
    color: #333;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    box-sizing: border-box;
    margin-top: 5px;
  }

  /* Styles pour les statistiques des tâches */
  .row h2 {
    color: #3498db;
    margin-top: 20px;
  }

  /* Styles pour la table des tâches */
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #bdc3c7;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #3498db;
    color: #ffffff;
  }

  /* Styles pour les boutons d'action dans la table des tâches */
  .btn-table {
    margin-right: 5px;
    color: #ffffff;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .btn-success {
    background-color: #2ecc71;
  }

  .btn-danger {
    background-color: #e74c3c;
  }

  .btn-warning {
    background-color: #f39c12;
  }

  .btn-info {
    background-color: #3498db;
  }

  .btn-table:hover {
    background-color: #555;
  }

  .btn-main:hover {
    background-color: #2980b9;
  }

</style>
