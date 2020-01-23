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
                        <search-result></search-result>
                    </div>
                    {{-- <div id="searchResults"></div> --}}
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // //append用のHTML作成
    // let videoSecHTML = "";
    // videoSecHTML += '<div class="videoSec">';
    // videoSecHTML += ' <div class="topIframeBox">';
    // videoSecHTML +='   <iframe class="topIframe" src="https://www.youtube.com/embed/mlC_rBUpusc"></iframe>';
    // videoSecHTML += ' </div>';
    // videoSecHTML += '</div>';

    // //HTMLへappend実行
    // $("#searchResults").append(videoSecHTML);

    //動画一覧コンポーネント
    Vue.component('search-result', {
        template: `
            <div class="videoSec">
                <div class="topIframeBox">
                    <iframe class="topIframe" src="https://www.youtube.com/embed/mlC_rBUpusc"></iframe>
                </div>
            </div>`
    })

    new Vue({
        el: "#app-home",
    })
</script>
@endsection
