<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Auth;
use Debugbar;
use Carbon\Carbon;
use App\Video;
use App\Tag;
use App\Playlist;
use App\Searchquery;
use App\SearchqueryUser;
use App\Topsearchquery;

class SearchController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    public function searchTag(Request $request)
    {
        //検索ワード
        $searchQuery = $request->searchQuery;

        //検索ワードに一致する動画・タグの全データを外部結合し取得
        $tagVideoResult = Tag::leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->where('tags', 'LIKE', "%$searchQuery%")->orWhere('title', 'LIKE', "%$searchQuery%")->orderBy('tag_created_at', 'desc')->get();
        
        return response()->json(
            [
                'tagVideoResult' => $tagVideoResult
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
    
    public function searchPlaylist(Request $request)
    {
        //検索ワード
        $searchQuery = $request->searchQuery;

        //検索ワードにプレイリスト・タグのデータを取得
        $playlistTagResult = Playlist::with('tags')->where('playlistName', 'LIKE', "%$searchQuery%")->get();

        return response()->json(
            [
                'playlistTagResult' => $playlistTagResult
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function searchCandidates(Request $request)
    {
        //inputを含むタグ名一覧を抽出
        $tagCandidates = Tag::where('tags', 'LIKE', "%$request->input%")->select('tags')->get();
        
        //inputを含むタイトル一覧を抽出
        $titleCandidates = Video::where('title', 'LIKE', "%$request->input%")->select('title')->get();

        //inputをプレイリスト名に含むプレイリスト一覧を抽出
        $playlistCandidates = Playlist::where('playlistName', 'LIKE', "%$request->input%")->select('playlistName')->get();

        //タグ名一覧とタイトル一覧とプレイリスト名をマージ
        $candidates = collect($tagCandidates)->merge($titleCandidates)->merge($playlistCandidates);
        
        return response()->json(
            [
                'candidates' => $candidates
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //検索ワードの履歴データを各テーブルに保存
    public function storeSearchRecord(Request $request)
    {
        //検索クエリテーブルに保存
        $storedSearchquery = $this->storeSearchQuery($request->searchQuery);
        //検索クエリとユーザーの中間ログテーブルに保存
        $this->storeSearchLog($storedSearchquery);
        //人気の検索クエリランキングを更新
        $this->updateTopSearchqueries();

        return response()->json(
            [
                'storedSearchQuery' => $storedSearchquery
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //検索クエリテーブルに保存
    public function storeSearchQuery($searchQuery)
    {
        $searchquery = Searchquery::where('searchQuery', $searchQuery);
        if ($searchquery->get()->isEmpty()) {
            //新規に作成する場合
            $searchquery = new Searchquery;
            $searchquery->searchQuery = $searchQuery;
            $searchquery->save();
            return $searchquery;
        } else {
            //既に検索クエリがテーブルに存在する場合
            $searchquery->update([
                'updated_at' => Carbon::now()
            ]);
            return $searchquery->first();
        }
    }

    //検索クエリとユーザーの中間ログテーブルに保存
    public function storeSearchLog($searchqueryModel)
    {
        //ユーザーがログインしている場合のみ保存対象
        if (Auth::check()) {
            $user = Auth::user();
            $user->searchqueries()->attach(
                ['searchquery_id' => $searchqueryModel->id],
                ['created_at' => Carbon::now()],
            );
        }
    }

    //人気の検索クエリランキングを更新
    public function updateTopSearchqueries()
    {
        $topSearchqueries = [];

        //直近一ヶ月の検索クエリを取得
        $recentSearchqueries = Searchquery::where('created_at', '>=', Carbon::now()->subMonthNoOverflow())->get();
        
        //各検索クエリのユニークユーザー数を取得
        foreach ($recentSearchqueries as $recentSearchquery) {
            $user_id_count = SearchqueryUser::where('searchquery_id', $recentSearchquery->id)->distinct()->count('user_id');
            $topSearchqueries[] = [
                'searchquery_id' => $recentSearchquery->id,
                'user_id_count' => $user_id_count,
            ];
        }

        //TopSearchqueriesテーブルをクリア
        Topsearchquery::query()->delete();

        //TopSearchqueriesテーブルに格納
        foreach ($topSearchqueries as $topSearchquery) {
            $record = new Topsearchquery;
            $record->searchquery_id = $topSearchquery['searchquery_id'];
            $record->user_id_count = $topSearchquery['user_id_count'];
            $record->save();
        }
    }

    //人気の検索ワードを取得
    public function getTopSearchqueries()
    {
        //user_id_countが上位10件を取得
        $topSearchqueryDataArray = Topsearchquery::leftJoin('searchqueries', 'searchqueries.id', '=', 'topsearchqueries.searchquery_id')->select('topsearchqueries.id as topsearchqueries_id', 'topsearchqueries.searchquery_id', 'topsearchqueries.user_id_count', 'searchqueries.created_at')->orderBy('user_id_count', 'DESC')->orderBy('created_at', 'DESC')->take(10)->get();

        //上位10件の検索ワードを取得
        $topSearchqueries = [];
        foreach ($topSearchqueryDataArray as $topSearchqueryData) {
            $topSearchqueries[] = $topSearchqueryData->searchquery->searchQuery;
        }

        return response()->json(
            [
                'topSearchqueries' => $topSearchqueries
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //検索履歴を取得
    public function getSearchHistories()
    {
        //ログインしていなければ何もしない
        if (!Auth::check()) {
            return;
        }

        //直近の検索履歴10件を取得
        $searchHistoryArray = SearchqueryUser::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->distinct()->get();

        //直近10件の検索ワードを取得
        $searchHistories = [];
        $count = 0;
        foreach ($searchHistoryArray as $searchHistoryData) {
            //配列に追加する検索ワード
            $addingSearchQuery = Searchquery::find($searchHistoryData->searchquery_id)->searchQuery;

            //既に同じ検索ワードが配列内にないかチェック
            $duplicate_flag = false;
            foreach ($searchHistories as $searchHistory) {
                $addingSearchQuery == $searchHistory ? $duplicate_flag = true : "";
            }

            //重複がなければ10件まで追加
            if (!$duplicate_flag && $count < 10) {
                $searchHistories[] = $addingSearchQuery;
                $count++;
            }

            // $array_value = array_count_values($searchHistories);
            // if ($array_value[$addingSearchQuery] == 0) {
            //     $searchHistories[] = $addingSearchQuery;
            // }
        }

        return response()->json(
            [
                'searchHistories' => $searchHistories
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
