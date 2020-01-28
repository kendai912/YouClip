@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div>
                        <input id="searchBox" type="text"/>
                        <div id="searchBtn">
                            <span><img alt="検索" src="{{ asset('/img/search.svg') }}"></span>
                        </div>
                    </div>
                    <div id="app-home">
                        <search-result :videos = "videos"></search-result>
                    </div>
                </div>
                <div>
                    {{ $videos->links()}}
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    //HomeControllerから受け取った変数をJSの変数に格納
    let videoArray = [];
    @foreach ($videos as $key => $video)
        videoArray[{{ $key }}] = {
            "id": '{{ $video->id }}',
            "youtubeId": '{{ $video->youtubeId}}',
            "user_id": '{{ $video->user_id}}',
            "url": '{{ $video->url}}',
            "title": '{{ $video->title}}',
            "thumbnail": '{{ $video->thumbnail}}',
            "duration": '{{ $video->duration}}',
            "created_at": '{{ $video->created_at}}',
            "updated_at": '{{ $video->updated_at}}',
        }
    @endforeach

//--------------------------------------------------------------------
// 動画一覧コンポーネント
//--------------------------------------------------------------------
    Vue.component('search-result', {
        template: `
            <div>
                <div class="videoSec" v-for="video in videos" :key="video.videoId" @click="handleClick" :video-id="video.id">
                    <div class="topIframeBox">
                        <iframe 
                            class="topIframe" 
                            :src="'https://www.youtube.com/embed/' + video.youtubeId">
                        </iframe>
                        <p>@{{ video.title }}</p>
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
        }
    })
</script>
@endsection
