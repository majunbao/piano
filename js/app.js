// var sources = {
//   src: 'piano'
// }




// var playaudio = function(soundName) {
//   var audioContext = new(window.AudioContext || window.webkitAudioContext);
//   var audiosBuffer = {};
//   audioContext.decodeAudioData();
// }

// var init = function() {



//   // 载入声音
//   for (var i = 0; i < pianoKeys.length; i++) {
//     loadSound(pianoKeys[i], function() {

//     })
//   }

//   // 准备声音


// }

var audioContext = new(window.AudioContext || window.webkitAudioContext);

// 音名
var audioNames = [
  'A0', '#A0', 'B0',
  'C1', '#C1', 'D1', '#D1', 'E1', 'F1', '#F1', 'G1', '#G1', 'A1', '#A1', 'B1',
  'C2', '#C2', 'D2', '#D2', 'E2', 'F2', '#F2', 'G2', '#G2', 'A2', '#A2', 'B2',
  'C3', '#C3', 'D3', '#D3', 'E3', 'F3', '#F3', 'G3', '#G3', 'A3', '#A3', 'B3',
  'C4', '#C4', 'D4', '#D4', 'E4', 'F4', '#F4', 'G4', '#G4', 'A4', '#A4', 'B4',
  'C5', '#C5', 'D5', '#D5', 'E5', 'F5', '#F5', 'G5', '#G5', 'A5', '#A5', 'B5',
  'C6', '#C6', 'D6', '#D6', 'E6', 'F6', '#F6', 'G6', '#G6', 'A6', '#A6', 'B6',
  'C7', '#C7', 'D7', '#D7', 'E7', 'F7', '#F7', 'G7', '#G7', 'A7', '#A7', 'B7',
  'C8'
];


// audios{
// #A0 {
// src: 'piain/#A/#A0.mp3',
// buffer: {object}
// }

// }
var audios = (function() {
  var _audios = {};
  // var length = audioNames.length;
  // var i = 0;
  // _loadaudio(audioNames[i], function() {
  //   var name = audioNames[i];
  //   var src = 'piano' + '/' + name.replace(/[0-9]/, '') + '/' + name + '.mp3';
  //   _audios[name].src = src;
  //   _audios[name].buffer = this.response;
  // });

  // for (var i = 0; i < audioNames.length; i++) {
  //   var name = audioNames[i];
  //   var src = 'piano' + '/' + name.replace(/[0-9]/, '') + '/' + name + '.mp3';
  //   _audios[name] = {};
  // }
  // var i = 0;
  //   _loadaudio(audioNames[i], function(){
  //     console.log(this)

  //   })
  var i = 0;

  function _loadaudio(audioFile) {
    var src = 'piano' + '/' + audioFile.replace(/[0-9]/, '') + '/' + audioFile + '.mp3';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(event) {
      i++;
      if (i < audioNames.length) {
        var name = audioNames[i];
        _audios[name] = {};
        _audios[name].src = src;
        console.log(this)
        audioContext.decodeAudioData(this.response, function(buffer){
          // _audios[name].audiobuffer = buffer;
          // _loadaudio(name);
        },function(err){
          // console.log(err)
        })
      } else {
        console.log('ok')
      }

    };
    xhr.send();
  }
  _loadaudio(audioNames[0])
  return _audios;
})()

// // 声音文件列表
// var audioFiles = (function() {
//   var _audioFiles = [];
//   for (var i = 0; i < audioNames.length; i++) {
//     var name = audioNames[i];
//     var url = 'piano' + '/' + name.replace(/[0-9]/, '') + '/' + name + '.mp3';
//     _audioFiles.push(url);
//   }
//   return _audioFiles;
// })()

// // 准备声音
// var audioBuffers = (function() {
//   var _audioFiles = [];
//   for (var i = 0; i < audioNames.length; i++) {
//     var name = audioNames[i];
//     var url = 'piano' + '/' + name.replace(/[0-9]/, '') + '/' + name + '.mp3';
//     _audioFiles.push(url);
//   }
//   var _audioBuffers = [];
//   for (var i = 0; i < audioFiles.length; i++) {
//     _loadaudio(audioFiles[i], function() {
//       _audioBuffers.push(this.response);
//     })
//   };

//   return _audioBuffers;
// })()


// 私有方法
var i = 0;

function _loadaudio(audioFile) {
  var src = 'piano' + '/' + audioFile.replace(/[0-9]/, '') + '/' + audioFile + '.mp3';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', src, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(event) {
    i++;
    if (i < audioNames.length) {
      _loadaudio(audioNames[i]);
    } else {
      console.log('ok')
    }

  };
  xhr.send();
}
