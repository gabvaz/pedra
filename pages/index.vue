<template>
  <section class="main">
    <div class="container">
      <div class="header">
        <h3>Bem-vindo ao sistema de gestão de obras Pedra Engenharia</h3>
        <h5>Selecione a obra e o período para continuar</h5>
      </div>
      <div class="form">
        <div class="group">
          <p>Selecione a obra:</p>
          <select v-model="selectedObra" class="selectObra">
            <option value="" disabled selected>Obra</option>
            <option v-for="(obra, i) in obras" :key="i" :value="obra.id">
              {{ obra.condominio }}
            </option>
          </select>
        </div>
        <div class="group">
          <p>Data inicial do relatório:</p>
          <b-calendar v-model="startDate" locale="en-US"></b-calendar>
        </div>
        <div class="group">
          <p>Data final do relatório:</p>
          <b-calendar v-model="endDate" locale="en-US"></b-calendar>
        </div>
      </div>
      <button
        class="btn"
        @click="
          $router.push(
            `/obra/${selectedObra}?startDate=${startDate}&endDate=${endDate}`
          )
        "
      >
        Gerar relatório
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      selectedObra: '',
    }
  },
  computed: {
    ...mapState('api', {
      obras: 'obras',
    }),
  },
  created() {
    this.getObras()
  },
  methods: {
    ...mapActions('api', {
      getObras: 'GET_OBRAS',
    }),
  },
}
</script>
<style scoped>
.main {
  padding: 60px 0;
}
.form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 60px;
}
.header {
  margin-bottom: 60px;
}
.group {
  background: #8080804f;
  padding: 30px;
  border-radius: 30px;
}
.btn {
  margin-top: 60px;
  background: green;
  color: white;
  padding: 5px 15px;
  font-weight: bold;
  border-radius: 15px;
}
</style>
