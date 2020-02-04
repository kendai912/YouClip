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
                        <input id="searchBox" type="text" v-model="searchQuery" v-on:input="searchCandidates"/>
                        <ul>
                            <li v-for="candidate in candidates" v-if="candidate.tags && searchQuery!=''">@{{ candidate.tags }}</li>
                            <li v-for="candidate in candidates" v-if="candidate.title && searchQuery!=''">@{{ candidate.title }}</li>
                        </ul>
                        <div id="searchBtn" @click="search">
                            <span><img alt="検索" src="{{ asset('/img/search.svg') }}"></span>
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
    @foreach ($results as $key => $video)
        videoArray[{{ $key }}] = {
            "video_id": "{{ $video['video_id'] }}",
            "youtubeId": "{{ $video['youtubeId'] }}",
            "user_id": "{{ $video['user_id'] }}",
            "url": "{{ $video['url'] }}",
            "title": "{{ $video['title'] }}",
            "thumbnail": "{{ $video['thumbnail'] }}",
            "duration": "{{ $video['duration'] }}",
            "tags": "{{ json_encode($video['tags']) }}",
            "start": "{{ $video['start'] }}",
            "end": "{{ $video['end'] }}",
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
                <div class="videoSec" v-for="video in videos" :key="video.video_id" @click="handleClick" :video-id="video.video_id">
                    <div class="topIframeBox">
                        <iframe 
                            class="topIframe" 
                            :src="'https://www.youtube.com/embed/' + video.youtubeId">
                        </iframe>
                        <p>@{{ video.title }}</p>
                        <p>@{{ video.tags }}</p>
                    </div>
                </div>
            </div>`,
        props: {
            videos: {
                type: Array
            }
        },
        methods: {
            handleClick: function(e){
                let id = e.path.find(row => row.className == "videoSec").getAttribute('video-id')
                window.location.href = "/video/play/"+id;
            }
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

                // console.log(this.searchQuery);
                // if(this.searchQuery == ''){

                // }
            },
        }
    })
</script>
@endsection
