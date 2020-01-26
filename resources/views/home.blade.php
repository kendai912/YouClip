@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

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
                        {{-- <search-result v-for="video in videos"></search-result> --}}
                        <test-component v-for="video in videos"></test-component>
                    </div>
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
            "videoId": '{{ $video->videoId }}',
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
    // Vue.component('search-result', {
    //     template: `
    //         <div v-for"video in videos" :key="video.videoId" class="videoSec">
    //             <div class="topIframeBox">
    //                 <iframe 
    //                     class="topIframe" 
    //                     :src="'https://www.youtube.com/embed/' + video.youtubeId">
    //                 </iframe>
    //             </div>
    //         </div>`,
    // })

    Vue.component('test-component', {
        template: `
            <p>test</p>`,
    })

    new Vue({
        el: "#app-home",
        data: {
            videos: videoArray,
        }
    })
</script>
@endsection
