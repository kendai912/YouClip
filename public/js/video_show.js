new Vue({
  el: "#app-video-show",
  data: {
    test: "aaaa"
  },
  methods: {

  },
  mounted() {
    //開始ボタン
    $("#startBtn").on("click", function(e) {
      e.preventDefault();
      player.playVideo();
      $("#startTime").val(formatTime(player.getCurrentTime()));
      $(this).hide();
      $("#endBtn").show();
    });

    //終了ボタン
    $("#endBtn").on("click", function(e) {
      e.preventDefault();
      $("#endTime").val(formatTime(player.getCurrentTime()));
      $(this).hide();
      $("#startBtn").show();
      player.pauseVideo();
    });
  }
});
//----------------------------------------------------
// ファンクション(youtube関連)
//----------------------------------------------------
let player;

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log("script loaded");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("iframeBox", {
    playerVars: {
      color: "white"
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function formatTime(time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  console.log(event);
}

//----------------------------------------------------
// イベント(Youtube関連)
//----------------------------------------------------
// $(function() {

//保存ボタン
// $("#saveBtn").on("click", function (e) {
//   e.preventDefault();
//   //保存時のバリデーション
//   if (tagTimeValidate()) {
//     if (tagNameValidate()) {
//       database.ref(userId + "/" + movieId + "/sceneTags").push({
//         startTime: $("#startTime").val(),
//         endTime: $("#endTime").val(),
//         sceneTags: $("#sceneTags").val()
//       });

//       $("#saveDoneBox")
//         .text(
//           $("#startTime").val() +
//           "〜" +
//           $("#endTime").val() +
//           ": 「" +
//           $("#sceneTags").val() +
//           "」を保存しました"
//         )
//         .fadeIn(2000)
//         .fadeOut(2000);
//       $("#startTime").val("");
//       $("#endTime").val("");
//       $("#sceneTags").val("");
//     } else {
//       $("#saveDoneBox")
//         .text("タグの入力が正しくありません")
//         .fadeIn(2000)
//         .fadeOut(2000);
//     }
//   } else {
//     $("#saveDoneBox")
//       .text("時間の入力が正しくありません")
//       .fadeIn(2000)
//       .fadeOut(2000);
//   }
// });
// });
