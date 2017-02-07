<template>
  <div id="app">
    <generator></generator>
    <footer id="footer">
      <div class="container">
        <p>This site created by <a href="http://cherepovskiy.com">Andrey Cherepovskiy</a></p>
        <p><a href="https://polyfill.io/">Polyfill.io</a> service created by Jonathan Neal,
        The Financial Times Ltd and other <a href="https://github.com/Financial-Times/polyfill-service/graphs/contributors"></a>contributors</a>. FT and 'Financial Times' are trademarks of
        The Financial Times Ltd</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import Generator from './components/Generator';

  export default {
    name: 'app',
    components: {
      Generator,
    },
  };

</script>

<style>
  .float-right {
    float: right
  }
  
  * {
    box-sizing: border-box
  }
  
  html,
  body {
    padding: 0
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  footer#footer {
    padding: 10px;
    background: #333;
    color: #fff;
  }
  
  footer#footer a {
    color: #93cdff;
  }

</style>
