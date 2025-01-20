<template>
  <div class="card">
    <div class="img-wrapper">
      <div class="overlay"></div>
      <img :src="image" alt="image" />
    </div>
    <h4 class="card-title">{{ title }}</h4>
    <ul class="technologies">
      <li class="tech" v-for="(tech, index) in technologies" :key="index">
        {{ tech }}
      </li>
    </ul>
    <div class="links-wrapper">
      <div class="links-box">
        <a class="link" target="_blank" :href="linkProject">vedi progetto</a>
        <a class="link" target="_blank" :href="linkCode">vedi codice</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  technologies: {
    type: Array,
    required: true,
  },
  linkProject: {
    type: String,
    required: true,
  },
  linkCode: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5em;
  position: relative;
}

/* .img-wrapper{
    flex-grow: 1;
} */

.card-title {
  font-size: var(--fs-h3);
  font-weight: var(--fw-bold);
  margin: 0.5em 0 0 0;
  letter-spacing: 2px;
}

.technologies {
  /* border: 1px solid pink; */
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  color: var(--clr-light-dark);
  margin: 0;
  flex-grow: 1;
}

.card-title,
.tech {
  text-transform: uppercase;
}

.links-wrapper {
  margin-top: 2em;
}

.links-box {
  display: flex;
  gap: 1.5em;
}

.link {
  justify-self: center;
  text-transform: uppercase;
  font-weight: var(--fw-bold);
  border-bottom: 2px solid var(--clr-accent);
  letter-spacing: 2.3px;
  padding-bottom: 0.75em;
  transition: color 0.3s ease-in-out;
  font-size: var(--fs-body);
  grid-area: link;
}

@media (min-width: 600px) {
  /* .card-title{
        font-size: 1.125rem;
    } */
}

@media (min-width: 1024px) {
  .links-wrapper {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    flex-direction: column;
    align-items: center;
    transition: opacity 0.3s ease-in-out;
  }

  .links-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    margin: 0 auto;
  }

  .img-wrapper {
    position: relative;
  }

  .overlay {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out;
  }

  .card:hover {
    .links-wrapper {
      opacity: 1;
    }
    .overlay {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  .link:hover {
    color: var(--clr-accent);
  }
}
</style>
