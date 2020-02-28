<?php

use Illuminate\Database\Seeder;

class VideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('videos')->insert([
            [
                'youtubeId' => 'CSpeBhz1wUo',
                'user_id' => 1,
                'url' => 'https://www.youtube.com/watch?v=CSpeBhz1wUo',
                'title' => '筋肉が増える！？細胞核オーバーロードとは？',
                'thumbnail' => 'https://i.ytimg.com/vi/CSpeBhz1wUo/default.jpg',
                'duration' => '00:07:54',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'youtubeId' => '48ev4hqDcQo',
                'user_id' => 1,
                'url' => 'https://www.youtube.com/watch?v=48ev4hqDcQo',
                'title' => '「清々しい程に失敗だった」19歳の宇佐美が挑んだバイエルンで味わった挫折とは？',
                'thumbnail' => 'https://i.ytimg.com/vi/48ev4hqDcQo/default.jpg',
                'duration' => '00:14:40',
                'created_at' => date('Y-m-d H:i:s', strtotime('-1 day')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-1 day')),
            ],
            [
                'youtubeId' => 'ony539T074w',
                'user_id' => 1,
                'url' => 'https://www.youtube.com/watch?v=ony539T074w',
                'title' => 'King Gnu - 白日',
                'thumbnail' => 'https://i.ytimg.com/vi/ony539T074w/default.jpg',
                'duration' => '00:04:40',
                'created_at' => date('Y-m-d H:i:s', strtotime('-2 day')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-2 day')),
            ],
        ]);
    }
}
