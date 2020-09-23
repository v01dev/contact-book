<template>
  <div class="card-body">
    <div class="main-info">
      <img src="../assets/avatar.webp" class="avatar" @click="goToDetails(person.id)" />
      <div class="person-info">
        <span>{{ person.firstName }}</span>
        <span>{{ person.lastName }}</span>
      </div>
    </div>
    <p>{{ person.phoneNumber }}</p>
    <button class="delete-button" @click="deletionMode = true">X</button>
    <button class="details-button" @click="goToDetails(person.id)">
      <img src="../assets/eye-solid.svg" style="width:15px; height:15px" />
    </button>
    <div class="delete-overlay" v-if="deletionMode">
      <span>You really want to delete this contact?</span>
      <div class="overlay-buttons">
        <button class="confirm-button" @click="handleDeleteContact(person.id)">Yes</button>
        <button class="abort-button" @click="deletionMode = false">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletionMode: false
    };
  },
  props: {
    person: Object
  },
  methods: {
    handleDeleteContact(id) {
      this.$store.commit("DELETE_CONTACT", id);
    },
    goToDetails(id) {
      this.$router.push("../contact-details/" + id);
    }
  }
};
</script>

<style scoped>
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ccc;
  padding: 10px 45px;
  margin: 15px;
  position: relative;
}
.main-info {
  display: flex;
  align-items: center;
}
.avatar {
  border-radius: 9999px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 1;
}
.person-info {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
.delete-button {
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  background: #e74c3c;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  z-index: 2;
  width: 22px;
  height: 22px;
}
.details-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  bottom: 5px;
  border: none;
  color: inherit;
  cursor: pointer;
  z-index: 2;
  width: 22px;
  height: 22px;
}
.delete-overlay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  color: #ffffff;
}

.overlay-buttons {
  width: 15%;
  display: flex;
  justify-content: space-between;
}

.overlay-buttons button {
  cursor: pointer;
}
@media (max-width: 740px) {
  .card-body {
    padding: 10px 15px;
  }
}

@media (max-width: 450px) {
  .card-body {
    padding: 5px 5px;
    flex-direction: column;
  }
}
</style>
