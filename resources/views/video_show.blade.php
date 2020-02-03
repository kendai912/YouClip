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
                    <div id="videoSec">
                        <iframe 
                            id="iframeBox" 
                            src="https://www.youtube.com/embed/{{ $video->youtubeId }}?enablejsapi=1"  allow="autoplay; encrypted-media" allowfullscreenf>
                        </iframe>
                        <p>{{ $video->title }}</p>
                    </div>

                    <div id="app-video-show">
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
                                <button id="saveBtn" type="button" class="btn btn-primary" @click="save" v-bind:data-video-id="{{ $video->id }}" v-bind:data-user-id="{{ $video->user_id }}">
                                    保存
                                </button>
                            </div>
                            <div v-if="tagStored">タグを登録しました</div>
                            <div v-if="isTimeInputError">時間の入力が正しくありません</div>
                            <div v-if="isTagInputError">タグの入力が正しくありません</div>
                            <div v-if="isAjaxError">タグの登録に失敗しました</div>
                        </div>
                     </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Scripts -->
<script src="{{ asset('js/video_show.js') }}"></script>
@endsection
