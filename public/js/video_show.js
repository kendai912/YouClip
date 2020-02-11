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
    currentTagIndex: ""
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
    //タグ終了ボタン
    end(e) {
      e.preventDefault();
      this.endTime = this.formatTime(player.getCurrentTime());
      this.isEnding = false;
      this.isStarting = true;
      player.pauseVideo();
    },
    //タグ保存ボタン
    save(e) {
      e.preventDefault();

      //保存時のバリデーション
      if (!this.tagTimeValidate(this.startTime, this.endTime)) {
        this.isTimeInputError = true;
        return;
      } else {
        console.log("時間のvalidation OK");
        this.isTimeInputError = false;
      }
      if (!this.tagNameValidate(this.sceneTags)) {
        this.isTagInputError = true;
        return;
      } else {
        console.log("タグ名のvalidation OK");
        this.isTagInputError = false;
      }

      //保存処理
      this.submit(e);
      if (this.error == "") {
        console.log("タグを保存しました");
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
          //tags配列プロパティの末尾に追加
          let data = response.data.data;
          self.tags.push({
            tag_id: data.id,
            video_id: data.video_id,
            user_id: data.user_id,
            tagName: data.tags,
            start: data.start,
            end: data.end,
            created_at: data.created_at,
            updated_at: data.updated_at,
            isEditMode: false,
            isTimeInputError: false,
            isTagInputError: false,
            isEditAjaxError: false,
            isDeleteAjaxError: false
          });
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
    tagTimeValidate(start, end) {
      //空白チェック
      if (start == "" || end == "") {
        return false;
      }

      //時刻型かチェック
      if (
        !start.match(/^\d{1,2}\:\d{1,2}$/) ||
        !end.match(/^\d{1,2}\:\d{1,2}$/)
      ) {
        return false;
      }

      //再生時間内かチェック
      let duration = this.formatTime(player.getDuration());
      let durationSec = this.convertToSec(duration);
      let startSec = this.convertToSec(start);
      let endSec = this.convertToSec(end);

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
    tagNameValidate(sceneTags) {
      if (
        !sceneTags.match(
          /^[＃|#|♯][ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*(?:[\s| |　]+[＃|#|♯][ｦ-ﾟー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]+)*[\s| |　]*$/u
        )
      ) {
        return false;
      }

      return true;
    },
    //秒数に変換
    convertToSec(is) {
      return (
        parseInt(is.split(":")[0], 10) * 60 + parseInt(is.split(":")[1], 10)
      );
    },
    //i:sにフォーマット
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    },
    //タグの編集
    editTag(e) {
      let index = e.currentTarget.getAttribute("data-tag-index");
      this.currentTagIndex = index;
      this.tags[index].isEditMode = true;
      this.tags[index].start = this.formatToMinSec(this.tags[index].start);
      this.tags[index].end = this.formatToMinSec(this.tags[index].end);
    },
    //タグの更新処理
    updateTag(e) {
      var self = this;
      var index = e.currentTarget.getAttribute("data-tag-index");
      var params = {
        id: this.tags[index].tag_id,
        tags: this.tags[index].tagName,
        start: this.tags[index].start,
        end: this.tags[index].end
      };
      this.errors = {};

      //タグ更新時のバリデーション
      if (!this.tagTimeValidate(params.start, params.end)) {
        this.tags[index].isTimeInputError = true;
        return;
      } else {
        console.log("時間のvalidation OK");
        this.tags[index].isTimeInputError = false;
      }
      if (!this.tagNameValidate(params.tags)) {
        this.tags[index].isTagInputError = true;
        return;
      } else {
        console.log("タグ名のvalidation OK");
        this.tags[index].isTagInputError = false;
      }

      axios
        .post("/api/tag/update", params)
        .then(function(response) {
          //成功した時
          self.tags[index].isEditMode = false;
          self.tags[index].start = "00:" + self.tags[index].start;
          self.tags[index].end = "00:" + self.tags[index].end;
        })
        .catch(function(error) {
          //失敗した時
          self.tags[index].isEditAjaxError = true;
          console.log("ajax通信失敗");
          console.log(error);
        });
    },
    //タグの削除
    deleteTag(e) {
      let index = e.currentTarget.getAttribute("data-tag-index");
      this.currentTagIndex = index;
      var self = this;

      //DBから削除
      var params = {
        id: this.tags[index].tag_id
      };
      this.errors = {};

      axios
        .post("/api/tag/delete", params)
        .then(function(response) {
          //成功した時
          //tags配列から削除
          self.tags.splice(index, 1);
        })
        .catch(function(error) {
          //失敗した時
          self.tags[index].isDeleteAjaxError = true;
          console.log("ajax通信失敗");
          console.log(error);
        });
    }
  },
  mounted: function() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("player", {
        height: "315",
        width: "560",
        videoId: youtubeId,
        playerVars: {
          start: startSec,
          end: endSec
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };
    // window.onYouTubeIframeAPIReady = () => {
    //   this.player = new YT.Player("iframeBox", {
    //     playerVars: {
    //       color: "white"
    //     },
    //     events: {
    //       onReady: onPlayerReady,
    //       onStateChange: onPlayerStateChange
    //     }
    //   });
    // };

    window.onPlayerReady = event => {
      event.target.mute();
      event.target.playVideo();
    };

    window.onPlayerStateChange = event => {};

    //DOM更新後にこのコードに到達する
    // this.$nextTick(() => {
    //   this.player = new YT.Player("iframeBox", {
    //     playerVars: {
    //       color: "white"
    //     },
    //     events: {
    //       onReady: onPlayerReady,
    //       onStateChange: onPlayerStateChange
    //     }
    //   });

    //   this.player.mute();
    //   this.player.playVideo();
    // });
  },
  computed: {
    formattedStartTime: function() {
      return this.formatToMinSec(this.tags[this.currentTagIndex].start);
    },
    formattedEndTime: function() {
      return this.formatToMinSec(this.tags[this.currentTagIndex].end);
    }
  }
});
