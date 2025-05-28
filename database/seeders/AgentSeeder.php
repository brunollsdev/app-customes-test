<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("agents")->insert([
            [
                "name" => "Agent 1",
                "email" => "agent1@test.com",
                "address_id" => 1,
            ],
            [
                "name" => "Agent 2",
                "email" => "agent2@test.com",
                "address_id" => 2,
            ],
            [
                "name" => "Agent 3",
                "email" => "agent3@test.com",
                "address_id" => 3,
            ],
            [
                "name" => "Agent 4",
                "email" => "agent4@test.com",
                "address_id" => 4,
            ],
            [
                "name" => "Agent 5",
                "email" => "agent5@test.com",
                "address_id" => 5,
            ],
            [
                "name" => "Agent 6",
                "email" => "agent6@test.com",
                "address_id" => 6,
            ],
            [
                "name" => "Agent 7",
                "email" => "agent7@test.com",
                "address_id" => 7,
            ],
            [
                "name" => "Agent 8",
                "email" => "agent8@test.com",
                "address_id" => 8,
            ]
        ]);
    }
}
