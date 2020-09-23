<template>
  <div class="create-contact-overlay">
    <input type="text" v-model="firstName" placeholder="First Name" />
    <input type="text" v-model="lastName" placeholder="Last Name" />
    <input type="text" v-model="phoneNumber" placeholder="Phone Number" />
    <div class="create-contact-buttons">
      <button @click="createContact()" :disabled="disableAdding">Add Contact</button>
      <button @click="$emit('closeModal')">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateContact",
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      id: ""
    };
  },
  methods: {
    generateID() {
      //Generate unique uuidv4
      this.id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    createContact() {
      this.$emit("closeModal");
      let contact = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber //Payload for Vuex mutation
      };
      this.$store.commit("ADD_CONTACT", contact);
    }
  },
  computed: {
    disableAdding() {
      //Simplest validation
      console.log(isNaN(this.phoneNumber));
      return (
        this.firstName.length === 0 ||
        this.lastName.length === 0 ||
        this.phoneNumber.length === 0 ||
        isNaN(this.phoneNumber)
      );
    }
  },
  mounted() {
    this.generateID();
  }
};
</script>

<style scoped>
.create-contact-overlay {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  top: 0;
  padding: 20%;
  box-sizing: border-box;
  z-index: 7;
}
.create-contact-overlay input {
  height: 30px;
  margin: 8px;
}
.create-contact-buttons button {
  margin: 10px;
}
</style>