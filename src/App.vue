<template>
  <div id="app">
    <header>
      <h1>Gerador de Paletas de Cores</h1>
    </header>
    <main>
      <PaletteGenerator />
    </main>
  </div>
</template>

<script>
import PaletteGenerator from './components/PaletteGenerator.vue';

export default {
  name: 'App',
  components: {
    PaletteGenerator,
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center; 
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  max-width: 1200px; 
  padding: 0px; 
  display: flex; 
  flex-direction: column;
  align-items: center; 

}

header {
  margin-top: 10px;
  margin-bottom: 15px; 
  h1 {
    font-size: 2.8em; 
    font-weight: 700; 
    color: #34495e; 
    letter-spacing: -0.02em; 
    text-shadow: 1px 1px 2px rgba(0,0,0,0.05); 
  }
}

main {
    display: flex;
    justify-content: center; 
    padding-bottom: 40px;
}

</style>