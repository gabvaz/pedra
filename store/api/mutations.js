export default {
  SET_OBRAS(state, payload) {
    state.obras = payload
  },
  SET_OBRA(state, payload) {
    state.obraActive = payload
  },
  SET_DIARIO(state, payload) {
    state.diario = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_BALANCAS(state, payload) {
    state.balancas = payload
  },
  SET_SERVICES(state, payload) {
    state.services = payload
  },
  SET_PERIODO(state, payload) {
    state.periodo = payload
  },
}
