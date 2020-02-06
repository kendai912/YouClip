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

                    <div id="app-video-show">
                        <div id="videoSec">
                            <iframe 
                                id="iframeBox" 
                                src="https://www.youtube.com/embed/{{ $video[0]['youtubeId'] }}?enablejsapi=1&start={{ $startSec }}&end={{ $endSec }}"  allow="autoplay; encrypted-media" allowfullscreenf>
                            </iframe>
                            <p>{{ $video[0]['title'] }}</p>
                        </div>

                        <div>
                            <p class="slide-down" data-slide="slide-1">シーンにタグ付け</p>
                            <div class="slide-1">
                                <p class="pSceneSelect">１．タグ付けするシーンを指定</p>
                                <div class="timeBtnBox">
                                    <button 
                                    v-if="isStarting"
                                    @click="start"
                                    id="startBtn" 
                                    type="button" 
                                    class="btn btn-primary"
                                    >
                                    Start
                                    </button>
                                    <button
                                    v-if="isEnding"
                                    @click="end"
                                    id="endBtn"
                                    type="button"
                                    class="btn btn-primary"
                                    >
                                    Stop
                                    </button>
                                </div>
                                <input type="text" class="form-control" id="startTime"
                                placeholder="00:00" v-model="startTime">
                                <input type="text" class="form-control" id="endTime"
                                placeholder="00:00" v-model="endTime">
                                <p class="pTagInput">２．タグ名を入力</p>
                                <input
                                    type="text"
                                    class="form-control mb-2 mr-sm-2"
                                    id="sceneTags"
                                    placeholder="タグ名1  タグ名2"
                                    v-model="sceneTags"
                                />
                                <div class="saveBtnBox">
                                    <button id="saveBtn" type="button" class="btn btn-primary" @click="save" v-bind:data-video-id="{{ $video[0]['video_id'] }}" v-bind:data-user-id="{{ $video[0]['user_id'] }}">
                                        保存
                                    </button>
                                </div>
                                <div v-if="tagStored">タグを登録しました</div>
                                <div v-if="isTimeInputError">時間の入力が正しくありません</div>
                                <div v-if="isTagInputError">タグの入力が正しくありません</div>
                                <div v-if="isAjaxError">タグの登録に失敗しました</div>
                            </div>
                        </div>
                        <div id="tagBox">
                            @if (isset($video[0]['tags'][0]['tag_id']))
                                @foreach($video[0]['tags'] as $tag)
                                    <div> <a href="{{ '/video/play/video_id='.$video[0]['video_id'].'&tag_id='.$tag['tag_id'] }}">{{ date('i:s', strtotime($tag['start']))."〜".date('i:s', strtotime($tag['end']))." ".$tag['tagName'] }} </a></div>
                                @endforeach
                            @endif
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Vueに渡す変数 -->
<script>
    let tagArray = [];
    @foreach($video[0]['tags'] as $key => $tag)
        tagArray[{{ $key }}] = {
            'tag_id': {{ $tag['tag_id'] }},
            'tagName': "{{ $tag['tagName'] }}",
            'start': "{{ $tag['start'] }}",
            'end': "{{ $tag['end'] }}",
            'created_at': "{{ $tag['created_at'] }}",
            'updated_at': "{{ $tag['updated_at'] }}",
        }
    @endforeach
</script>
<!-- Scripts -->
<script src="{{ asset('js/video_show.js') }}"></script>
@endsection
