import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        id: "1",
        firstName: "Viacheslav",
        lastName: "Sierhieiev",
        phoneNumber: "+380990707877",
      },
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+380990707878",
      },
      {
        id: "3",
        firstName: "Viacheslav",
        lastName: "Sierhieiev",
        phoneNumber: "+380990707879",
      },
      {
        id: "4",
        firstName: "Viacheslav",
        lastName: "Sierhieiev",
        phoneNumber: "+380990707870",
      },
      {
        id: "5",
        firstName: "Viacheslav",
        lastName: "Sierhieiev",
        phoneNumber: "+380990707875",
      },
    ],
  },
  mutations: {
    ADD_CONTACT(state, payload) {
      state.contacts.push(payload);
    },
    DELETE_CONTACT(state, id) {
      state.contacts = state.contacts.filter((contact) => contact.id != id);
    },
    ADD_PROPERTY(state, payload) {
      let updateIndex = state.contacts.findIndex(
        (contact) => contact.id == payload.id
      );
      state.contacts[updateIndex][payload.key] = payload.value; //Setting existing object key or creating a new one
    },
    DELETE_PROPERTY(state, payload) {
      let updateIndex = state.contacts.findIndex(
        (contact) => contact.id == payload.id
      );
      delete state.contacts[updateIndex][payload.key]; //Removing object key
    },
  },
  actions: {},
  modules: {},
});
