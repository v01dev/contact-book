<template>
  <div class="wrapper">
    <div class="contact-list">
      <button class="add-button" @click="createMode = true">+</button>
      <contact-card v-for="i in contacts" :person="i" :key="i.id"></contact-card>
    </div>
    <create-contact v-if="createMode" @closeModal="createMode = false"></create-contact>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard";
import CreateContact from "@/components/CreateContact";
export default {
  name: "ContactList",
  data() {
    return {
      createMode: false
    };
  },
  components: {
    ContactCard,
    CreateContact
  },
  computed: {
    contacts() {
      return this.$store.state.contacts; //Getting current contact list
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  position: relative;
}
.contact-list {
  width: 60%;
  min-width: 300px;
  max-width: 900px;
}
.add-button {
  position: fixed;
  right: 5px;
  top: 5px;
  border: none;
  background: #16e00f;
  color: #ffffff;
  font-size: 35px;
  cursor: pointer;
  width: 40px;
  height: 40px;
}
@media (max-width: 740px) {
  .contact-list {
    width: 80%;
  }
}
@media (max-width: 380px) {
  .add-button {
    left: 5px;
    z-index: 6;
  }
}
</style>
