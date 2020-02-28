<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'tester1',
                'email' => 'test@test.com',
                'password' => '$2y$10$18ZWgsCYAlms/TRdA1yknOfRg936IXeF1OhERFEwyT3ysx3hoo3Ta', //testtest
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'tester2',
                'email' => 'user@test.com',
                'password' => '$2y$10$18ZWgsCYAlms/TRdA1yknOfRg936IXeF1OhERFEwyT3ysx3hoo3Ta', //testtest
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
