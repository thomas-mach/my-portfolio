<template>
  <section>
    <div class="hero-section-wrapper">
      <div class="photo-wrapper">
        <div class="hero-photo"></div>
        <img
          class="pattern-circle"
          src="../../public/images/pattern-circle.svg"
          alt="pattern-circle"
        />
      </div>
      <div class="about-wrapper">
        <img
          class="pattern-rings"
          src="../../public/images/pattern-rings.svg"
          alt="pattern-rings"
        />
        <h1 class="hero-title">
          Ciao sono<span class="title-underline">Thomas Mach</span>.
        </h1>
        <p class="hero-text">
          Sono uno sviluppatore front-end con la passione di creare applicazioni
          web accessibili, performanti e apprezzate dagli utenti.
        </p>
        <a class="link" href="#contact">contattami</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.hero-section-wrapper,
.photo-wrapper {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.hero-section-wrapper {
  max-width: 1224px;
  display: flex;
  flex-direction: column;
  /* padding-bottom: 4em; */
  user-select: none;
  /* border: 1px solid yellow; */
}

.photo-wrapper {
  grid-area: photo;
  overflow: hidden;
  z-index: 120;
}

.about-wrapper {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-template-areas:
    "title"
    "text"
    "link";
}

.hero-title {
  font-size: var(--fs-h1);
  font-weight: var(--fw-bold);
  text-align: center;
  margin: 0.75em 0;
  grid-area: title;
  max-width: 360px;
}

.title-underline {
  border-bottom: 4px solid var(--clr-accent);
  line-height: 1;
  display: inline-block;
}

.hero-text {
  color: var(--clr-light-dark);
  text-align: center;
  margin-bottom: 2em;
  grid-area: text;
  max-width: 380px;
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

.hero-photo {
  width: 175px;
  height: 380px;
  margin-left: auto;
  margin-right: auto;
  background-image: url(../../public/images/foto-me.png);
  background-size: cover;
  background-position: center;
}

.pattern-circle {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(50%);
  z-index: 100;
}

.pattern-rings {
  position: absolute;
  top: 15%;
  left: -50%;
  z-index: 100;
}

@media (min-width: 600px) {
  .hero-section-wrapper {
    flex-direction: row-reverse;
    width: 95%;
    margin: 0 auto;
    margin-right: 0;
  }

  .hero-photo {
    margin: 0;
    justify-self: self-end;
    width: 322px;
    height: 600px;
    /* background-image: url(../../public/images/foto-me.png); */
    background-size: cover;
  }

  .hero-title {
    text-align: left;
    justify-self: self-start;
    margin-top: 1.8em;
    margin-bottom: 0.5em;
    margin-right: -300px;
    z-index: 200;
    min-width: 520px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  }

  .hero-text {
    text-align: left;
    justify-self: self-start;
    margin-bottom: 2em;
    margin-right: -200px;
    z-index: 200;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  }

  .pattern-circle {
    right: 0;
  }

  .pattern-rings {
    left: -30%;
  }

  .link {
    justify-self: self-start;
    align-self: self-end;
    margin-bottom: 2em;
  }
}

@media (min-width: 1024px) {
  .hero-section-wrapper {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    align-items: start;
  }

  .photo-wrapper {
    overflow: visible;
  }

  .hero-photo {
    width: 445px;
    height: 720px;
    /* background-image: url(../../public/images/foto-me.png); */
    background-position: right;
  }

  .link:hover {
    color: var(--clr-accent);
  }

  .hero-title {
    min-width: 750px;
  }

  .pattern-rings {
    left: -20%;
  }

  .pattern-circle {
    right: 500px;
    bottom: 60px;
  }
}
</style>
