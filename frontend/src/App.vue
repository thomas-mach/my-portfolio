<template>
  <div id="app" class="app-wrapper">
    <Header />
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Skills from "./components/Skills.vue";
import Projects from "./components/Projects.vue";
import Contact from "./components/Contact.vue";
</script>

<style scoped>
.app-wrapper {
  margin: 0 auto;
  width: 100%;
  /* border: 1px solid red; */
}
</style>
