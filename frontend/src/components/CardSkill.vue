<template>
       <div>
            <h2 class="skill">{{ skill }}</h2>
            <p class="experience">{{ experience }}</p>
          </div>
</template>

<script>
    export default {
        name: 'CardSkill',
        props:{
            skill: {
                type: String,
                required: true,
            },
            experience: {
                type: String,
                required: true,
            },
        }
    }
</script>

<style scoped>
  
.experience{
    color: var(--clr-light-dark);
    margin: 0;
}

 .skill{
    color: var(--clr-light);
}

 .skill,
 .experience {
    text-align: center;
}

@media(min-width: 600px) {
    .skill,
     .experience {
        text-align: left;
    }
}
</style>