<template>
  <form>
    <div>
      <v-file-input
        truncate-length="6"
        @change="onUpload()"
      ></v-file-input>
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
    }
  }
}
</script>

<style scoped>

</style>