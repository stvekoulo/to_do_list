<template>
  <div class="container">
    <router-link to="/">
      <img src="https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png" alt="Logo" class="logo" />
    </router-link>
    <div class="content">
      <h1 class="welcome-text">Bienvenue sur l'application ToDo List</h1>
      <router-link to="/inscription">
        <button class="action-button">Inscription</button>
      </router-link>
      <router-link to="/connexion">
        <button class="action-button">Connexion</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  width: 90px; /* Ajustez la taille selon vos besoins */
  height: auto;
  margin-bottom: 20px;
}

.content {
  text-align: center;
}

.welcome-text {
  font-size: 24px;
  margin-bottom: 20px;
}

.action-button {
  margin: 0 10px; /* Ajoutez un espace horizontal entre les boutons */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6d48b1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #4dc55d;
}
</style>
