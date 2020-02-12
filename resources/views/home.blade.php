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
                                <div v-if="index < 10 && candidate.tags" class="item" v-bind:class="{ isEven: index%2 == 1 }">
                                    <p v-on:click="select(candidate.tags)">@{{ candidate.tags }}</p>
                                </div>
                                <div v-if="index < 10 && candidate.title" class="item" v-bind:class="{ isEven: index%2 == 1 }">
                                    <p v-on:click="select(candidate.title)">@{{ candidate.title }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <search-result :videos = "videos"></search-result>
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
                <div class="videoSec" v-for="video in videos" :key="video.video_id" >
                    <div class="topIframeBox" @click="handleClick" :data-video-id="video.video_id">
                        <iframe 
                            class="topIframe" 
                            :src="'https://www.youtube.com/embed/' + video.youtubeId">
                        </iframe>
                        <p>@{{ video.title }}</p>
                    </div>
                        <p v-for="tag in video.tags" v-if="tag.tag_id"><a :href="'/video/play/video_id=' + video.video_id + '&tag_id=' + tag.tag_id + '&playlist_id=null'">@{{ convertToMinSec(tag.start) + '〜' + convertToMinSec(tag.end) + ' ' + tag.tagName }}</a></p>
                </div>
            </div>`,
        props: {
            videos: {
                type: Array
            }
        },
        methods: {
            handleClick: function(e){
                let id = e.path.find(row => row.className == "topIframeBox").getAttribute('data-video-id')
                console.log("id="+id)
                window.location.href = "/video/play/video_id=" + id + "&tag_id=null&playlist_id=null";
            },
            convertToSec: function(His) {
                return parseInt(His.split(":")[0], 10) * 3600 + parseInt(His.split(":")[1], 10) * 60 + parseInt(His.split(":")[2], 10);
            },
            convertToMinSec: function(His) {
                let min = parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
                let sec = parseInt(His.split(":")[2], 10);
                return min + ":" + sec;
            },
        }
    })

    new Vue({
        el: "#app-home",
        data: {
            videos: videoArray,
            searchQuery: "",
            candidates: [],
        },
        methods: {
            search() {
                window.location.href = "/video/searchQuery="+this.searchQuery;
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
                        console.log(response.data.data)
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
        }
    })
</script>
@endsection
