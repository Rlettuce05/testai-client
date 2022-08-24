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
  name: "FormImg"
}
</script>

<style scoped>

</style>