<template>
  <section class="achievements-section">
    <Modal
      :show="showModal"
      @close="showModal = false"
      :src="propURL"
      @click.self="showModal = false"
    />
    <div class="achievements-section-wrapper">
      <div class="achievements-section-header">
        <h3 class="achievements-section-title">Certificazioni</h3>
      </div>
      <div class="achievements-wrapper">
        <img
          class="achievement-thumb"
          v-for="(achievement, index) in AchievementsData"
          :src="achievement.URL"
          alt=""
          @click="
            showModal = true;
            propURL = achievement.URL;
          "
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
import AchievementsData from "../assets/content/achievements.json";

let showModal = ref(false);
let propURL = ref("");
</script>

<style scoped>
.achievements-section {
  width: 100%;
  margin: 0 auto;
  /* background-color: red; */
}

.achievement-thumb {
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.achievements-section-wrapper {
  width: 90%;
  margin: 0 auto;
  max-width: 1224px;
  display: flex;
  flex-direction: column;
  padding-top: 3em;
  padding-bottom: 3em;
}

.achievements-section-title {
  font-size: var(--fs-h2);
  margin-bottom: 1em;
}

.achievements-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

@media (min-width: 600px) {
  .achievement-thumb:hover {
    transform: scale(1.1);
  }
}
</style>
