export const environment = {
  production: false,
  apiBaseVotaciones:'https://censo-electoral-dev.universidadean.edu.co/api/',
  ApiBaseGraduados:'https://graduados-dev.universidadean.edu.co/api',
  validaEstudiante:'/validacion/existe-estudiante/',
  posiblesCarreras:'/validacion/carreras-grado/',
  posiblesAniosGrado:'/validacion/anyos-grado/',
  validaRespuestasRecuperaClave:'/validacion/valida-respuestas/',
  registraNotificaRecuperaClave:'/validacion/actualiza-datos-contacto/',
  url: "https://consultacertificados-dev.universidadean.edu.co/api/Consulta/",
  votantesHabilitadosApi:'votaciones/',
  getTokenVotacionesApi:'api-token-auth/',
  userTokenVotaciones:'censo_electoral_user',
  passTokenVotaciones:'FA6E843522',
  recaptcha: {
    siteKey: '6LcQjAEiAAAAAL9yBVeqzeLPOvuS_hKIz_WXeg0o',
  }
};
