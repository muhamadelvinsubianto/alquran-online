// $.getJSON('https://api.npoint.io/99c279bb173a6e28359c/data', function(data){
//     let hasil = data;
//     $.each(hasil, function(i, data){
//       $('.surat').append(`  <div class="col-md-3 mt-3"><div class="card" s><div class="card-body"><h5 class="card-title">${data.asma}</h5><h6 class="card-subtitle mb-2 text-muted">${data.arti}</h6><p class="card-text">${data.ayat} Ayat</p><a href="#" class="card-link btn btn-outline-primary btn-baca" data-nomor="${data.nomor}">Baca Sekarang</a></div></div></div>`)
    // })
    // })
    // let hasil = data.hasil;
    // $.each(hasil, function(i, data){
    //     
  //  })
//    $.ajax({
//     url: 'https://api.quran.sutanlab.id/surah',
//     success: results => {
//       const surah = results.data;
//       cards = '';
//       surah.forEach(surah => {
//         cards += showCards(surah);
//       });
//       $('.surat').html(cards);
      
//     //    kETIKA TOMBOL DETAIL DI KLIK
//     $('.btn-baca').on('click', function(){
//       $.ajax({
//           url: 'https://api.quran.sutanlab.id/surah/' + $(this).data('number'),
//           success: result => {
//             const ayat = result.data.verses;
//             let modal = '';
//             ayat.forEach(a => {
//               modal += showCardsAyat(a)
//             })
//             $('.modal-body').html(modal);
//           },
//           error: (err)=>{
//            console.log(err.responseText);
//        }
//       })
//    })
//     },
//     error: (err)=>{
//       console.log(err.responseText);
//   }   
// })


// Menggunakan Fetch
// function getSurat(){
//   return fetch('https://api.quran.sutanlab.id/surah')
//   .then(response => response.json())
//   .then(response => {
//     const listSurah = response.data;
//     let cards = '';
//     listSurah.forEach(surah =>{
//       cards += showCards(surah);
//       const surahContainer = document.querySelector('.surah_container')
//       surahContainer.innerHTML = cards;

//       // Ketika tombol detail di kilik
//       const surahData = document.querySelectorAll('.surah_data');
//       surahData.forEach( card => {
//         card.addEventListener('click', function(){
//           const number = this.dataset.number;
//           fetch('https://api.quran.sutanlab.id/surah/' + number)
//           .then(response => response.json())
//           .then(response =>{
//             const data =  response.data.verses;
//             let cards = '';
//             data.forEach( a=>{
//               cards += showCardsAyat(a);
//               const ayatContainer = document.querySelector('.modal-body')
//               ayatContainer.innerHTML = cards;
//             })
//           })
//         })
//       })
//     })
//   })
// }
// getSurat();


// Fetch Async
async function surah(){
  const surah = await getSurat()
  updateUI(surah)
 }

 function getSurat(){
  return fetch('https://api.quran.sutanlab.id/surah')
  .then(response => response.json())
  .then(response => response.data)
}

function updateUI(surah){
  let cards = '';
      surah.forEach(s =>{
        cards += showCards(s);
        const surahContainer = document.querySelector('.surah_container')
        surahContainer.innerHTML = cards;
})
}

// event binding 
document.addEventListener('click', async function(e){
  if(e.target.classList.contains('surah_data')){
    const number = e.target.dataset.number;
    const listAyat =  await getAyat(number);
    updateUIAyat(listAyat);
  }
})

function getAyat(number){
 return fetch('https://api.quran.sutanlab.id/surah/' + number)
            .then(response => response.json())
            .then(a => a.data.verses);

}

function updateUIAyat(ayat){
  let cards = '';
     ayat.forEach( a=>{
     cards += showCardsAyat(a)
     const ayatContainer = document.querySelector('.modal-body')
    ayatContainer.innerHTML = cards;
    })
}
surah();



function showCards(surah){
  return `  <div class="surah_data data" data-bs-toggle="modal" data-bs-target="#exampleModal" data-number="${surah.number}"> 
  <h3 class="surah_title">${surah.name.short}</h3>
  <h3 class="surah_title">${surah.name.transliteration.id}</h3>
  <span class="surah_terjemah">${surah.name.translation.id}</span><br>
  <span class="surah_ayat">${surah.numberOfVerses} Ayat</span>
  <a href="#" class="button surah_button"><i class='bx'>${surah.number}</i></a>
</div>`
}

function showCardsAyat(a){
  return ` <div class="card mt-5">
  <div class="card-header">
    ${a.number.inSurah}
  </div>
  <div class="card-body">
    <h5 class="card-title">${a.text.arab}</h5>
    <p class="card-text mt-4">${a.translation.id}</p>
    <audio controls  controlsList="nodownload" class="mt-4">
    <source src="horse.ogg" type="audio/ogg">
    <source src="${a.audio.primary}" type="audio/mpeg">
  </audio>
  </div>
 
</div>`
}



















































