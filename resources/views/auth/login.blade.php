

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Adopto</title>
    {{ Html::style('resources/css/bootstrap.min.css') }}
    {{ Html::style('resources/css/font-awesome.min.css') }}
    {{ Html::style('resources/css/alertify.core.css') }}
    {{ Html::style('resources/css/app.css') }}
    {{ Html::style('resources/css/login-custom.css') }}
    {{ Html::style('resources/css/device-specific.css') }}
    {{ Html::style('resources/css/custom.css') }}
    {{ Html::style('resources/css/validation.css') }}
    {{ Html::style('resources/css/superslides.css') }}


    <link rel="apple-touch-icon" sizes="57x57" href="resources/images/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="resources/images/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="resources/images/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="resources/images/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="resources/images/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="resources/images/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="resources/images/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="resources/images/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="resources/images/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="resources/images/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/images/favicon-16x16.png">

</head>

<body>

<header class="header">
    <div class="logo" style="border-right:none;">
        <img alt="" src="{!! asset('resources/images/logo_new.png') !!}">
    </div>
    <nav class="navbar navbar-static-top" role="navigation">
        <div class="navbar-right navbar-landing">
            <span style="color: white;line-height: 50px;margin-top: 55px;" class="right">
            @if ($errors->has('password'))
                <strong>{{ $errors->first('password') }}</strong>

            @endif
            @if ($errors->has('email'))
                <strong>{{ $errors->first('email') }}</strong>

            @endif
            </span>
            <form name='loginForm' class="landing-login-form" role="form" method="POST" action="{{ url('/login') }}">
                {{ csrf_field() }}
                <label for="username" class="login-label">Email</label>
                <input id="email" type="email" required="required"  class="input input-block-level form-control landing-login-input" name="email" value="{{ old('email') }}">
                <label for="password" class="login-label-2">Password</label>
                <input id="password" type="password" required="required" class="input input-block-level form-control landing-login-input" name="password">
                <input class="btn btn-primary landing-login-btn"
                       name="submit" type="submit" value="Login" />

            </form>
        </div>
    </nav>
</header>
<div class="wrapper row-offcanvas row-offcanvas-left">
    <div id="slides">
        <div class="slides-container">
            <img src="{!! asset('resources/images/1.jpg') !!}" alt="">
            <img src="{!! asset('resources/images/2.jpg') !!}" alt="">
            <img src="{!! asset('resources/images/3.jpg') !!}" alt="">
        </div>
    </div>
</div>

{{ Html::script('resources/js/jquery-1.9.0.min.js') }}
{{ Html::script('resources/js/bootstrap.min.js') }}
{{ Html::script('resources/js/login/signupApp.js') }}
{{ Html::script('resources/js/plugins/alertify.js') }}
{{ Html::script('resources/js/plugins/jquery.superslides.js') }}
{{ Html::script('resources/js/plugins/bootbox.js') }}
{{ Html::script('resources/js/plugins/validation/jquery.validate.min.js') }}
{{ Html::script('resources/js/validationRules.js') }}
{{ Html::script('resources/js/login/login.js') }}
{{ Html::script('resources/js/utils.js') }}
{{ Html::script('resources/js/components/signup/signup.js') }}
</body>
</html>