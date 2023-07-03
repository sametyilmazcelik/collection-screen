<script>
  import TailwindCss from './lib/TailwindCss.svelte';
  import Navbar from './components/Navbars/Navbar.svelte';
  import Headers from './components/Headers/Headers.svelte';

  import Router from  'svelte-spa-router';
  import routes from './routes';
  console.log(routes)
</script>
<TailwindCss/>


<div class="min-h-full">
  <Navbar />
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Router {routes}/>
    </div>
  </main>
</div>