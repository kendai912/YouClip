//システムエラー定義
export const OK = 200;
export const CREATED = 201;
export const INTERNAL_SERVER_ERROR = 500;

//バリデーションエラー定義
export const UNPROCESSABLE_ENTITY = 422;

/**
 * クッキーの値を取得する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */
export function getCookieValue(searchKey) {
  if (typeof searchKey === "undefined") {
    return "";
  }

  let val = "";

  document.cookie.split(";").forEach(cookie => {
    const [key, value] = cookie.split("=");
    if (key === searchKey) {
      return (val = value);
    }
  });

  return val;
}

// ミックスインを定義
export default {
  methods: {
    //タグデータをレコメンド画面に表示するメディアアイテムに格納
    putTagVideoIntoMediaItems: function(mediaItems, tagVideo) {
      if (tagVideo) {
        tagVideo.forEach((value, index) => {
          mediaItems.push({
            category: "tag",
            id: value.tag_id,
            title: value.title,
            thumbnail: value.thumbnail,
            created_at: value.tag_created_at,
            tags: value.tags,
            tagArray: value.tags.split(/[\s| |　]/),
            start: this.formatToMinSec(value.start),
            end: this.formatToMinSec(value.end)
          });
        });
      }
    },
    //プレイリストデータをメディアアイテムに追加格納
    putPlaylistTagIntoMediaItems: function(mediaItems, playlistTag) {
      if (playlistTag) {
        playlistTag.forEach((value, index) => {
          mediaItems.push({
            category: "playlist",
            id: value.id,
            title: value.playlistName,
            thumbnail:
              "https://watanabeseiji.com/wordpress/wp-content/themes/cyber/images/noimage.jpg",
            created_at: value.created_at,
            tags: "",
            tagArray: "",
            start: "",
            end: ""
          });
        });
      }
    },
    //i:s表記から秒数に変換
    convertToSec(is) {
      return (
        parseInt(is.split(":")[0], 10) * 60 + parseInt(is.split(":")[1], 10)
      );
    },
    //H:i:sをi:s表記にフォーマット
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    },
    //playerが取得した時間を「分:秒」に整形
    formatTime(time) {
      time = Math.round(time);
      var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return minutes + ":" + seconds;
    },
    setPlaylistParameters(playlistId, index) {
      //プレイリストIDからプレイリスト名を取得
      let playlistName = this.$store.getters[
        "playlist/getPlaylistTagContentById"
      ](playlistId).playlistName;

      //プレイリストのIDと名前をwatchストアにセット
      this.$store.commit("watch/setPlaylistId", playlistId);
      this.$store.commit("watch/setPlaylistName", playlistName);

      //プレイリストIDからplaylistストアのplaylistTagDataに格納されているtagデータを取得
      let playlistTagArray = this.$store.getters[
        "playlist/getPlaylistTagContentById"
      ](playlistId).tags;

      //tagデータとvideoデータを結合
      let playlistTagVideoArray = [];
      playlistTagArray.forEach(value => {
        playlistTagVideoArray.push(
          this.$store.getters["tag/getTagVideoContentById"](value.id)
        );
      });

      //Watchストアに再生のためのパラメータをセット
      this.$store.commit("watch/setPlaylistParameters", {
        playlistTagVideoArray,
        index
      });
    },
    //YTPlayerのタグの再生に必要なパラメータをセット
    async setIndivisualParameters(currentTagId) {
      let video_id = this.$store.getters["tag/getTagVideoContentById"](
        currentTagId
      ).video_id;

      // //再生するtagIDをwatchストアにセット
      this.$store.commit("watch/setCurrentTagId", currentTagId);

      //VideoIDからtagデータ一覧を取得
      await this.$store.dispatch("video/getTagListByVideoId", video_id);
      let tagList = this.$store.getters["video/tagListOfVideo"];

      //tagデータとvideoデータを結合
      let indivisualTagVideoArray = [];
      tagList.forEach(value => {
        indivisualTagVideoArray.push(
          this.$store.getters["tag/getTagVideoContentById"](value.id)
        );
      });

      //Watchストアに再生のためのパラメータをセット
      this.$store.commit(
        "watch/setIndivisualParameters",
        indivisualTagVideoArray
      );
    }
  }
};
