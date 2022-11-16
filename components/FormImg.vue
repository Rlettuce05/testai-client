<template>
  <form>
    <div>
      <p>10種類の画像（飛行機, 自動車, 鳥, 猫, 鹿, 犬, カエル, 馬, 船, トラック）を見分けます.</p>
      <v-file-input
        truncate-length="6"
        accept="image/*"
        @change="roadimg()"
      ></v-file-input>
      <v-btn
        color="primary"
        elevation="2"
        large
        @click="callapi()"
      >Predict</v-btn>
    </div>
    <v-btn
      color="primary"
      elevation="2"
      @click="greeting()"
    >Connection test</v-btn>
    <div>
      これは{{this.predictLabel}}です
    </div>
  </form>
</template>

<script>
export default {
  name: "FormImg",
  data: function() {
    return {
      image: "",
      resizedImgData: "",
      predictLabel: ""
    }
  },
  methods: {
    roadimg: function(e) {
      if(event.target.files){
      this.image = event.target.files[0];
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
      }
    },
    callapi: function() {
      this.$axios.$post('https://testaiweb-server.herokuapp.com/api/predict',
      {"img": this.resizedImgData},
      ).then((response) => {this.predictLabel = response.result}
      ).then(() => {console.log(this.predictLabel)})
    },
    greeting: function() {
      this.$axios.$post('https://testaiweb-server.herokuapp.com/api/greeting/RLettuce',)
      .then((response) => {console.log(response.result)})
    }
  }
}
</script>

<style scoped>

</style>
