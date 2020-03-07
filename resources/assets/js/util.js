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
        tagVideo.forEach(value => {
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
        playlistTag.forEach(value => {
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
    }
  }
};
