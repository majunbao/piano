var audioContext = new(window.AudioContext || window.webkitAudioContext);

// 音名
var audioNames = [
  'A0', 'Bb0', 'B0',
  'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
  'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
  'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
  'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
  'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
  'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
  'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
  'C8'
];

// audios 对象
//pro buffer
//pro src
var audios = (function() {
  var _audios = {};
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

        audioContext.decodeAudioData(this.response, function(buffer) {
          _audios[name].buffer = buffer;
          loding(i)
          _loadaudio(name);
        }, function(err) {
          console.log(err)
        })
      } else {
        main()
      }
    };
    xhr.send();
  }
  _loadaudio(audioNames[0])
  return _audios;
})()

var playaudio = function(soundName) {
  sources = audioContext.createBufferSource();
  sources.loop = false;
  sources.connect(audioContext.destination);
  sources.buffer = audios[soundName].buffer
  sources.start(); //立即播放
}

var play = function(music) {
  if (typeof music === 'string') {
    playaudio(music);
  } else if (music instanceof Array) {
    for (var i = 0; i < music.length; i++) {
      (function() {
        var j = i;
        setTimeout(function() {
          playaudio(music[j]);
          console.log(j)
        }, i * 300)
      })()
    }
  }
}

// 载入过程中不断调用
function loding(progress){
  document.body.innerHTML = Math.round(((progress+1)/audioNames.length)*100) + '%';
}

// 文件准备就绪后 自动执行 main 函数
function main(){
  var music = ['C8','A3','A2','A1','A3','C8','B3'];
  play(music);
}