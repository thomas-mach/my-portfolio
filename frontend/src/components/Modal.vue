<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="wrapper">
        <!-- <button class="close-modal" @click="$emit('close')">close</button> -->
        <img :src="src" alt="" />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  src: String,
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  width: 100svw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: grid;
  place-items: center;
  user-select: none;
}

.wrapper {
  width: 95svw;
  /* height: 80svh; */
  max-width: 600px;
  background-color: var(--clr-light-dark);
  padding: 1em;
  border-radius: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
