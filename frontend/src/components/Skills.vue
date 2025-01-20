<template>
  <section class="technical-skills-section">
    <img
      class="pattern-rings-2"
      src="../../images/pattern-rings.svg"
      alt="pattern-rings"
    />
    <div class="technical-skills-wrapper">
      <CardSkill
        v-for="(skill, index) in SkillsData"
        :key="index"
        :skill="skill.title"
        :experience="skill.experience"
      />
    </div>
  </section>
</template>

<script setup>
import CardSkill from "./CardSkill.vue";
import SkillsData from "../assets/content/skills.json";
</script>

<style scoped>
.technical-skills-section {
  width: 100%;
  margin: 0% auto;
  position: relative;
  overflow-x: hidden;
}

.technical-skills-wrapper {
  /* border: 1px solid rebeccapurple; */
  width: 90%;
  margin: 0 auto 3em;
  padding-top: 3em;
  border-top: 1px solid var(--clr-light-dark);
  max-width: 1224px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: 1em;
}

.pattern-rings-2 {
  position: absolute;
  bottom: 10%;
  right: 20%;
  transform: translateX(60%);
}

.technical-skills-section p {
  color: var(--clr-light-dark);
  margin: 0;
}

.technical-skills-section h2 {
  color: var(--clr-light);
}

.technical-skills-section h2,
.technical-skills-section p {
  text-align: center;
}

@media (min-width: 600px) {
  .technical-skills-wrapper {
    grid-template-columns: 1fr 1fr;
    justify-items: start;
  }

  .technical-skills-section h2,
  .technical-skills-section p {
    text-align: left;
  }
}

@media (min-width: 1024px) {
  .technical-skills-wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }

  /* .technical-skills-section{
        overflow: visible;
    } */
}
</style>
