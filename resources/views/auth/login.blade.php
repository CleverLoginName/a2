

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Adopto</title>
    {{ Html::style('resources/css/bootstrap.min.css') }}
    {{ Html::style('resources/css/font-awesome.min.css') }}
    {{ Html::style('css/login/navbar-fixed-side.css') }}
    {{ Html::style('css/login/common.css') }}

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
{{--<div class="wrapper row-offcanvas row-offcanvas-left">--}}

{{--</div>--}}
<div class="container-fluid">

        <body> <div id="slides">
            <div class="slides-container">
                <img src="{!! asset('resources/images/1.jpg') !!}" alt="">
                <img src="{!! asset('resources/images/2.jpg') !!}" alt="">
                <img src="{!! asset('resources/images/3.jpg') !!}" alt="">
            </div>
        </div>    <div class="wrapper row-offcanvas row-offcanvas-left">

        </div>
        <!-- ========================= LOGING FORM ============================ -->

        <div class="modal fade common_popup new_Project_popup" id="myModal" role="dialog" style="overflow: hidden"
             data-backdrop="static"
             data-keyboard="false" >
            <div class="modal-dialog">
                <div class="loging_form">
                    <img  class="brand_logo" src="{!! asset('resources/images/logo_login.png') !!}"/>
                    <form name='loginForm' class="landing-login-form" role="form" method="POST" action="{{ url('/login') }}">
                        <input id="email" type="email" required="required"  placeholder="Email" class="input_name" name="email" value="{{ old('email') }}">
                        <input id="password" type="password" required="required" class="input_pass" placeholder="Password"  name="password">
                        <input type="checkbox" name="remember" class="input_checkd_box">
                        Stay Signed In?
                        <button class="btn_lg" type="submit">Login</button>
                        <p class="frogot_pass"><a href="{{ url('/password/reset') }}">Forgot Your Password?</a></p>
                        <p class="copyright_txt">© Copyright 2017 - Adapto Technology Pty Limited (ACN 608 530 669)</p>
                    </form>
                </div>
            </div>
        </div>

        <!-- ========================= LOGING FORM ============================ -->
        </body>
</div>



{{ Html::script('resources/js/jquery-1.9.0.min.js') }}
{{ Html::script('resources/js/bootstrap.min.js') }}
{{ Html::script('js/login/adaptive_leftNav.js') }}
{{ Html::script('resources/js/plugins/jquery.superslides.min.js') }}
{{ Html::script('resources/js/login/login.js') }}
<script>
    // window.addEventListener("hashchange", function(e) {
    history.pushState(null, null, window.location.pathname);
    // })
</script>
</html>