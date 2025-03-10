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
        <div class="links-code-wrapper">
          <a
            @click="handleShowLinks($event)"
            class="link"
            target="_blank"
            :href="
              linkCode === 'frontend-backend' ? 'javascript:void(0)' : linkCode
            "
            >vedi codice
          </a>
          <div class="links-front-back-wrapper" :class="{ show: showLinks }">
            <a
              v-if="showLinks"
              @click="showLinks = false"
              class="link-frontend"
              target="_blank"
              :href="linkCodeFrontend"
              >frontend</a
            >
            <a
              v-if="showLinks"
              @click="showLinks = false"
              class="link-backend"
              target="_blank"
              :href="linkCodeBackend"
              >backend</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
let showLinks = ref(false);

const props = defineProps({
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
  linkCodeFrontend: {
    type: String,
    required: false,
  },
  linkCodeBackend: {
    type: String,
    required: false,
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

const handleShowLinks = (event) => {
  if (props.linkCode === 'frontend-backend') {
    event.preventDefault();
    return (showLinks.value = !showLinks.value);
  } else showLinks.value = false;
};
</script>

<style scoped>
.card {
  width: 100%;
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
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
  margin-top: 0.75em;
  position: relative;
}

.links-box {
  display: flex;
  gap: 1.5em;
  position: relative;
}

.link {
  align-self: flex-start;
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

.links-code-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.link-frontend,
.link-backend {
  text-align: center;
  background-color: var(--clr-dark);
  text-transform: uppercase;
  font-weight: var(--fw-bold);
  border-bottom: 2px solid var(--clr-accent);
  letter-spacing: 2.3px;
  padding-bottom: 0.75em;
  font-size: var(--fs-body);
}

.links-front-back-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10%;
  left: 0;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.links-front-back-wrapper.show {
  opacity: 1;
  transform: translateY(100px);
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

  .link-frontend,
  .link-backend {
    background-color: inherit;
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

  .link:hover,
  .link-frontend:hover,
  .link-backend:hover {
    color: var(--clr-accent);
  }
}
</style>
