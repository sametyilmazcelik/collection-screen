<script>
  import { onMount } from 'svelte';
  import { selectedOptionStore } from '../../store';

  let orderStatusData = [];
  export let selectedOption = '';

  onMount(async () => {
    try {
      const orderStatusResponse = await fetch('https://ea48-85-105-12-25.ngrok-free.app/api/get-order-status', {
        method: 'POST',
        headers: {"ngrok-skip-browser-warning": "any"}
      });
      orderStatusData = await orderStatusResponse.json();
    } catch (error) {
      console.error('POST isteği sırasında bir hata oluştu:', error);
    }
  });

  function handleSelectChange(event) {
    selectedOption = event.target.value;
    selectedOptionStore.set(selectedOption);
  }
</script>

<div class="my-2 flex sm:flex-row flex-col">
  <div class="flex flex-row mb-1 sm:mb-0">
    <div class="relative">
      <select on:change={handleSelectChange} class="appearance-none min-w-full h-full rounded border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <option value="">Tüm Durumlar</option>
        {#if orderStatusData.length > 0}
          {#each orderStatusData as data}
            <option value="{data.status_id}">{data.status_name}</option>  
          {/each}
        {/if}
      </select>

      

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</div>

