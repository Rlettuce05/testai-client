<template>
  <form>
    <div>
      <v-file-input
        truncate-length="6"
        @change="onUpload()"
      ></v-file-input>
      <v-btn
        color="primary"
        elevation="2"
        large
        @click="callapi()"
      >Click to send image</v-btn>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormImg",
  data: function() {
    return {
      images: "",
    }
  },
  methods: {
    onUpload: function() {
      this.images = event.target.files;
    },
    callapi: function() {
      
    }
  }
}
</script>

<style scoped>

</style>