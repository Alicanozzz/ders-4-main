// Kullanıcı Adı Girmeden Oyun Başlamasın

function startGame() {
  if (oyuncuIsmi.value === '') {
    alert("Lütfen bir isim girin!"); // İsim girilmez ise üst barda hata mesajı gönderen kod
    return; // isim girilmeden oyunun başlamasına engel olan kod
  }
  isimGirdimi.value = true; // İsim girildiyse oyunu başlatan kod
}


// Kullanıcı adı hafızada tutma ve fonksiyona yönlendirme
const
 oyuncuIsmi = ref(""); // kullanıcı ismi bu kod sayesindef hafızada tutuluyor
const isimGirdimi = ref(false); // kullanıcı adı girilip girilmediğini kontrol ediyor bu değer isim girilince true olup startgame foknsiyonuna gönderip oyuna girmemizi sağlıyor

// Oyun ekranı
  <div v-else class="mt-16 mx-10">
    <div id="Oyuncu">
      <h2 class="text-center">{{ oyuncuIsmi }}</h2> // kullanıcının girdiği ismi gösteren kod
      <v-progress-linear v-model="oyuncu.can" color="blue" height="40">
        <span style="font-size: 25px; font-weight: bold; color: black">{{ oyuncu.can }}</span> // kullanıcının canı burada görünüyor
      </v-progress-linear>
    </div>

    <div id="Canavar" class="mt-6">
      <h2 class="text-center">Canavar</h2>
      <v-progress-linear v-model="canavar.can" color="blue" height="40">
        <span style="font-size: 25px; font-weight: bold; color: black">{{ canavar.can }}</span> // canavarın canı burada görünüyor
      </v-progress-linear>
    </div>
	
	// İsim girm ekranı
	  <div v-if="!isimGirdimi" class="text-center mt-16">
    <h2 style="color: white">Lütfen Adınızı Girin:</h2> 
    <input type="text" v-model="oyuncuIsmi" placeholder="Adınızı girin" /> // kullancııdan isim girmesini istediğimiz alan
    <v-btn @click="startGame" color="purple" variant="tonal">Başla</v-btn> // startgame fonksiyonu ile bağlantılı çalışan başla butonu eğer değer false ise buton çalışmaz true ise çalışır
  </div>