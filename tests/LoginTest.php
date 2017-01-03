<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoginTest extends TestCase
{
    

    public function testLogin()
    {
        $this->visit('/login')
            ->type('admin@seebo.com.au','email' )
            ->type('123','password')
            ->press('Login')
            ->seePageIs('/dashboard');
    }

    public function testLoginWithWrongUserNameOrPassword()
    {
        $this->visit('/login')
            ->type('abc@seebo.com.au','email' )
            ->type('123','password')
            ->press('Login')
            ->seePageIs('/login')
            ->see('These credentials do not match our records.');
    }

}
