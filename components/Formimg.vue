<template>
  <form>
    <div>
      <p>png only</p>
      <v-file-input
        truncate-length="6"
        accept="image/png"
        @change="roadimg()"
      ></v-file-input>
      <v-btn
        color="primary"
        elevation="2"
        large
        @click="callapi()"
      >Click to upload</v-btn>
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
    resizeimg: function(imageData) {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imageData, 0, 0, 32, 32);
      return canvas.toDataURL('image/png')
    },
    roadimg: function(e) {
      this.images = event.target.files;
      let reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        const resizedImgData = resizeimg(imgData);
        this.images = resizedImgData;
      };
    },
    callapi: function() {
      let formData = new FormData
      formData.append('image', this.images);
      this.$axios.$post('http://127.0.0.1:5042/api/predict',
      formData,
      ).then((response) => {this.$store.commit('setPredictLabel', response.data.result)})
      .catch((e)=>{console.log(e)})
    }
  }
}
</script>

<style scoped>

</style>