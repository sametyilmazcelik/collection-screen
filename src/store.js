import { writable, derived } from 'svelte/store';

export const selectedOptionStore = writable('');

export const apiData = writable([]);

export const orderIds = derived(apiData, ($apiData) => {
    console.log($apiData);
    if ($apiData){
      return $apiData.map(drink => drink.order_id);
    }
    return [];
  });