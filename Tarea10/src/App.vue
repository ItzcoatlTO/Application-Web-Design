<template>
  <div class="container mt-5">
    <h1 class="text-center mb-5">Datos de Chuck Norris</h1>
    
    <div class="row">
      <chuck-card
        v-for="(fact, index) in chuckFacts"
        :key="index"
        :icon_url="fact.icon_url"
        :value="fact.value"
      />
    </div>
  </div>
</template>

<script>
import ChuckCard from './components/ChuckCard.vue'

export default {
  name: 'App',
  components: {
    ChuckCard
  },
  data() {
    return {
      chuckFacts: [
        {
          "icon_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTe2GGcfE_mLxUO9SL73UbUHfv5h9Ds53wA&s",
          "value": "Chuck Norris puede saltar en paracaídas al espacio exterior."
        },
        {
          "icon_url": "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/03/17153319/chuck-norris-1024x576.jpg",
          "value": ".El principal producto de Chuck Norris es el dolor"
        },
        {
          "icon_url": "https://www.publimetro.cl/resizer/v2/GGXXWBDCPBFWFM7GWNXXLSQ3VA.jpg?auth=e767a00efe76f56534714738fa8cecae723d2869e8783de86b629ab47cd781ee&width=800&height=503",
          "value": "Chuck Norris no lee libros. Los mira fijamente hasta que encuentra la información que busca."
        },
        {
          "icon_url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiANJWu1NTpnOo_K6Qweu2hNrtgmtsRxH4X3SYZGnB8IkU0o8RXKN9iP9IckfbpQSwYA3jUMWLqW3AXBTvx-bx2V17KGTynZKnZcM7g94KT_zoC7rj3ijEFLwkXapk4XjouXpNuXg/s1600/chuck_norris_futurama_thumb.png",
          "value": "El tiempo no espera a nadie. A menos que ese hombre sea Chuck Norris."
        },
        {
          "icon_url": "https://i.pinimg.com/736x/66/3b/5c/663b5c90d4c0fcc73c29a63414acc608.jpg",
          "value": "Si deletreas Chuck Norris en Scrabble, ganas. Para siempre."
        }
      ]
    }
  }
}
</script>

<style>
body {
  background-color: #f5f5f5;
  padding-top: 20px;
}

h1 {
  color: #d9534f;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}
</style>