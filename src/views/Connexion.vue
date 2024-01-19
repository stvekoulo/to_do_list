<template>
    <div class="connexion-container">
      <h2>Connexion</h2>
      <form @submit.prevent="handleSubmit">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="motDePasse">Mot de passe :</label>
        <input type="password" id="motDePasse" v-model="motDePasse" required>
  
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ConnexionComponent',
    data() {
      return {
        email: '',
        motDePasse: '',
      };
    },
    methods: {
      handleSubmit() {
        // Préparez les données à envoyer au backend
        const loginData = {
          email: this.email,
          password: this.motDePasse,
        };
  
        // Utilisez Axios pour faire une requête POST à votre endpoint de connexion Laravel
        axios.post('http://127.0.0.1:8000/api/login', loginData)
          .then( () => {
            alert("Connexion réussie !");
            // Redirigez l'utilisateur vers la page de dashboard
            this.$router.push('/dashboard');
          })
          .catch(error => {
            // Gérez les erreurs
            if (error.response) {
              console.error(error.response.data);
              console.error(error.response.status);
              console.error(error.response.headers);
            } else if (error.request) {
              console.error(error.request);
            } else {
              console.error('Error', error.message);
            }
            alert("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
          });
      },
    },
  };
  </script>
  
    <style scoped>
    .connexion-container {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    form {
      display: grid;
      grid-gap: 15px;
    }
    
    label {
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #7e319c;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    button:hover {
      background-color: #45a049;
    }
    </style>
    