@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="app-home">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div>
                        <div>
                            <input id="searchBox" type="text" v-model="searchQuery" v-on:input="searchCandidates"/>
                            <span id="searchBtn" @click="search"><img alt="検索" src="{{ asset('/img/search.svg') }}"></span>
                        </div>
                        <div v-bind:class="{ candidatesWrap: candidates.length != 0 }" v-if="searchQuery!=''">
                            <div v-for="(candidate, index) in candidates">
                                <div v-if="index < 10 && candidate.playlistName" class="item" v-bind:class="{ isEven: index%2 == 1 }">
                                    <p v-on:click="select(candidate.playlistName)">@{{ candidate.playlistName }}</p>
                                </div>
                                <div v-if="index < 10 && candidate.tags" class="item" v-bind:class="{ isEven: index%2 == 1 }">
                                    <p v-on:click="select(candidate.tags)">@{{ candidate.tags }}</p>
                                </div>
                                <div v-if="index < 10 && candidate.title" class="item" v-bind:class="{ isEven: index%2 == 1 }">
                                    <p v-on:click="select(candidate.title)">@{{ candidate.title }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <search-result v-bind:videos="videos" v-bind:playlists-and-tag-thumbs="playlistsAndTagThumbs"></search-result>
                    </div>
                </div>
                <div>
                    {{-- {{ $results->links()}} --}}
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    //HomeControllerから受け取った変数をJSの変数に格納
    let videoArray = [];
    let tagArray = [];
    @foreach ($results as $key => $video)
        tagArray = [];
        @foreach($video['tags'] as $tagKey => $tag)
            tagArray[{{ $tagKey }}] = {
                'tag_id': "{{ $tag['tag_id'] }}",
                'tagName': "{{ $tag['tagName'] }}",
                'start': "{{ $tag['start'] }}",
                'end': "{{ $tag['end'] }}",
                'created_at': "{{ $tag['created_at'] }}",
                'updated_at': "{{ $tag['updated_at'] }}",
            }
        @endforeach
        videoArray[{{ $key }}] = {
            "video_id": "{{ $video['video_id'] }}",
            "youtubeId": "{{ $video['youtubeId'] }}",
            "user_id": "{{ $video['user_id'] }}",
            "url": "{{ $video['url'] }}",
            "title": "{{ $video['title'] }}",
            "thumbnail": "{{ $video['thumbnail'] }}",
            "duration": "{{ $video['duration'] }}",
            "tags": tagArray,
            "created_at": "{{ $video['created_at'] }}",
            "updated_at": "{{ $video['updated_at'] }}",
        }
    @endforeach

//--------------------------------------------------------------------
// 動画一覧コンポーネント
//--------------------------------------------------------------------
    Vue.component('search-result', {
        template: `
            <div>
                <div v-for="(playlist, index) in playlistsAndTagThumbs" v-bind:key="'playlist' + playlist.playlistId">
                    <div v-on:click="handlePlaylistClick" :data-playlist-index="index">
                        <div><img v-bind:src="playlist.thumbnail"></div>
                        <div>@{{ playlist.playlistName }}</div>
                    </div>
                </div>
                <div class="videoSec" v-for="video in videos" :key="'video' + video.video_id" >
                    <div v-for="tag in video.tags" v-on:click="handleTagClick" :data-video-id="video.video_id" :data-tag-id="tag.tag_id" v-if="tag.tag_id">
                            <div><img v-bind:src="video.thumbnail"></div>
                            <div>@{{ video.title }}</div>
                            <div>@{{ convertToMinSec(tag.start) + '〜' + convertToMinSec(tag.end) + ' ' + tag.tagName }}</div>
                    </div>
                </div>
            </div>`,
        props: {
            videos: {
                type: Array
            },
            playlistsAndTagThumbs: {
                type: Array
            }
        },
        methods: {
            handleTagClick: function(e){
                let video_id = e.currentTarget.getAttribute('data-video-id')
                let tag_id = e.currentTarget.getAttribute('data-tag-id')
                window.location.href = "/video/play/video_id=" + video_id + "&tag_id=" + tag_id + "&playlist_id=null";
            },
            handlePlaylistClick: function(e) {
                let index= e.currentTarget.getAttribute('data-playlist-index')
                window.location.href = "/video/play/video_id=" + this.playlistsAndTagThumbs[index].first_video_id + "&tag_id=" + this.playlistsAndTagThumbs[index].first_tag_id + "&playlist_id=" + this.playlistsAndTagThumbs[index].playlistId;
            },
            convertToSec: function(His) {
                return parseInt(His.split(":")[0], 10) * 3600 + parseInt(His.split(":")[1], 10) * 60 + parseInt(His.split(":")[2], 10);
            },
            convertToMinSec: function(His) {
                let min = parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
                let sec = parseInt(His.split(":")[2], 10);
                return min + ":" + sec;
            },
        },
    })

    new Vue({
        el: "#app-home",
        data: {
            videos: videoArray,
            searchQuery: "",
            candidates: [],
            playlistsAndTagThumbs: JSON.parse('{!! $jsonPlaylistsAndTagThumbs !!}'),
        },
        methods: {
            search() {
                window.location.href = "/video/searchQuery="+encodeURIComponent(this.searchQuery);
            },
            searchCandidates(e) {
                this.searchQuery = $("#searchBox").val();
                var self = this;
                var params = {
                    searchQuery: this.searchQuery,
                };
                this.errors = {};

                axios.post('/home/searchCandidates', params)
                    .then(function(response){
                        // 成功した時
                        self.candidates = response.data.data;
                    })
                    .catch(function(error) {
                        // 失敗したとき
                        console.log(error);
                        var errors = {};
                        for(var key in error.response.data.errors) {
                            errors[key] = error.response.data.errors[key].join('<br>');
                        }
                        self.errors = errors;
                    })
            },
            select(candidateName) {
                this.searchQuery = candidateName;
                this.candidates = [];
            }
        },
        mounted: function() {
          var self = this;
          this.errors = {};

          this.playlistsAndTagThumbs.forEach(function(value, index) {
              var params = {
                playlistId: value.playlistId,
              };
    
              axios.post('/playlist/getFirstTagVideoId', params)
                  .then(function(response){
                      // 成功した時
                      //first_tag_idとfirst_video_idを新たにセット
                      self.$set(self.playlistsAndTagThumbs[index], 'first_tag_id', response.data.first_tag_id)
                      self.$set(self.playlistsAndTagThumbs[index], 'first_video_id', response.data.first_video_id)
                  })
                  .catch(function(error){
                      // 失敗したとき
                      var errors = {};
                      for(var key in error.response.data.errors) {
                          errors[key] = error.response.data.errors[key].join('<br>');
                      }
                      self.errors = errors;
                  });
          });
        },
    })
</script>
@endsection
