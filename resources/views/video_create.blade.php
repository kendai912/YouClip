@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">

                @if (isset($message))
                  {{ $message }}
                @else
                  <div id="app_video_create">
                    <div>動画登録フォーム</div>
                    <form v-if="!videoStored">
                      <div>
                        <div>
                          <label>Youtube動画のURL
                            <input type="text" v-model="url">
                            <div class="error_txt" v-html="errors.url"></div>
                          </label>
                        </div>
                        <div>
                          <button type="button" @click="onSubmit()">登録</button>
                        </div>
                      </div>
                    </form>
                    <div v-if="videoStored">Youtube動画を登録しました！</div>
                  </div>
                  @endif
                </div>
            </div>
        </div>
    </div>
</div> 
    
    <script>
        new Vue({
            el: '#app_video_create',
            data: {
                user_id: '',
                url: '',
                videoStored: false,
                errors: {}
            },
            methods: {
                onSubmit: function() {
                    var self = this;

                    var params = {
                        user_id: {{ $user_id }},
                        url: this.url
                    };
                    this.errors = {};

                    axios.post('/video/store', params)
                        .then(function(response){
                            // 成功した時
                            self.videoStored = true;
                            console.log(response.data.video_id);
                            window.location.href = "/video/play/video_id=" + response.data.video_id + "&tag_id=null&playlist_id=null";
                        })
                        .catch(function(error){
                            // 失敗したとき
                            var errors = {};
                            for(var key in error.response.data.errors) {
                                errors[key] = error.response.data.errors[key].join('<br>');
                            }
                            self.errors = errors;
                        });
                }
            }
        });
    </script>

@endsection