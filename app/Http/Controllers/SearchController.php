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

    public function searchTag(Request $request)
    {
        //検索ワード
        $searchQuery = $request->searchQuery;

        //ページネーション設定
        $contentsPerPage = 2;

        //検索ワードに一致する動画・タグの全データを外部結合し取得
        $tagVideoResult = Tag::leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->where('tags', 'LIKE', "%$searchQuery%")->orWhere('title', 'LIKE', "%$searchQuery%")->orderBy('tag_created_at', 'desc')->paginate($contentsPerPage);
        
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

        //ページネーション設定
        $contentsPerPage = 2;

        //検索ワードにプレイリスト・タグのデータを取得
        $playlistTagResult = Playlist::with('tags')->where('playlistName', 'LIKE', "%$searchQuery%")->paginate($contentsPerPage);

        return response()->json(
            [
                'playlistTagResult' => $playlistTagResult
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //inputを元に検索キーワード候補を抽出
    public function getSearchCandidates(Request $request)
    {
        $input = $request->input('input');
      
        //人気の検索キーワードからサジェストを取得
        $topSearchqueriesCandidates = Topsearchquery::whereIn('searchquery_id', function ($query) use ($input) {
            $query->from('searchqueries')->where('searchQuery', 'LIKE', "%$input%")->select('id')->get();
        })->with('searchquery')->orderBy('user_id_count', 'desc')->get();

        if (!Auth::check()) {
            //ログインしていない場合は、人気の検索キーワードのサジェストのみ返却
            $searchCandidates["searchHistoryCandidates"] = "";
            $searchCandidates["topSearchqueriesCandidates"] = $topSearchqueriesCandidates;

            return response()->json(
                [
                    'searchCandidates' => $searchCandidates,
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            //ログインしている場合は、過去の検索履歴からもサジェストを取得
            $searchHistoryCandidates = Auth::user()->searchqueries()->where('searchQuery', 'LIKE', "%$input%")->select('searchQuery')->distinct()->get();
            
            $searchCandidates["searchHistoryCandidates"] = $searchHistoryCandidates;
            $searchCandidates["topSearchqueriesCandidates"] = $topSearchqueriesCandidates;

            //ログインしている場合は、人気の検索キーワード＋過去の検索履歴のサジェストを返却
            return response()->json(
                [
                    'searchCandidates' => $searchCandidates,
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
    // //inputを元に検索履歴から検索キーワード候補を抽出
    // public function getSearchHistoryCandidates(Request $request)
    // {
    //     //ログインしていない場合は空欄を返す
    //     if (!Auth::check()) {
    //         return response()->json(
    //             [
    //             'searchHistoryCandidates' => ""
    //         ],
    //             200,
    //             [],
    //             JSON_UNESCAPED_UNICODE
    //         );
    //     }

    //     $input = $request->input('input');
    //     $searchHistoryCandidates = Auth::user()->searchqueries()->where('searchQuery', 'LIKE', "%$input%")->select('searchQuery')->get();

    //     return response()->json(
    //         [
    //             'searchHistoryCandidates' => $searchHistoryCandidates
    //         ],
    //         200,
    //         [],
    //         JSON_UNESCAPED_UNICODE
    //     );
    // }
    // //inputを元に人気の検索から検索キーワード候補を抽出
    // public function getTopSearchqueriesCandidates(Request $request)
    // {
    //     $input = $request->input('input');
    //     $topSearchqueriesCandidates = Topsearchquery::whereIn('searchquery_id', function ($query) use ($input) {
    //         $query->from('searchqueries')->where('searchQuery', 'LIKE', "%$input%")->select('id')->get();
    //     })->with('searchquery')->orderBy('user_id_count', 'desc')->get();

    //     return response()->json(
    //         [
    //             'topSearchqueriesCandidates' => $topSearchqueriesCandidates
    //         ],
    //         200,
    //         [],
    //         JSON_UNESCAPED_UNICODE
    //     );
    // }

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

    //(直近1ヶ月の)人気の検索ワードを取得
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
        //未ログインなら何もしない
        if (!Auth::check()) {
            return;
        }

        //検索履歴を取得
        $searchHistoryArray = SearchqueryUser::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->distinct()->get();

        //直近10件の検索履歴を取得
        $searchHistories = [];
        $count = 0;
        foreach ($searchHistoryArray as $searchHistoryData) {
            //配列に追加する検索履歴をセット
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
