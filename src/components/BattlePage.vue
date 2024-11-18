<template>
  <div style="background-color: purple" class="text-center">
    <h1 style="color: white; text-transform: uppercase" class="py-4">
      Fokemon
    </h1>
  </div>


  <div v-if="!isimGirdimi" class="text-center mt-16">
    <h2 style="color: white">Lütfen Adınızı Girin:</h2> 
    <input type="text" v-model="oyuncuIsmi" placeholder="Adınızı girin" /> <!-- kullanıcının ismini istediğimiz ve girmesi gereken yer -->
    <v-btn @click="startGame" color="purple" variant="tonal">Başla</v-btn> <!-- başla butonuna basınca startgame fonksiyoınu çalışacak ve değer true ise oyun başlayacak false ise başlamayacak -->
  </div>


  <div v-else class="mt-16 mx-10">
    <div id="Oyuncu">
      <h2 class="text-center">{{ oyuncuIsmi }}</h2> <!-- kullanıcının girdiği isimini burda gösteriyoruz -->
      <v-progress-linear v-model="oyuncu.can" color="blue" height="40">
        <span style="font-size: 25px; font-weight: bold; color: black">{{ oyuncu.can }}</span> <!-- kullanıcının canını da burada -->
      </v-progress-linear>
    </div>

    <div id="Canavar" class="mt-6">
      <h2 class="text-center">Canavar</h2>
      <v-progress-linear v-model="canavar.can" color="blue" height="40">
        <span style="font-size: 25px; font-weight: bold; color: black">{{ canavar.can }}</span> <!-- Canavarın canı burada görünüyor -->
      </v-progress-linear>
    </div>

    <!-- Oyun Devam Ediyorsa Butonlar Görünür -->
    <section v-if="!oyunBittimi" class="mt-16">
      <v-btn block variant="tonal" class="mt-1" @click="AtakYap">
        Atak Yap
      </v-btn>
      <v-btn block variant="tonal" class="mt-1" @click="PotBas">
        Pot Bas
      </v-btn>
      <v-btn
        block
        variant="tonal"
        class="mt-1"
        @click="OzelAtakYap"
        :disabled="turSayisi % 3 === 0 ? false : true" 
      >
        Özel Atak Yap
      </v-btn>
    </section>

    <!-- Oyun Bittiğinde Görünecek Mesaj -->
    <section v-else class="text-center mt-16">
      <h2 v-if="oyuncu.can <= 0">GAME OVER!</h2> 
      <h2 v-else>BRAVO KAZANDINIZ!</h2> 
      <v-btn @click="OyunuBaslat" color="purple" variant="tonal">
        Yeniden Başlayalımmı ?
      </v-btn>
    </section>

    <!-- Savaş Kayıtları -->
    <div class="mt-10 text-center">
      <h3>Savaş Kayıtları</h3>

      <p v-for="(SavaşKaydı, index) in savaşKayıtları" :key="index">
        {{ SavaşKaydı }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const oyuncuIsmi = ref(""); // kullanıcı ismi bu kod sayesindef hafızada tutuluyor
const isimGirdimi = ref(false); // kullanıcı adı girilip girilmediğini kontrol ediyor bu değer isim girilince true olup startgame foknsiyonuna gönderip oyuna girmemizi sağlıyor

var turSayisi = ref(0); 
var oyunBittimi = ref(false); 

var oyuncu = ref({
  can: 100,
  saldırıGücü: 100,
});

var canavar = ref({
  can: 100,
  saldırıGücü: 100,
});

var savaşKayıtları = ref([]);


function AtakYap(min, max) {
  if (min === undefined || max === undefined) {
    min = 5;
    max = 10;
  }
  var hasar = RandomNumber(min, max);
  canavar.value.can -= hasar;
  CanavarAtak();
  turSayisi.value++;

  savaşKayıtları.value.push(`${oyuncuIsmi}, Canavara ${hasar} hasar verdi`);

  if (oyuncu.value.can <= 0) {
    oyuncu.value.can = 0;
    oyunBittimi.value = true; 
    savaşKayıtları.value.push("Oyuncu öldü, oyun bitti");
  }

  if (canavar.value.can <= 0) {
    canavar.value.can = 0;
    oyunBittimi.value = true; 
    savaşKayıtları.value.push("Canavar öldü, oyuncu kazandı");
  }
}


function CanavarAtak() {
  var hasar = RandomNumber(6, 10);
  oyuncu.value.can -= hasar;
  savaşKayıtları.value.push(`Canavar, Oyuncuya ${hasar} hasar verdi`);
}


function PotBas() {
  var yenile = RandomNumber(5, 10);
  oyuncu.value.can += yenile;
  CanavarAtak();
  turSayisi.value++; 
  savaşKayıtları.value.push(`Oyuncu ${yenile} can yeniledi`);
}


function OzelAtakYap() {
  AtakYap(10, 20);
}


function OyunuBaslat() {
  oyuncu.value.can = 100;
  canavar.value.can = 100;
  turSayisi.value = 0; 
  oyunBittimi.value = false; 
  savaşKayıtları.value = []; 
}

// kullanıcı adı olmadan oyuna erişim engeli 
function startGame() {
  if (oyuncuIsmi.value === '') {
    alert("Lütfen bir isim girin!"); // İsim girilmez ise üst barda hata mesajı gönderen kod
    return; // isim girilmeden oyunun başlamasına engel olan kod
  }
  isimGirdimi.value = true; // İsim girildiyse oyunu başlatan kod
}

// Rastgele Sayı Üretme
function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
</script>

<style lang="scss" scoped></style>
