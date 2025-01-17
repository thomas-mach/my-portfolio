<template>
  <section id="contact" class="section-contact">
    <img
      class="pattern-rings-3"
      src="../../public/images/pattern-rings.svg"
      alt="pattern-rings"
    />
    <div class="footer-wrapper">
      <div class="title-wrapper">
        <h3 class="footer-title">Contatto</h3>
        <p class="footer-text">
          Sono appassionato di progetti innovativi come front-end developer e
          sempre aperto a nuove collaborazioni. Contattami e sarò felice di
          discuterne con te.
        </p>
      </div>
      <form nonvalidate @submit.prevent="submitForm">
        <label for="name">nome</label>
        <input type="text" id="name" v-model="formData.name" />
        <p class="error">{{ nameError }}</p>
        <label for="email">email</label>
        <input type="text" id="email" v-model="formData.email" />
        <p class="error">{{ emailError }}</p>
        <label for="message">messaggio</label>
        <textarea
          name=""
          id="message"
          cols="30"
          rows="4"
          v-model="formData.message"
        ></textarea>
        <p class="error">{{ messageError }}</p>
        <button class="btn" type="submit">Invia messaggio</button>
        <div class="message-placeholder">
          <transition name="fade">
            <div class="message-success" v-if="backendStatus">
              {{ backendStatus }}
            </div>
          </transition>
          <transition name="fade">
            <div class="message-error" v-if="backendError">
              {{ backendError }}
            </div>
          </transition>
        </div>
      </form>
    </div>
    <div class="logo-social-wrapper">
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
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Contact",

  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      backendStatus: "",
      backendError: "",
      messageError: "",
      nameError: "",
      emailError: "",
    };
  },
  methods: {
    async submitForm() {
      if (!this.formValidate()) {
        return;
      }

      try {
        const response = await axios.post(
          "https://thomas-mach-portfolio-8d5453a6da87.herokuapp.com/send-email",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json", // Modifica se necessario
            },
          }
        );
        this.backendStatus = response.data.message;
        this.backendError = "";
        this.clearFields();
      } catch (error) {
        console.error("Errore di backend:", error.response);

        if (error.response && error.response.status === 429) {
          this.backendError = error.response.data;
        } else if (error.response && error.response.data.errors) {
          this.emailError = "";
          this.nameError = "";
          this.messageError = "";

          let emailErrorSet = false;
          let nameErrorSet = false;
          let messageErrorSet = false;

          error.response.data.errors.forEach((err) => {
            if (err.path === "email" && !emailErrorSet) {
              this.emailError = err.msg;
              emailErrorSet = true;
            } else if (err.path === "name" && !nameErrorSet) {
              this.nameError = err.msg;
              nameErrorSet = true;
            } else if (err.path === "message" && !messageErrorSet) {
              this.messageError = err.msg;
              messageErrorSet = true;
            }
          });

          this.backendStatus = "";
        } else {
          this.backendError =
            error.response?.data?.error ||
            "C'è stato un errore nell'invio dell'email!";
          this.backendStatus = "";
        }
      } finally {
        setTimeout(() => {
          this.backendStatus = "";
          this.backendError = "";
        }, 8000);
      }
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    validateName(name) {
      const nameRegex = /^[a-zA-Zà-žÀ-Ž\s'-]+$/;

      if (!name.trim()) {
        return "Campo obbligatorio!";
      }

      if (name.trim().length < 2 || name.trim().length > 50) {
        return "Il nome deve avere da 2 a 50 caratteri";
      }

      if (!nameRegex.test(name)) {
        return "Il nome contiene caratteri non validi!";
      }

      if (/\s{2,}/.test(name)) {
        return "Il nome non può contenere spazi consecutivi!";
      }

      return null;
    },

    validateMessage(message) {
      if (!message.trim()) {
        return "Campo obbligatorio!";
      }

      if (message.trim().length < 10 || message.trim().length > 1000) {
        return "Il messasggio deve avere da 10 a 1000 caratteri!";
      }

      return null;
    },

    formValidate() {
      let isValid = true;
      const email = this.validateEmail(this.formData.email);
      if (!email) {
        this.emailError = "Email non valida!";
        isValid = false;
      } else {
        this.emailError = "";
      }

      const errorName = this.validateName(this.formData.name);
      if (errorName) {
        this.nameError = errorName;
        isValid = false;
      } else {
        this.nameError = "";
      }

      const errorMessage = this.validateMessage(this.formData.message);
      if (errorMessage) {
        this.messageError = errorMessage;
        isValid = false;
      } else {
        this.messageError = "";
      }

      return isValid;
    },

    clearFields() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.message = "";
      this.emailError = "";
      this.nameError = "";
      this.messageError = "";
    },
  },
};
</script>

<style scoped>
.section-contact {
  background-color: var(--clr-dark-light);
  padding-top: 3em;
  position: relative;
  /* border: 1px solid orange; */
}

.footer-wrapper {
  max-width: 1224px;
}

form,
.title-wrapper,
.footer-wrapper,
.logo-social-wrapper {
  width: 90%;
  margin: 0 auto;
}

.title-wrapper {
  margin: 0 auto 2em;
  text-align: center;
}

.footer-title {
  font-size: var(--fs-h2);
}

.footer-text {
  color: var(--clr-light-dark);
  max-width: 440px;
  margin: 1.5em auto;
}

form {
  max-width: 440px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.error {
  color: red;
  font-size: 0.75rem;
  height: 1rem;
  text-align: right;
}

input,
textarea {
  border-bottom: 1px solid var(--clr-light-dark);
  /* margin-bottom: 1.2em; */
  padding-left: 1.2em;
}

label {
  text-transform: uppercase;
  color: var(--clr-light-dark);
  padding-left: 1.2em;
}

input:focus,
textarea:focus {
  border-bottom: 1px solid var(--clr-accent);
}

.btn {
  align-self: flex-end;
  background-color: inherit;
  border: none;
  color: var(--clr-light);
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  font-family: inherit;
  text-transform: uppercase;
  border-bottom: 2px solid var(--clr-accent);
  letter-spacing: 2.3px;
  padding: 0 0 0.75em 0;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

.logo-social-wrapper {
  max-width: 1224px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-top: 1px solid var(--clr-light-dark);
  padding-top: 3em;
  padding-bottom: 3em;
  /* margin-top: 4.5em; */
}

.pattern-rings-3 {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateX(-60%);
  pointer-events: none;
  z-index: 100;
}

.social-links ul {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  font-size: 1.5em;
}

.logo {
  font-size: 1.5rem;
  font-weight: var(--fw-bold);
  text-align: center;
  margin: 0.75em 0;
}

.message-placeholder {
  margin-top: 1.2em;
  max-width: 440px;
  height: 3em;
  display: flex;
  justify-content: center;
  font-size: 0.75em;
}

.message-success {
  color: rgb(18, 210, 18);
}

.message-error {
  color: rgb(238, 31, 31);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media (min-width: 600px) {
  .logo-social-wrapper {
    flex-direction: row;
  }

  .message-placeholder {
    font-size: 1em;
  }
}

@media (min-width: 1024px) {
  .footer-wrapper {
    display: flex;
  }

  .footer-text {
    margin: 1.5em 0;
    text-align: left;
  }

  .footer-title {
    text-align: left;
  }

  .social-link:hover {
    color: var(--clr-accent);
  }

  .btn:hover {
    color: var(--clr-accent);
  }
}
</style>
