<template>
  <div class="contact-details" v-if="contactInfo != null">
    <button class="back-button" @click="backToList()">Back To Contact List</button>
    <div class="main-info">
      <div class="left-section">
        <img src="../assets/avatar.webp" class="avatar" />
        <div class="name">
          <span>{{ contactInfo.firstName }}</span>
          <span>{{ contactInfo.lastName }}</span>
        </div>
      </div>
      <div class="phone-number">
        <span>{{ contactInfo.phoneNumber }}</span>
      </div>
    </div>
    <div class="additional-info">
      <div class="info-block add-property">
        <input placeholder="Key" type="text" v-model="key" />
        <input placeholder="Value" type="text" v-model="value" />
        <button
          class="add-button"
          :style="disableButton ? 'opacity: 0.2' : ''"
          @click="addKeyValuePair()"
          :disabled="disableButton"
        >+</button>
      </div>
      <info-row
        class="info-block"
        v-for="(value, name) in contactInfo"
        :key="value"
        :keyName="name"
        :value="value"
        @deleteKeyValuePair="deleteKey(name, value)"
        @updateKey="updateKey"
      ></info-row>
    </div>
    <div class="cancel-buttons" v-if="resetSteps.length > 0">
      <button @click="handleStepBack()">Step Back</button>
      <button @click="handleRevertAll()">Cancel All Changes</button>
    </div>
  </div>
  <div v-else class="empty">
    <p>Contact Does Not Exist</p>
    <button @click="backToList()">Back To Contact List</button>
  </div>
</template>

<script>
import InfoRow from "../components/InfoRow";

export default {
  name: "ContactDetails",
  components: {
    InfoRow
  },
  data() {
    return {
      key: "",
      value: "",
      updateCounter: 0, //Variable to trigger computed property update
      resetSteps: []
    };
  },
  computed: {
    contactInfo() {
      //Getting current contact details
      this.updateCounter;
      return this.$store.state.contacts.find(
        contact => contact.id == this.$route.params.id
      );
    },
    contactKeys() {
      return Object.keys(this.contactInfo);
    },
    disableButton() {
      //Simplest validation
      return (
        this.contactKeys.includes(this.key) ||
        this.key.length == 0 ||
        this.value.length == 0
      );
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: "ContactList" });
    },
    addKeyValuePair() {
      this.resetSteps.unshift({
        id: this.contactInfo.id,
        key: this.key,
        type: "Delete" //Pushing latest operation to array of additions/deletions/editions/
      });
      let pair = {
        //Payload for Vuex mutation
        id: this.contactInfo.id,
        key: this.key,
        value: this.value
      };
      this.$store.commit("ADD_PROPERTY", pair);
      this.value = "";
      this.key = "";
      this.updateCounter++; //Trigger computed property update
    },
    deleteKey(key, value) {
      this.resetSteps.unshift({
        id: this.contactInfo.id,
        key: key,
        value: value,
        type: "Return" //Pushing latest operation to array of additions/deletions/editions/
      });
      console.log(123);
      let deletionInput = {
        //Payload for Vuex mutation
        id: this.contactInfo.id,
        key: key
      };
      console.log(this.$store.state.contacts);
      this.$store.commit("DELETE_PROPERTY", deletionInput);
      console.log(this.$store.state.contacts);
      this.updateCounter++; //Trigger computed property update
    },
    updateKey(payload) {
      this.resetSteps.unshift({
        id: this.contactInfo.id,
        key: payload.key,
        value: payload.initialValue,
        type: "Revert" //Pushing latest operation to array of additions/deletions/editions/
      });

      let pair = {
        //Payload for Vuex mutation
        id: this.contactInfo.id,
        key: payload.key,
        value: payload.value
      };
      this.$store.commit("ADD_PROPERTY", pair);
      this.updateCounter++; //Trigger computed property update
    },
    handleStepBack() {
      let action = this.resetSteps[0];
      if (action.type === "Delete") {
        this.$store.commit("DELETE_PROPERTY", action);
      } else this.$store.commit("ADD_PROPERTY", action);
      this.resetSteps.splice(0, 1);
      this.updateCounter++; //Trigger computed property update
    },
    handleRevertAll() {
      this.resetSteps.forEach(action => {
        if (action.type === "Delete") {
          this.$store.commit("DELETE_PROPERTY", action);
        } else this.$store.commit("ADD_PROPERTY", action);
      });
      this.resetSteps = [];
      this.updateCounter++; //Trigger computed property update
    }
  }
};
</script>

<style scoped>
.contact-details {
  margin: 0 auto;
  width: 60%;
  max-width: 1200px;
  min-width: 300px;
}
.empty {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
.back-button {
  margin: 20px;
}
.left-section {
  display: flex;
  align-items: center;
}
.main-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #d0d0d0;
}
.additional-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
}
.avatar {
  border-radius: 9999px;
  width: 120px;
  height: 120px;
  background-color: #ffffff;
}
.name {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.name span {
  margin: 2px;
}

.info-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #d0d0d0;
  height: 90px;
}

.add-property {
  display: flex;
  justify-content: space-around;
}
.add-button {
  border: none;
  background: #16e00f;
  color: #ffffff;
  font-size: 35px;
  cursor: pointer;
  width: 40px;
  height: 40px;
}
.key-value-buttons button {
  margin-left: 10px;
}
.cancel-buttons {
  margin-top: 15px;
}
.cancel-buttons button {
  margin: 10px;
}
@media (max-width: 500px) {
  .info-block {
    height: 120px;
  }
  .add-property {
    flex-direction: column;
    height: 120px;
  }
}
@media (max-width: 350px) {
  .left-section {
    flex-direction: column;
  }
  .phone-number {
    margin: 10px;
  }
}
</style>
