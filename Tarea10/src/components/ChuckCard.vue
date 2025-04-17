<template>
    <div class="col-md-4 mb-4">
      <div class="card h-100 chuck-card">
        <img 
          :src="icon_url" 
          class="card-img-top chuck-image" 
          alt="Chuck Norris"
        >
        <div class="card-body">
          <p class="card-text">{{ value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChuckCard',
    props: {
      icon_url: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .chuck-card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .chuck-card:hover {
    transform: translateY(-5px);
  }
  
  .chuck-image {
    height: 200px;
    object-fit: cover;
    border-bottom: 3px solid #d9534f;
  }
  
  .card-body {
    background-color: #f8f9fa;
  }
  
  .card-text {
    font-size: 1rem;
    color: #333;
  }
  </style>