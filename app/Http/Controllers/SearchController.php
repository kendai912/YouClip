<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Auth;
use Carbon\Carbon;
use App\Video;
use App\Tag;
use App\Playlist;
use App\Searchquery;
use App\SearchqueryUser;
use App\Topsearchquery;
use GuzzleHttp\Client;
use Exception;

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
        $contentsPerPage = 5;

        //検索ワードに一致する動画・タグの全データを外部結合し取得
        $tagVideoResult = Tag::leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at', 'view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at', 'privacySetting')->where('privacySetting', 'public')->where(function ($query) use ($searchQuery) {
            $query->where('tags', 'LIKE', "%$searchQuery%")->orWhere('title', 'LIKE', "%$searchQuery%");
        })->orderBy('tag_created_at', 'desc')->paginate($contentsPerPage);
        
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
        $contentsPerPage = 5;

        //検索ワードにプレイリスト・タグのデータを取得
        $playlistTagResult = Playlist::with('tags')->where('privacySetting', 'public')->where('playlistName', 'LIKE', "%$searchQuery%")->paginate($contentsPerPage);

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
        $input = $request->input;
        $searchOption = $request->searchOption;

        //人気の検索キーワードからサジェストを取得
        $topSearchqueriesCandidates = Topsearchquery::whereIn('searchquery_id', function ($query) use ($input, $searchOption) {
            $query->from('searchqueries')->where('searchQuery', 'LIKE', "%$input%")->where('searchOption', $searchOption)->select('id')->get();
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
            $searchHistoryCandidates = Auth::user()->searchqueries()->where('searchQuery', 'LIKE', "%$input%")->where('searchOption', $searchOption)->select('searchQuery')->distinct()->get();
            
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

    // //検索ワードの履歴データを各テーブルに保存
    // public function storeSearchRecord(Request $request)
    // {
    //     //検索クエリテーブルに保存
    //     // $storedSearchquery = $this->storeSearchQuery($request->searchQuery, $request->searchOption);
    //     // //検索クエリとユーザーの中間ログテーブルに保存
    //     // $this->storeSearchLog($storedSearchquery);
    //     // //人気の検索クエリランキングを更新
    //     // $this->updateTopSearchqueries($request->searchOption);

    //     return response()->json(
    //         [
    //             'storedSearchQuery' => '$storedSearchquery'
    //         ],
    //         201,
    //         [],
    //         JSON_UNESCAPED_UNICODE
    //     );
    // }
    //検索ワードの履歴データを各テーブルに保存
    public function storeSearchRecord(Request $request)
    {
        //検索クエリテーブルに保存
        $storedSearchquery = $this->storeSearchQuery($request->searchQuery, $request->searchOption);
        //検索クエリとユーザーの中間ログテーブルに保存
        $this->storeSearchLog($storedSearchquery);
        //人気の検索クエリランキングを更新
        $this->updateTopSearchqueries($request->searchOption);

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
    public function storeSearchQuery($searchQuery, $searchOption)
    {
        $searchquery = Searchquery::where('searchQuery', $searchQuery)->where('searchOption', $searchOption);
        if ($searchquery->get()->isEmpty()) {
            //新規に作成する場合
            $searchquery = new Searchquery;
            $searchquery->searchQuery = $searchQuery;
            $searchquery->searchOption = $searchOption;
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
                ['created_at' => Carbon::now()]
            );
        }
    }

    //人気の検索クエリランキングを更新
    public function updateTopSearchqueries($searchOption)
    {
        $topSearchqueries = [];

        //直近一ヶ月の検索クエリを取得
        $recentSearchqueries = Searchquery::where('created_at', '>=', Carbon::now()->subMonthNoOverflow())->where('searchOption', $searchOption)->get();
        
        //各検索クエリのユニークユーザー数を取得
        foreach ($recentSearchqueries as $recentSearchquery) {
            $user_id_count = SearchqueryUser::where('searchquery_id', $recentSearchquery->id)->distinct()->count('user_id');
            $topSearchqueries[] = [
                'searchquery_id' => $recentSearchquery->id,
                'user_id_count' => $user_id_count,
                'searchOption' => $recentSearchquery->searchOption
            ];
        }

        //TopSearchqueriesテーブルをクリア
        Topsearchquery::where('searchOption', $searchOption)->delete();

        //TopSearchqueriesテーブルに格納
        foreach ($topSearchqueries as $topSearchquery) {
            $record = new Topsearchquery;
            $record->searchquery_id = $topSearchquery['searchquery_id'];
            $record->user_id_count = $topSearchquery['user_id_count'];
            $record->searchOption = $topSearchquery['searchOption'];
            $record->save();
        }
    }

    //(直近1ヶ月の)人気の検索ワードを取得
    public function getTopSearchqueries(Request $request)
    {
        $searchOption = $request->searchOption;
        //user_id_countが上位5件を取得
        $topSearchqueryDataArray = Topsearchquery::leftJoin('searchqueries', 'searchqueries.id', '=', 'topsearchqueries.searchquery_id')->select('topsearchqueries.id as topsearchqueries_id', 'topsearchqueries.searchquery_id', 'topsearchqueries.user_id_count', 'searchqueries.created_at')->where('topsearchqueries.searchOption', $searchOption)->orderBy('user_id_count', 'DESC')->orderBy('created_at', 'DESC')->take(5)->get();

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
    public function getSearchHistories(Request $request)
    {
        //未ログインなら何もしない
        if (!Auth::check()) {
            return;
        }
        $searchOption = $request->searchOption;

        //検索履歴を取得
        $searchHistoryArray = SearchqueryUser::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->distinct()->get();

        //直近5件の検索履歴を取得
        $searchHistories = [];
        $count = 0;
        foreach ($searchHistoryArray as $searchHistoryData) {
            //配列に追加する検索履歴をセット
            $addingSearchQuery = Searchquery::find($searchHistoryData->searchquery_id)->where('searchOption', $searchOption)->first();

            if ($addingSearchQuery) {
                $addingSearchQuery = $addingSearchQuery->searchQuery;
                //既に同じ検索ワードが配列内にないかチェック
                $duplicate_flag = false;
                foreach ($searchHistories as $searchHistory) {
                    $addingSearchQuery == $searchHistory ? $duplicate_flag = true : "";
                }

                //重複がなければ10件まで追加
                if (!$duplicate_flag && $count < 5) {
                    $searchHistories[] = $addingSearchQuery;
                    $count++;
                }
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
    //get Youtube Search from google API
    public function getYTSearchList(Request $request)
    {
        $apiUrl = $request->apiUrl;
        $params = $request->params;
        $client = new Client();
        try {
            $res = $client->get($apiUrl, [
                'verify' => false,
                'query' => $params
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getResponse()->getBody());
        }
        return $res->getBody();
    }
    //get Youtube Search Results from scraping API
    public function getYTScrapingResultList(Request $request)
    {
        $apiUrl = $request->apiUrl;
        $params = $request->params;
        $client = new Client();
        try {
            $res = $client->get($apiUrl, [
                'verify' => false,
                'query' => $params
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getResponse()->getBody());
        }
        return $res->getBody();
    }
}
