<template>
  <form>
    <div>
      <v-file-input
        truncate-length="6"
        @change="roadimg()"
      ></v-file-input>
      <v-btn
        color="primary"
        elevation="2"
        large
        @click="callapi()"
      >Predict</v-btn>
    </div>
    <div>
      これは{{this.$store.predictLabel}}です
    </div>
  </form>
</template>

<script>
export default {
  name: "FormImg",
  data: function() {
    return {
      image: "",
      resizedImgData: ""
    }
  },
  methods: {
    roadimg: function(e) {
      this.image = event.target.files[0]
      let reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        console.log(imgData);
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = imgData;
        img.onload = () => {
          var width = img.naturalWidth;
		      var height = img.naturalHeight;
          console.log(width+","+height);
          ctx.drawImage(img, 0, 0, width, height, 0, 0, 32, 32);
          this.resizedImgData = canvas.toDataURL('image/png');
          console.log(this.resizedImgData);
        }
      }
      reader.readAsDataURL(this.image);
    },
    callapi: function() {
      this.$axios.$post('http://127.0.0.1:5042/api/predict',
      {"img": this.resizedImgData},
      ).then((response) => {this.$store.commit('setPredictLabel', response.result)}
      ).then(() => {console.log(this.$store.predictLabel)})
    },
    greeting: function() {
      this.$axios.$post('http://127.0.0.1:5042/api/greeting/RLettuce',)
      .then((response) => {console.log(response.result)})
    }
  }
}
</script>

<style scoped>

</style>