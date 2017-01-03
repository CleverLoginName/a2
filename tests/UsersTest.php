<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use \App\User;

class UsersTest extends TestCase
{
    

    public function testUserIndex()
    {
        $user = new User(array('name' => 'John'));
        $this->be($user);

        $this->visit('/users')
            ->see('System Administrator')
            ->see('Consultant');
    }

    public function testUserCreate()
    {
        $user = new User(array('name' => 'John1'));
        $this->be($user);

        $this->visit('/users/create')
            ->type('Damith','first_name' )
            ->type('Harischandrathilaka','last_name')
            ->type('bqudamith@gmail.com','email')
            ->type('0718219616','mobile')
            ->type('Harischandrathilaka','last_name')
            ->type('123123','password')
            ->type('123123','password_confirm')
            ->select(1,'role_id')
            ->press('Add')
            ->see('Damith')
            ->see('Harischandrathilaka')
            ->seePageIs('/users');
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
