//システムエラー定義
export const OK = 200;
export const CREATED = 201;
export const DELETED = 204;
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

  document.cookie.split(";").forEach((cookie) => {
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
            tagsList: "",
            tags: value.tags,
            tagArray: value.tags.split(/[\s| |　]/),
            start: this.formatToMinSec(value.start),
            end: this.formatToMinSec(value.end),
            preview: value.preview,
          });
        });
      }
    },
    //プレイリストデータをメディアアイテムに追加格納
    putPlaylistTagIntoMediaItems: function(mediaItems, playlistTag) {
      if (playlistTag) {
        playlistTag.forEach((value, index) => {
          if (value.tags[0]) {
            mediaItems.push({
              category: "playlist",
              id: value.id,
              title: value.playlistName,
              thumbnail: "",
              created_at: value.created_at,
              tagsList: value.tags,
              tags: "",
              tagArray: "",
              start: "",
              end: "",
              preview: value.tags[0].preview,
            });
          }
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
      sec = sec < 10 ? "0" + sec : sec;
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
    //APIで返ってきたdurationを分:秒に整形
    convertTYdurationToMinSec(YTduration) {
      if (YTduration.match(/PT(\d*)M(\d*)S/)) {
        let result = YTduration.match(/PT(\d*)M(\d*)S/);
        let min = result[1];
        let sec = result[2];
        if (sec < 10) sec = "0" + sec;

        return min + ":" + sec;
      } else if (YTduration.match(/PT(\d*)S/)) {
        let result = YTduration.match(/PT(\d*)S/);
        let sec = result[1];
        if (sec < 10) sec = "0" + sec;

        return "0:" + sec;
      }
    },
    //数値の桁変換を行う関数
    convertNumDigit(num) {
      let units = ["", "万", "億"];
      var ext = units[0];
      for (var i = 1; i < units.length; i += 1) {
        if (parseInt(num) >= 10000) {
          num = parseInt(num) / 10000;
          ext = units[i];
        }
      }
      return Math.round(num) + ext;
    },
    //日付が現時点からどのくらい前か表示変換を行う関数
    timeSince(publishedAt) {
      let date = new Date(
        publishedAt.substring(0, 4),
        publishedAt.substring(5, 7) - 1,
        publishedAt.substring(8, 10)
      );
      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        return Math.floor(interval) + "年";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + "ヶ月";
      }
      interval = Math.floor((seconds / 86400) * 7);
      if (interval > 1) {
        return interval + "週間";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + "日";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + "時間";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + "分";
      }
      return Math.floor(seconds) + "秒";
    },
  },
};
