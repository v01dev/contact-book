import Vue from "vue";
import VueRouter from "vue-router";
import ContactList from "../views/ContactList.vue";
import ContactDetails from "../views/ContactDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ContactList",
    component: ContactList,
  },
  {
    path: "/contact-details/:id",
    name: "ContactDetails",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContactDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
