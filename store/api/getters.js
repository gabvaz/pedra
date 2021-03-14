export default {
  services: (state) => {
    const services = []
    if (state.obraActive && state.diario) {
      state.obraActive.servicos.forEach((service) => {
        service.servico.area = 0
        service.servico.executado = 0
        service.servico.executadoPeriodo = 0
        state.obraActive.balancas.forEach((balanca) => {
          balanca.servicosBalanca.forEach((e) => {
            if (e.servico.id === service.servico.id) {
              service.servico.area += e.area
            }
          })
        })
        state.diario.forEach((dia) => {
          if (dia.servico.id === service.servico.id) {
            if (dia.producao) {
              service.servico.executado += parseFloat(
                dia.producao.replace(',', '.')
              )
              if (
                new Date(dia.dia) >= new Date(state.periodo.startDate) &&
                new Date(dia.dia) <= new Date(state.periodo.endDate)
              ) {
                service.servico.executadoPeriodo += parseFloat(
                  dia.producao.replace(',', '.')
                )
              }
            }
          }
        })
        services.push(service.servico)
      })
      return services
    } else {
      return ''
    }
  },
}
