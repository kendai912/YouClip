import { values } from "lodash";

//システムエラー定義
export const OK = 200;
export const CREATED = 201;
export const DELETED = 204;
export const FORBIDDEN = 403;
export const INTERNAL_SERVER_ERROR = 500;
export const UNAUTHORIZED = 401;

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
          //合計時間を計算
          let duration = this.timeMath.sub(value.end, value.start);

          let mediaItem = {
            video_id: value.video_id,
            category: "tag",
            id: value.tag_id,
            title: value.title,
            thumbnail: value.thumbnail,
            created_at: value.tag_created_at,
            timeSince: this.timeSince(value.tag_created_at),
            tagsList: "",
            tags: value.tags,
            tagArray: [],
            totalDuration: this.convertToKanjiTime(
              this.convertToSec(this.formatToMinSec(duration))
            ),
            start: this.formatToMinSec(value.start),
            end: this.formatToMinSec(value.end),
            preview: value.preview,
            previewgif: value.previewgif,
            sceneCount: 1,
            likeCount: "",
            user_id: value.user_id
          };
          let tagCount = 0;
          if (Array.isArray(value.tags)) {
            value.tags.forEach(tagItem => {
              tagItem.split(/[\s| |　]/).forEach(tag => {
                if (tagCount < 10) {
                  mediaItem.tagArray.push(tag);
                  tagCount ++;
                }
              })
            });
          } else {
            // mediaItem.tagArray.push(value.tags);
            value.tags.split(/[\s| |　]/).forEach(tag => {
              if (tagCount < 10) {
                mediaItem.tagArray.push(tag);
                tagCount ++;
              }
            })
          }
          mediaItems.push(mediaItem);
        });
      }
    },
    //プレイリストデータをメディアアイテムに追加格納
    putPlaylistTagIntoMediaItems: function(mediaItems, playlistTag) {
      if (playlistTag) {
        playlistTag.forEach((value, index) => {
          //合計時間とシーン数を計算
          let totalDuration = "00:00:00";
          let sceneCount = 0;
          value.tags.forEach((tag) => {
            let duration = this.timeMath.sub(tag.end, tag.start);
            totalDuration = this.timeMath.sum(totalDuration, duration);
            sceneCount++;
          });

          if (value.tags[0]) {
            let mediaItem = {
              category: "playlist",
              id: value.id,
              title: value.playlistName,
              thumbnail: "",
              created_at: value.created_at,
              timeSince: this.timeSince(value.created_at),
              tagsList: value.tags,
              tags: "",
              tagArray: [],
              totalDuration: this.convertToKanjiTime(
                this.convertToSec(this.formatToMinSec(totalDuration))
              ),
              start: "",
              end: "",
              preview: value.tags[0].preview,
              previewgif: value.tags[0].previewgif,
              sceneCount: sceneCount,
              likeCount: value.likesPlaylist_count,
              visitCount: value.play_count,
              user_id: value.user_id
            };
            let tagCount = 0;
            if (Array.isArray(value.tags)) {
              value.tags.forEach(tagItem => {
                if (tagItem.tags[0]) {
                  tagItem.tags.split(/[\s| |　]/).forEach(tag => {
                    if (mediaItem.tagArray.indexOf(tag) === -1) {
                      if (tagCount < 10) {
                        mediaItem.tagArray.push(tag);
                        tagCount ++;
                      }
                    }
                  })
                }
              })
            } else {
              // mediaItem.tagArray.push(value.tags);
              value.tags.split(/[\s| |　]/).forEach(tag => {
                if (mediaItem.tagArray.indexOf(tag) === -1) {
                  if (tagCount < 10) {
                    mediaItem.tagArray.push(tag);
                    tagCount ++;
                  }
                }
              })
            }
            mediaItems.push(mediaItem);
          }
        });
      }
    },
    //ss表記から「◯時間」か「◯分」か「◯秒」に変換
    convertToKanjiTime(s) {
      let units = ["秒", "分", "時間"];
      var ext = units[0];
      for (var i = 1; i < units.length; i += 1) {
        if (parseInt(s) >= 60) {
          s = parseInt(s) / 60;
          ext = units[i];
        }
      }
      return Math.round(s) + ext;
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
      interval = Math.floor(seconds / 604800);
      if (interval > 1) {
        return interval + "週間";
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
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

  data() {
    return {
      timeMath: {
        // 加算
        sum: function() {
          var result,
            times,
            second,
            i,
            len = arguments.length;

          if (len === 0) return;

          for (i = 0; i < len; i++) {
            if (
              !arguments[i] ||
              !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)
            )
              continue;

            times = arguments[i].split(":");

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second && second !== 0) continue;

            if (i === 0) {
              result = second;
            } else {
              result += second;
            }
          }

          return this.toTimeFormat(result);
        },

        // 減算
        sub: function() {
          var result,
            times,
            second,
            i,
            len = arguments.length;

          if (len === 0) return;

          for (i = 0; i < len; i++) {
            if (
              !arguments[i] ||
              !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)
            )
              continue;

            times = arguments[i].split(":");

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
              result = second;
            } else {
              result -= second;
            }
          }

          return this.toTimeFormat(result);
        },

        // 乗算
        multiply: function() {
          var result,
            times,
            second,
            i,
            len = arguments.length;

          if (len === 0) return;

          for (i = 0; i < len; i++) {
            if (
              !arguments[i] ||
              !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)
            )
              continue;

            times = arguments[i].split(":");

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
              result = second;
            } else {
              result *= second;
            }
          }

          return this.toTimeFormat(result);
        },

        // 除算
        division: function() {
          var result,
            times,
            second,
            i,
            len = arguments.length;

          if (len === 0) return;

          for (i = 0; i < len; i++) {
            if (
              !arguments[i] ||
              !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)
            )
              continue;

            times = arguments[i].split(":");

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
              result = second;
            } else {
              result /= second;
            }
          }

          return this.toTimeFormat(result);
        },

        // 時間を秒に変換
        toSecond: function(hour, minute, second) {
          if (
            (!hour && hour !== 0) ||
            (!minute && minute !== 0) ||
            (!second && second !== 0) ||
            hour === null ||
            minute === null ||
            second === null ||
            typeof hour === "boolean" ||
            typeof minute === "boolean" ||
            typeof second === "boolean" ||
            typeof Number(hour) === "NaN" ||
            typeof Number(minute) === "NaN" ||
            typeof Number(second) === "NaN"
          )
            return;

          return Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second);
        },

        // 秒を時間（hh:mm:ss）のフォーマットに変換
        toTimeFormat: function(fullSecond) {
          var hour, minute, second;

          if (
            (!fullSecond && fullSecond !== 0) ||
            !String(fullSecond).match(/^[\-0-9][0-9]*?$/)
          )
            return;

          var paddingZero = function(n) {
            return n < 10 ? "0" + n : n;
          };

          hour = Math.floor(Math.abs(fullSecond) / 3600);
          minute = Math.floor((Math.abs(fullSecond) % 3600) / 60);
          second = Math.floor(Math.abs(fullSecond) % 60);

          minute = paddingZero(minute);
          second = paddingZero(second);

          return (
            (fullSecond < 0 ? "-" : "") + hour + ":" + minute + ":" + second
          );
        },
      },
    };
  },
};
