<template>
  <form>
    <div>
      <p>信号を検出し，色を見分けます.</p>
      <p style="font-size: small">(学習には主にポーランドの画像を用いたため，日本の信号機は(ほぼ検出が不可能なほど)精度が落ちます．)</p>
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
  
    <div v-if="this.processing">
      <h2>実行中です…</h2>
    </div>
    <div v-if="this.result">
      <img :src="predictedBase64data" alt="result" />
      <p>予測結果: {{predictLabel}}</p>
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
      predictedBase64data: "",
      processing: "",
      predictLabel: "",
      result: ""
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
        canvas.width = 945;
        canvas.height = 531;
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = imgData;
        img.onload = () => {
          var width = img.naturalWidth;
		      var height = img.naturalHeight;
          console.log(width+","+height);
          ctx.drawImage(img, 0, 0, width, height, 0, 0, 945, 531);
          this.resizedImgData = canvas.toDataURL('image/png');
          console.log(this.resizedImgData);
        }
      }
      reader.readAsDataURL(this.image);
      }
    },
    callapi: function() {
      if(this.resizedImgData){
      this.processing = true;
      this.$axios.$post('http://localhost:5042/api/predict',
      {"img": this.resizedImgData},
      ).then((response) => {this.predictedBase64data = "data:image/png;base64," + response.result.result; this.predictLabel = response.result.label;}
      ).then(() => {console.log(this.predictedBase64data);}
      ).then(() => {this.processing = false; this.result = true;}
      )
      }else{
        alert("画像を選択してください．");
      }
    },
    greeting: function() {
      this.$axios.$post('http://localhost:5042/api/greeting/RLettuce',)
      .then((response) => {console.log(response.result)})
    }
  }
}
</script>

<style scoped>

</style>
