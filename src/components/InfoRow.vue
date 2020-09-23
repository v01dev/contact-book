<template>
  <div class="relative">
    <span v-if="!editMode">{{ keyName }} : {{ value }}</span>
    <div v-else class="key-value-input">
      <span>{{ keyName }}</span>
      <input type="text" v-model="editValue" />
    </div>
    <div class="key-value-buttons" v-if="keyName != 'id' && !editMode">
      <button @click="editMode = true">Edit</button>
      <button
        @click="deleteOverlay = true"
        v-if="keyName != 'firstName' && keyName != 'lastName'"
      >Delete</button>
    </div>
    <div class="key-value-buttons" v-else-if="editMode">
      <button @click="emitUpdate()">Save</button>
      <button @click="cancelOverlay = true">Cancel</button>
    </div>

    <div class="overlay" v-if="cancelOverlay">
      <p>Are you sure you want to discard changes without saving?</p>
      <div class="overlay-buttons">
        <button @click="cancelEdition()">Yes</button>
        <button @click="cancelOverlay = false">No</button>
      </div>
    </div>

    <div class="overlay" v-if="deleteOverlay">
      <p>Are you sure you want to delete this property?</p>
      <div class="overlay-buttons">
        <button @click="emitDeletion()">Yes</button>
        <button @click="deleteOverlay = false">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoRow",
  data() {
    return {
      editMode: false,
      cancelOverlay: false,
      deleteOverlay: false,
      editValue: ""
    };
  },
  props: {
    keyName: String,
    value: String
  },
  methods: {
    emitDeletion() {
      this.$emit("deleteKeyValuePair", this.name); //Passing this key name to handle deletion in parent component
      this.deleteOverlay = false;
    },
    emitUpdate() {
      let payload = {
        key: this.keyName,
        initialValue: this.value,
        value: this.editValue //Payload to handle update in parent component
      };
      this.$emit("updateKey", payload);
      this.editMode = false;
    },
    cancelEdition() {
      this.editMode = false;
      this.cancelOverlay = false;
      this.editValue = this.value; //Reset input value
    }
  },
  mounted() {
    this.editValue = this.value; //Passing key value to input string
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
.key-value-input input {
  margin-left: 10px;
}
.key-value-buttons button {
  margin-left: 10px;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.overlay-buttons button {
  margin: 5px;
}
@media (max-width: 500px) {
  .key-value-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .key-value-input input {
    margin-left: 0;
    margin-top: 10px;
  }
  .key-value-buttons {
    display: flex;
    flex-direction: column;
  }
  .key-value-buttons button {
    margin: 5px;
  }
}
</style>