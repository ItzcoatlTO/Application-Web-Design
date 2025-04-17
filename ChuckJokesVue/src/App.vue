<template>
  <div class="app">
    <h1 class="title">Datos curiosos Chuck Norris </h1>
    <div class="facts-container">
      <div 
        v-for="(fact, index) in chuckFacts" 
        :key="index" 
        class="fact-card"
        :class="{'odd-card': index % 2, 'even-card': !(index % 2)}"
      >
        <p class="fact-text">🔥 {{ fact.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      chuckFacts: [
        { "value": "Chuck Norris puede saltar en paracaídas al espacio exterior." },
        { "value": "El principal producto de Chuck Norris es el dolor." },
        { "value": "Chuck Norris no lee libros. Los mira fijamente hasta que obtiene la información que quiere." },
        { "value": "El tiempo no espera a nadie. A menos que ese hombre sea Chuck Norris." },
        { "value": "Si escribes Chuck Norris en Scrabble, ganas. Para siempre." }
      ]
    }
  }
}
</script>