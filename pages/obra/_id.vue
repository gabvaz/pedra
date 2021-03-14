<template>
  <div v-if="services != ''" class="container">
    <h4>
      Obra selecionada: <b>{{ obra.condominio }}</b>
    </h4>
    <div class="relatorio">
      <div class="info">
        ART: <b>{{ obra.ART }}</b> <br />
        EMPRESA: <b>{{ obra.empresa }} </b><br />
        SINDICO: <b>{{ obra.sindico }} </b> <br />
        ENGENHEIRO: <b>{{ obra.engenheiro }} </b> <br />
        RESPONSÁVEL: <b>{{ obra.responsavel }} </b> <br />
        INÍCIO: <b>{{ obra.dataInicio }} </b> <br />
        PREV. TÉRMINO: <b>{{ obra.dataTermino }} </b> <br />
      </div>
      <div class="calendar">
        <div class="selecao">
          <div class="group">
            <p>Data inicial do relatório:</p>
            <b-calendar v-model="periodo.startDate" locale="en-US"></b-calendar>
          </div>
          <div class="group">
            <p>Data final do relatório:</p>
            <b-calendar v-model="periodo.endDate" locale="en-US"></b-calendar>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div>
      Relatorio Referente a:
      <b>{{ $route.query.startDate }} até {{ $route.query.endDate }}</b>
    </div>
    <br />
    <div id="resume">
      <table>
        <thead>
          <tr>
            <th>Serviço</th>
            <th>Executado no período</th>
            <th>Previsto</th>
            <th>Executado</th>
            <th>Total</th>
            <th>Percentual Previsto</th>
            <th>Percentual Executado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, i) in services" :key="i">
            <th>{{ service.nome }}</th>
            <th>{{ service.executadoPeriodo }}</th>
            <th>-</th>
            <th>{{ service.executado }}</th>
            <th>{{ service.area }}</th>
            <th>-</th>
            <th>
              {{ ((service.executado * 100) / service.area).toFixed(2) }}%
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      periodo: {
        startDate: '',
        endDate: '',
      },
    }
  },
  computed: {
    startDate() {
      return this.periodo.startDate
    },
    endDate() {
      return this.periodo.endDate
    },
    ...mapGetters('api', {
      services: 'services',
    }),
    ...mapState('api', {
      obra: (state) => state.obraActive,
    }),
  },
  watch: {
    startDate() {
      this.changeDate()
    },
    endDate() {
      this.changeDate()
    },
  },
  beforeMount() {
    this.getObra(this.$route.params.id)
    this.getDiario(this.$route.params.id)
    this.setPeriodo(this.$route.query)
  },
  methods: {
    changeDate() {
      this.setPeriodo(JSON.parse(JSON.stringify(this.periodo)))
      this.$router.push(
        `/obra/${this.$route.params.id}?startDate=${this.periodo.startDate}&endDate=${this.periodo.endDate}`
      )
    },
    ...mapActions('api', {
      getObra: 'GET_OBRA',
      getDiario: 'GET_DIARIO',
    }),
    ...mapMutations('api', {
      setPeriodo: 'SET_PERIODO',
    }),
  },
}
</script>
<style scoped>
.selecao {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 60px;
}
.relatorio {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.group {
  margin: 0 auto;
}
.my-btn {
  background: green;
  color: white;
  margin-top: 15px;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
}
.container {
  max-width: 1180px;
  margin: 100px auto;
}
.cardObra {
  padding: 15px;
  background: rgba(75, 75, 75, 0.1);
  border-radius: 25px;
}
table,
th,
td {
  border: 1px solid black;
  padding-right: 10px;
  padding-left: 10px;
}
table {
  border-collapse: collapse;
}

tr:nth-child(even) {
  background-color: lightgrey;
}

thead th {
  background-color: skyblue;
}
</style>
