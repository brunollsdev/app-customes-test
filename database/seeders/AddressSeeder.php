<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("address")->insert([
            [
                "zip_code" => "74922701",
                "city" => "Aparecida de Goiânia",
                "state" => "GO",
                "street" => "Rua das Orquídeas",
                "complement" => "Casa 12"
            ],
            [
                "zip_code" => "01001000",
                "city" => "São Paulo",
                "state" => "SP",
                "street" => "Praça da Sé",
                "complement" => "Prédio Central"
            ],
            [
                "zip_code" => "01310930",
                "city" => "São Paulo",
                "state" => "SP",
                "street" => "Avenida Paulista",
                "complement" => "Conjunto 405"
            ],
            [
                "zip_code" => "20040002",
                "city" => "Rio de Janeiro",
                "state" => "RJ",
                "street" => "Rua da Quitanda",
                "complement" => "Sala 101"
            ],
            [
                "zip_code" => "20271110",
                "city" => "Rio de Janeiro",
                "state" => "RJ",
                "street" => "Rua Haddock Lobo",
                "complement" => "Apartamento 702"
            ],
            [
                "zip_code" => "30140071",
                "city" => "Belo Horizonte",
                "state" => "MG",
                "street" => "Avenida Afonso Pena",
                "complement" => "Apartamento 502"
            ],
            [
                "zip_code" => "80010000",
                "city" => "Curitiba",
                "state" => "PR",
                "street" => "Rua XV de Novembro",
                "complement" => "Loja 03"
            ],
            [
                "zip_code" => "70040900",
                "city" => "Brasília",
                "state" => "DF",
                "street" => "Esplanada dos Ministérios",
                "complement" => "Bloco B"
            ]
        ]);
    }
}
