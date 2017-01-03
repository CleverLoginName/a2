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
        $this->visit('/users')->assertResponseOk();
        $this->visit('/users/create')->assertResponseOk();
        $this->visit('/products')->assertResponseOk();

    }

    public function testMainUrlRedirectToLogin()
    {
        $this->visit('/')->see('loginForm');
    }

}
