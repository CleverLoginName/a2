<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class URLTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testUrls()
    {
        $this->visit('/')->assertResponseOk();
        $this->visit('/login')->assertResponseOk();

    }

    public function testMainUrlRedirectToLogin()
    {
        $this->visit('/')->see('loginForm');
    }

}
