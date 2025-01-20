<template>
  <header>
    <div class="header-wrapper">
      <div class="logo">thomasmach</div>
      <div class="social-links">
        <ul>
          <li>
            <a
              class="social-link"
              href="https://github.com/thomas-mach"
              target="_blank"
              ><font-awesome-icon :icon="['fab', 'github']"
            /></a>
          </li>
          <li>
            <a
              class="social-link"
              href="https://www.linkedin.com/in/thomas-mach-b2bb2b314/"
              target="_blank"
              ><font-awesome-icon :icon="['fab', 'linkedin']"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  max-width: 1224px;
  /* position: relative; */
  margin: 0 auto;
  user-select: none;
}

a {
  color: var(--clr-light);
  font-size: var(--fs-medium);
  transition: color 0.3s ease-in-out;
}

.header-wrapper {
  /* border: 1px solid violet; */
  width: 100%;
  max-width: 1224px;
  margin: 0 auto;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 1000;
}

.social-links ul {
  display: flex;
  /* padding:  0 .75em; */
  justify-content: space-between;
  gap: 1em;
  font-size: 1.5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  text-align: center;
  margin: 0.25em 0;
}

@media (min-width: 600px) {
  .header-wrapper {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    /* left: 0;
        transform: translateX(0%); */
  }

  .header-wrapper {
    padding: 0 5%;
  }
}

@media (min-width: 1024px) {
  a:hover {
    color: var(--clr-accent);
  }

  /* .social-links ul{
    padding-right: 2em;
 } */

  .photo-wrapper {
    overflow: visible;
  }
}

@media (min-width: 1370px) {
  .header-wrapper {
    padding: 0;
  }
}
</style>
