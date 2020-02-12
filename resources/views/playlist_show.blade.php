@extends('layouts.app')

@section('content')
 <div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="app_playlist_show">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                      <div v-for="playlist in playlists">
                        <a v-bind:href="'/video/play/video_id=' + playlist.first_video_id + '&tag_id=' + playlist.first_tag_id + '&playlist_id=' + playlist.playlist_id">@{{ playlist.playlist_name }}</a>
                      </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    //Playlist情報(配列)
    let playlistArray = [];
    @foreach($playlists as $key => $playlist)
        playlistArray[{{ $key }}] = {
            'playlist_id': {{ $playlist['id'] }},
            'playlist_name': "{{ $playlist['playlistName'] }}",
            'first_video_id': "",
            'first_tag_id': "",
        }
    @endforeach

    new Vue({
        el: '#app_playlist_show',
        data: {
            playlists: playlistArray,
            errors: {}
        },
        mounted: function() {
          var self = this;
          this.errors = {};
          var params = {
            playlists: this.playlists
          };

          axios.post('/playlist/getFirstTagVideoIds', params)
              .then(function(response){
                  // 成功した時
                  self.playlists = response.data.playlists;
                  console.log(self.playlists);
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
    });
</script>

@endsection