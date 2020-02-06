new Vue({
  el: "#app-video-show",

  data: {
    //Youtube Player関連プロパティ
    player: {},
    startTime: "",
    endTime: "",
    isStarting: true,
    isEnding: false,
    sceneTags: "",
    tagStored: false,
    isAjaxError: false,
    isTagInputError: false,
    isTimeInputError: false,
    //タグ関連プロパティ
    tags: tagArray,
  },

  methods: {
    //タグ開始ボタン
    start(e) {
      e.preventDefault();
      player.playVideo();
      this.startTime = this.formatTime(player.getCurrentTime());
      this.isStarting = false;
      this.isEnding = true;
    },
    //タブ終了ボタン
    end(e) {
      e.preventDefault();
      this.endTime = this.formatTime(player.getCurrentTime());
      this.isEnding = false;
      this.isStarting = true;
      player.pauseVideo();
    },
    //保存ボタン
    save(e) {
      e.preventDefault();
      //保存時のバリデーション
      if (this.tagTimeValidate()) {
        console.log("時間のvalidation OK");
        if (this.tagNameValidate()) {
          console.log("タグ名のvalidation OK");
          this.submit(e);
          if (this.error == "") {
            console.log("タグを保存しました");
          }
        } else {
          this.isTagInputError = true;
        }
      } else {
        this.isTimeInputError = true;
      }
    },
    //ajax保存処理
    submit(e) {
      var self = this;
      var params = {
        video_id: e.currentTarget.getAttribute("data-video-id"),
        user_id: e.currentTarget.getAttribute("data-user-id"),
        tags: this.sceneTags,
        start: this.startTime,
        end: this.endTime
      };
      this.errors = {};

      axios
        .post("/tag/store", params)
        .then(function(response) {
          //成功した時
          self.tagStored = true;
          self.sceneTags = "";
          self.startTime = "";
          self.endTime = "";
          self.isTimeInputError = false;
          self.isTagInputError = false;
          self.isAjaxError = false;
          player.playVideo();
        })
        .catch(function(error) {
          self.isAjaxError = true;
          console.log("ajax通信失敗");
          console.log(error);
        });
    },
    //playerが取得した時間を「分:秒」に整形
    formatTime(time) {
      time = Math.round(time);
      var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return minutes + ":" + seconds;
    },
    //開始・終了時間のバリデーション
    tagTimeValidate() {
      //空白チェック
      if (this.startTime == "" || this.endTime == "") {
        return false;
      }

      //時刻型かチェック
      if (
        !this.startTime.match(/^\d{1,2}\:\d{1,2}$/) ||
        !this.endTime.match(/^\d{1,2}\:\d{1,2}$/)
      ) {
        return false;
      }

      //再生時間内かチェック
      let duration = this.formatTime(player.getDuration());
      let durationSec = this.convertToSec(duration);
      let startSec = this.convertToSec(this.startTime);
      let endSec = this.convertToSec(this.endTime);

      if (
        startSec < 0 ||
        endSec < 0 ||
        startSec > durationSec ||
        endSec > durationSec
      ) {
        return false;
      }
      //開始より終了のが後かチェック
      if (startSec > endSec) {
        return false;
      }

      return true;
    },
    //タグ名のバリデーション
    tagNameValidate() {
      if (
        !this.sceneTags.match(
          /^[＃|#|♯][ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*(?:[\s| |　]+[＃|#|♯][ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]+)*[\s| |　]*$/u
        )
      ) {
        return false;
      }

      return true;
    },
    //秒数に変換
    convertToSec(timeMinSec) {
      return (
        parseInt(timeMinSec.split(":")[0], 10) * 60 +
        parseInt(timeMinSec.split(":")[1], 10)
      );
    }
  },
  mounted: function() {
    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      console.log("onYouTubeIframeAPIReadyを呼び出し");
      self.player = new YT.Player("iframeBox", {
        playerVars: {
          color: "white"
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };

    window.onPlayerReady = event => {
      event.target.mute();
      event.target.playVideo();
    };

    window.onPlayerStateChange = event => {};

    //DOM更新後にこのコードに到達する
    this.$nextTick(() => {
      player = new YT.Player("iframeBox", {
        playerVars: {
          color: "white"
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });

      player.mute();
      player.playVideo();
    });
  }
});
