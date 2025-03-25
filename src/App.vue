<script setup></script>

<template>
  <div class="layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <img
        src="https://cdn-icons-png.flaticon.com/512/188/188987.png"
        width="30"
        height="30"
        alt=""
      />
      <router-link class="navbar-brand text-white" to="/">Pokeca</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-white" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-primary text-white text-center p-3">
      <div>{{ new Date().getFullYear() }}</div>
    </footer>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.navbar-light .navbar-nav .nav-link {
  color: white;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

footer {
  height: 56px;
}
</style>
