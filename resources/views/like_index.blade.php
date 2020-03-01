@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="app-like_show">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <like-list v-bind:likes="likes"></like-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
//Controllerから受け取った変数をJSの変数に格納
let likes = [];
let originalTagName;
let tagNameArray;
@foreach ($likes as $key => $like)
    //タグ名はスペースで分割したものを配列に格納
    originalTagName = "{{ $like[0]->tags }}"
    tagNameArray = originalTagName.split(/[\s| |　]/);

    likes[{{ $key }}] = {
        'video_id': {{ $like[0]->video_id }},
        'youtubeId': "{{ $like[0]->youtubeId }}",
        'url': "{{ $like[0]->url }}",
        'title': "{{ $like[0]->title }}",
        'thumbnail': "{{ $like[0]->thumbnail }}",
        'duration': "{{ $like[0]->duration }}",
        'tag_id': {{ $like[0]->tag_id }},
        'tags': "{{ $like[0]->tags }}",
        'tagNameArray': tagNameArray,
        'start': "{{ $like[0]->start }}",
        'end': "{{ $like[0]->end }}",
    }
@endforeach

//--------------------------------------------------------------------
// 動画一覧コンポーネント
//--------------------------------------------------------------------
    Vue.component('like-list', {
        template: `
            <div>
                <div v-for="(like, index) in likes" v-bind:key="like.tag_id" v-on:click="handleClick" v-bind:data-like-index="index">
                    <div>
                        <img v-bind:src="like.thumbnail">
                    </div>
                    <div>
                        <div>@{{ like.title }}</div>
                        <p>@{{ convertToMinSec(like.start) }}〜@{{ convertToMinSec(like.end) }} <span v-for="tagNameSeparetedBySpace in like.tagNameArray" class="tag">@{{ tagNameSeparetedBySpace }}</span></p>
                    </div>
                </div>
            </div>`,
        props: {
            likes: {
                type: Array
            }
        },
        methods: {
            handleClick: function(e){
                let index = e.currentTarget.getAttribute("data-like-index");
                window.location.href = "{{ url('/video/play/video_id=') }}" + this.likes[index].video_id + "&tag_id=" + this.likes[index].tag_id + "&playlist_id=null";
            },
             convertToMinSec: function(His) {
                let min = parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
                let sec = parseInt(His.split(":")[2], 10);
                return min + ":" + sec;
            },
        }
    })

    new Vue({
        el: "#app-like_show",
        data: {
            likes: likes,
        },
        methods: {
        }
    })
</script>
@endsection
