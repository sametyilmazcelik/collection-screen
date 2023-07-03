import Home from "./components/Pages/Home.svelte";
import About from "./components/Pages/About.svelte";
import ProductList from "./components/List/ProductList.svelte";

export const routes ={
    '/': Home,
    '/about': About,
    '/productCargoStatus': ProductList
};

// export const routes ={
//     '/': { component: Home, Title: "Anasayfa" },
//     '/about': { component: About, Title: "About" },
//     '/productCargoStatus': { component: ProductList, Title: "Sipariş Durum" }
// };

export default routes;