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
                                    <button id="saveBtn" type="button" class="btn btn-primary" @click="save" v-bind:data-video-id="{{ $video[0]['video_id'] }}" v-bind:data-user-id="{{ $loginUserId }}">
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
                            {{-- @if (isset($video[0]['tags'][0]['tag_id']))
                            @foreach($video[0]['tags'] as $tag)
                            <div> <a href="{{ '/video/play/video_id='.$video[0]['video_id'].'&tag_id='.$tag['tag_id'] }}">{{ date('i:s', strtotime($tag['start']))."〜".date('i:s', strtotime($tag['end']))." ".$tag['tagName'] }} </a></div>
                            @endforeach
                            @endif --}}
                            <div v-if="tags[0]">
                                <div v-for="(tag, index) in tags">
                                    <div v-if="tag.isEditMode != true">
                                        <a v-bind:href="'/video/play/video_id={{ $video[0]['video_id'] }}&tag_id=' + tag.tag_id">@{{ formatToMinSec(tag.start) }} 〜 @{{ formatToMinSec(tag.end) }} @{{ tag.tagName }} </a>
                                        <span v-if="{{ $loginUserId }} == tag.user_id" v-on:click="editTag" v-bind:data-tag-index="index">編集</span>
                                        <span v-if="{{ $loginUserId }} == tag.user_id" v-on:click="deleteTag" v-bind:data-tag-index="index">削除</span>
                                        <div>
                                            <span v-if="tag.isDeleteAjaxError == true">タグの削除に失敗しました</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <input type="text" v-model="tag.start">
                                        <input type="text" v-model="tag.end">
                                        <input type="text" v-model="tag.tagName">
                                        <span v-on:click="updateTag" v-bind:data-tag-index="index">更新</span>
                                        <div>
                                            <span v-if="tag.isTimeInputError == true">時間の入力が正しくありません</span>
                                            <span v-if="tag.isTagInputError == true">タグの入力が正しくありません</span>
                                            <span v-if="tag.isEditAjaxError == true">タグの更新に失敗しました</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Vueに渡すタグ関連変数 -->
<script>
    let tagArray = [];
    @if (isset($video[0]['tags'][0]['tag_id']))
        @foreach($video[0]['tags'] as $key => $tag)
            tagArray[{{ $key }}] = {
                'tag_id': {{ $tag['tag_id'] }},
                'video_id': {{ $tag['video_id'] }},
                'user_id': {{ $tag['user_id'] }},
                'tagName': "{{ $tag['tagName'] }}",
                'start': "{{ $tag['start'] }}",
                'end': "{{ $tag['end'] }}",
                'created_at': "{{ $tag['created_at'] }}",
                'updated_at': "{{ $tag['updated_at'] }}",
                'isEditMode': false,
                'isTimeInputError': false,
                'isTagInputError': false,
                'isEditAjaxError': false,
                'isDeleteAjaxError': false,
            }
        @endforeach
    @endif
</script>
<!-- Scripts -->
<script src="{{ asset('js/video_show.js') }}"></script>
@endsection
