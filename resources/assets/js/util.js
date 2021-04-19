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
    mobileCheck() {
      let check = false;
      (function(a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    //シーンタグ入力項目を初期化
    clearTaggingInput() {
      this.$store.commit("tagging/setTagId", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setPrivacySetting", "");
    },
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
            isNewClip: this.isNewClip(value.tag_created_at),
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
            user_id: value.user_id,
            scene_order: value.scene_order,
            youtubeId: value.youtubeId,
          };
          let tagCount = 0;
          if (Array.isArray(value.tags)) {
            value.tags.forEach((tagItem) => {
              tagItem.split(/::/).forEach((tag) => {
                if (tagCount < 10) {
                  mediaItem.tagArray.push(tag);
                  tagCount++;
                }
              });
            });
          } else {
            // mediaItem.tagArray.push(value.tags);
            value.tags.split(/::/).forEach((tag) => {
              if (tagCount < 10) {
                mediaItem.tagArray.push(tag);
                tagCount++;
              }
            });
          }
          mediaItems.push(mediaItem);
        });
      }
    },
    getTotalDuration: function(mediaItems) {
      if (mediaItems.length) {
        let totalDuration = "00:00:00";
        mediaItems.forEach((item) => {
          let duration = this.timeMath.sub(item.end, item.start);
          totalDuration = this.timeMath.sum(totalDuration, duration);
        });
        return this.convertToKanjiTime(
          this.convertToSec(this.formatToMinSec(totalDuration))
        );
      }
      return "0秒 ";
    },
    //プレイリストデータをメディアアイテムに追加格納
    putPlaylistTagIntoMediaItems: function(mediaItems, playlistTag) {
      if (playlistTag) {
        //プレイリスト毎にアイテム(mediaItem)をmediaItemsに格納
        playlistTag.forEach((value, index) => {
          //1-1.合計時間とシーン数を計算するための変数
          let totalDuration = "00:00:00";
          let sceneCount = 0;
          //2-1.元のYouTube動画の本数と合計時間を計算するための変数
          let totalYTDuration = "00:00:00";
          let numberOfYTvideos = 0;
          let uniqueYTvideoArray = [];
          value.tags.forEach((tag) => {
            //1-2.合計時間とシーン数を計算
            let duration = this.timeMath.sub(tag.end, tag.start);
            totalDuration = this.timeMath.sum(totalDuration, duration);
            sceneCount++;
            //2-2.元のYouTube動画の本数と合計時間を計算
            if (!uniqueYTvideoArray.includes(tag.video.id)) {
              totalYTDuration = this.timeMath.sum(
                totalYTDuration,
                tag.video.duration
              );
              uniqueYTvideoArray.push(tag.video.id);
            }
          });
          numberOfYTvideos = uniqueYTvideoArray.length;

          //データをmediaItemsに格納(サムネイル&プレビュー動画は最初のシーンのデータを格納)
          if (value.tags[0]) {
            let mediaItem = {
              category: "playlist",
              id: value.id,
              title: value.playlistName,
              thumbnail: "",
              created_at: value.created_at,
              timeSince: this.timeSince(value.created_at),
              isNewClip: this.isNewClip(value.created_at),
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
              user_id: value.user_id,
              numberOfYTvideos: numberOfYTvideos,
              totalYTDuration: this.convertToKanjiTime(
                this.convertToSec(this.formatToMinSec(totalYTDuration))
              ),
              username: value.user.name,
              avatar: value.user.avatar,
            };
            let tagCount = 0;
            if (Array.isArray(value.tags)) {
              value.tags.forEach((tagItem) => {
                if (tagItem.tags[0]) {
                  tagItem.tags.split(/::/).forEach((tag) => {
                    if (mediaItem.tagArray.indexOf(tag) === -1) {
                      if (tagCount < 10) {
                        mediaItem.tagArray.push(tag);
                        tagCount++;
                      }
                    }
                  });
                }
              });
            } else {
              // mediaItem.tagArray.push(value.tags);
              value.tags.split(/::/).forEach((tag) => {
                if (mediaItem.tagArray.indexOf(tag) === -1) {
                  if (tagCount < 10) {
                    mediaItem.tagArray.push(tag);
                    tagCount++;
                  }
                }
              });
            }
            mediaItems.push(mediaItem);
          }
        });
      }
    },
    //YTPlayerのまとめの再生に必要なパラメータをセット
    putTagVideoIntolistOfYoutubeIdStartEndTime: function(
      listOfYoutubeIdStartEndTimeArray,
      tagVideo
    ) {
      if (tagVideo) {
        tagVideo.forEach((value) => {
          let listOfYoutubeIdStartEndTime = {
            youtubeId: value.youtubeId,
            start: value.start,
            end: value.end,
            scene_order: value.scene_order,
          };
          listOfYoutubeIdStartEndTimeArray.push(listOfYoutubeIdStartEndTime);
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
      if (is.split(":").length > 2) {
        return (
          parseInt(is.split(":")[0], 10) * 3600 +
          parseInt(is.split(":")[1], 10) * 60 +
          parseInt(is.split(":")[2], 10)
        );
      } else {
        return (
          parseInt(is.split(":")[0], 10) * 60 + parseInt(is.split(":")[1], 10)
        );
      }
    },
    //H:i:sをi:s表記にフォーマット
    formatToMinSec(His) {
      if (His.split(":").length == 2) {
        return His;
      } else if (His.split(":").length == 3) {
        let min =
          parseInt(His.split(":")[0], 10) * 60 +
          parseInt(His.split(":")[1], 10);
        let sec = parseInt(His.split(":")[2], 10);
        sec = sec < 10 ? "0" + sec : sec;
        return min + ":" + sec;
      } else {
        return false;
      }
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
      if (YTduration.match(/PT(\d*)H(\d*)M(\d*)S/)) {
        let result = YTduration.match(/PT(\d*)H(\d*)M(\d*)S/);
        let hr = result[1];
        let min = result[2];
        let sec = result[3];
        if (sec < 10) sec = "0" + sec;
        return hr + ":" + min + ":" + sec;
      } else if (YTduration.match(/PT(\d*)M(\d*)S/)) {
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
    convertNumDigit(numTxt) {
      let units = ["", "万", "億"];
      var ext = units[0];
      let num = numTxt.replace(/[^0-9]/g, "");

      for (var i = 1; i < units.length; i += 1) {
        if (parseInt(num) >= 10000) {
          num = parseInt(num) / 10000;
          ext = units[i];
        }
      }
      return Math.round(num) + ext;
    },
    replaceDate(dateStr) {
      const regexp = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?: ([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
      return dateStr.replace(
        regexp,
        (match, year, month, day, hour, minutes, seconds) => {
          return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
        }
      );
    },
    //日付が現時点からどのくらい前か表示変換を行う関数
    timeSince(publishedAt) {
      if (publishedAt != null) {
        let date = new Date(this.replaceDate(publishedAt));
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
      }
    },
    isNewClip(publishedAt) {
      if (publishedAt != null) {
        let date = new Date(publishedAt);
        let seconds = Math.floor((new Date() - date) / 1000);

        if (seconds <= 60 * 60 * 24) {
          return true;
        } else {
          return false;
        }
      }
    },
    convertToYMD(updatedAt) {
      if (updatedAt != null) {
        let ymd = updatedAt.split(" ")[0];
        return ymd;
      }
    },
    setYtPlayerCSS() {
      //iframeの縦・横のサイズをセット(縦は952px、横は幅いっぱい)
      $("iframe").width($(".ytPlayerWrapper").width());
      $("iframe").css({ position: "absolute", top: "0px" });
      $("iframe").height(952);

      //iframeとseekbarが見える範囲の高さをセットし、iframe上部の黒分が見えないよう上にスライド
      let playerHeight = ($("iframe").width() * 9) / 16;
      $(".ytPlayerWrapper").css(
        "height",
        playerHeight + ($("iframe").height() - playerHeight) / 2 + 15
      );
      $(".ytPlayerWrapper").css(
        "top",
        (($("iframe").height() - playerHeight) / 2) * -1
      );

      this.$nextTick(() => {
        //開始・終了ボタンがiframeとseekbarの下に来るようにtopを調整
        $(".highlightControllerBody").css("top", playerHeight + 15);
      });
    },
    secondsToDuration(secondsVal) {
      let duration = "P";
      let remainder = secondsVal;
      let designations = [
        ["D", 24 * 60 * 60],
        ["H", 60 * 60],
        ["M", 60],
        ["S", 1],
      ];

      designations.forEach(([sign, seconds]) => {
        const value = Math.floor(remainder / seconds);

        remainder = remainder % seconds;

        if (value) {
          duration += `${value}${sign}`;
        }
      });

      if (duration == "P") {
        duration = "P0S";
      }

      return duration;
    },
    saveTimeInput(youtubeId, startTimeInput, endTimeInput) {
      let ytInputData = {
        youtubeId: youtubeId,
        startTimeInput: startTimeInput,
        endTimeInput: endTimeInput,
      };
      window.sessionStorage.setItem("ytInputData", JSON.stringify(ytInputData));
    },
  },

  data() {
    return {
      thumbStoragePath:
        "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/",
      gifStoragePath:
        "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/gifs/",
      avatarStoragePath:
        "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/avatars/",
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
