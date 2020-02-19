<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Anh Thu',
            'email' => 'thudo24h@gmail.com',
            'password' => bcrypt('12341234'), // secret
            'remember_token' => str_random(5),
        ]);
        factory(User::class, 3)->create();
    }
}
