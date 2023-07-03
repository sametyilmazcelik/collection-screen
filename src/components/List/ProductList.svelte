<script>
    import { onMount, setContext } from 'svelte';
    import ProductListFilter from '../Dropdowns/ProductListDropdown.svelte';
    import { selectedOptionStore, apiData, orderIds } from '../../store';
    
  
    let responseData = [];
  
    const fetchData = async (selectedOption) => {
      try {
        const response = await fetch('https://ea48-85-105-12-25.ngrok-free.app/api/get-orders', {
          method: 'POST',
          headers: { "ngrok-skip-browser-warning": "any" },
          body: new URLSearchParams({ statu_id: selectedOption }),
        });
        responseData = await response.json();
        apiData.set(responseData);
        
      } catch (error) {
        console.error('POST isteği sırasında bir hata oluştu:', error);
      }
    };
  
    let selectedOption;
    selectedOptionStore.subscribe(value => {
      selectedOption = value;
      fetchData(selectedOption);
    });
  
    // İsteği ilk kez yükle
    onMount(() => {
      fetchData(selectedOption);
      console.log("onMount:" +selectedOption)
    });
  
    // ProductListFilter bileşenine selectedOption değerini iletmek için bağlamı ayarla
    setContext('selectedOption', selectedOption);
  </script>
    	<!-- <ul>
            {#each $orderIds as orderId}
                <li>{orderId}</li>
            {/each}
        </ul> -->
  
    <div class="container mx-auto">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Sipariş Kargo Durumları</h2>
            </div>
            <ProductListFilter />
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Sipariş No
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ödeme Tipi
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Fiyat
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Sipariş Durumu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if responseData.length > 0}
                                {#each responseData as data}
                                <tr>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {data.order_code}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{data.order_date}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {data.payment_type}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            ₺{(data.order_total_price / 1).toFixed(2)}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span
                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative" data-statusId="{data.order_status_id}">{data.order_status_name}</span>
                                        </span>
                                    </td>
                                </tr>
                                {/each}
                            {:else}
                                <tr>
                                    <td class="tg-0lax" colspan="5">
                                        <div class="text-center">
                                            <div role="status">
                                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </td>
                                  </tr>
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>