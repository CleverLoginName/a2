<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Mail;
use App\Http\Requests;

class MailTestController extends Controller
{
    public function mailsend(){
        $user = User::findOrFail(1);
        Mail::send('emails.test', ['user' => $user], function ($m) use ($user) {
            $m->from('admin@test.adapto.com.au', 'Adapto');

            $m->to('damith.harischandrathilaka@seebo.com.au', 'Damith')->subject('Cool Buddy!!');
        });
    }
}
