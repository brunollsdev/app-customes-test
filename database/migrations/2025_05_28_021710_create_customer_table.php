<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 244);
            $table->string('document', 11)->unique(true);
            $table->enum('gender', ['M', 'F']);
            $table->date('date_birth');
            $table->unsignedBigInteger('address_id');
            $table->timestamps();
            $table->foreign('address_id')->references('id')->on('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['address_id']);
        });

        Schema::dropIfExists('customers');
    }
};
