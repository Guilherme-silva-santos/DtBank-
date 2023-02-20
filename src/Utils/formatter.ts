export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

// O objeto Intl é o namespace para a API de Internacionalização do ECMAScript ,
// que fornece comparação de string sensível à línguagem, formatação de números, e formatação de data e hora

export const priceFormater = new Intl.NumberFormat('pt-BR', {
  style: 'currency', // stilo do tipo moeda
  currency: 'BRL',
})
