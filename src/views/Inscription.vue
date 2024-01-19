<template>
    <div class="inscription-container">
      <h2>Inscription</h2>
      <form @submit.prevent="handleSubmit">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" v-model="nom" required>
  
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" v-model="prenom" required>
  
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="motDePasse" required>
  
        <label for="password_confirmation">Confirmation du mot de passe :</label>
        <input type="password" id="password_confirmation" v-model="confirmationMotDePasse" required>
  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'InscriptionComponent',
    data() {
      return {
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        confirmationMotDePasse: '',
      };
    },
    methods: {
      handleSubmit() {
        // Vérifiez si les mots de passe correspondent
        if (this.motDePasse !== this.confirmationMotDePasse) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
  
        // Préparez les données à envoyer au backend
        const userData = {
          name: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.motDePasse,
          password_confirmation: this.confirmationMotDePasse, // Ajoutez cette ligne pour la règle 'confirmed'
        };
  
        // Utilisez Axios pour faire une requête POST à votre endpoint d'inscription Laravel
        axios.post('http://127.0.0.1:8000/api/register', userData)
          .then(() => {
            alert("Inscription réussie ! Redirection vers la page de connexion.");
            this.$router.push('/connexion');
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
            alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
          });
      },
    },
  };
  </script>
  
    <style scoped>
  .inscription-container {
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
    background-color: #52318f;
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