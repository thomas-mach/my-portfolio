<template>
    <section>
      <div class="project-section-header">
          <h3 class="project-section-title">Progetti</h3>
          <a  class="link" href="#contact">contattami</a>
        </div>
        <div class="projects-wrapper">
         <CardProject v-for="(project, index) in ProjectsData" :key="index" 
            :title="project.title"
            :technologies="project.technologies"
            :linkProject="project.linkProject"
            :linkCode="project.linkCode"
            :image="project.image"
            />
        </div>
    </section>
</template>

<script>
    import CardProject from './CardProject.vue';
    import ProjectsData from '../assets/content/projects.json';
    export default {
        name: 'Projects',
        components:{
             CardProject
        },
        data() {
            return {
                ProjectsData: ProjectsData
            };
  }
    }
</script>

<style scoped>

.projects-wrapper{
    /* border: solid 1px green; */
    width: 90%;
    max-width: 1224px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
}

.project-section-header{
    /* border: solid 1px orange; */
    border-top: 1px solid var(--clr-light-dark);
    width: 90%;
    max-width: 1224px;
    padding-top: 3em;
    margin: 0 auto 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-section-title{
    font-size: var(--fs-h2);
}

.link {
    justify-self: center;
    text-transform: uppercase;
    font-weight: var(--fw-bold);
    border-bottom:  2px solid var(--clr-accent);
    letter-spacing: 2.3px;
    padding-bottom: .75em;
    transition: color 0.3s ease-in-out;
    font-size: var(--fs-body);
    grid-area: link;
}

@media(min-width: 600px) {
    .projects-wrapper{
        grid-template-columns: 1fr 1fr;
        column-gap: 1em;
    }

    .project-section-header{
        border-top: none;
    }
}

@media (min-width: 1024px) {
   .link:hover{
        color: var(--clr-accent);
    }
}


</style>