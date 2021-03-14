export default {
  async GET_OBRAS({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$strapi.find('obras')
      commit('SET_OBRAS', response)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async GET_OBRA({ commit }, obraId) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$strapi.find('obras', { id: obraId })
      commit('SET_OBRA', response[0])
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async GET_DIARIO({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$strapi.find('diarios', { 'obra.id': id })
      commit('SET_DIARIO', response)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async GET_BALANCAS({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$strapi.find('balancas', { 'obra.id': id })
      commit('SET_BALANCAS', response)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
