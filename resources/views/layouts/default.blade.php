<!DOCTYPE html>
<html>
<head>
    @include('includes.head')
    @section('post-css')
    @show
</head>

<body class="skin-blue">

<div class="wrapper row-offcanvas row-offcanvas-left">
    <aside class="left-side sidebar-offcanvas">
        <section class="sidebar">
            @include('includes.menu')

            <center style="color: white;"><h4 >Adapto VB0.4 (20161228)</h4><br>Copyright © Adapto.<br> All Rights Reserved</center>
        </section>
    </aside>
    <aside class="right-side">
        <section class="content-header custom-bread-crumb" id="bread-crumb">
            @yield('bread-crumb')
        </section>

        <section class="row">


            <section class="col-md-9 padding-top-10">
                @yield('main-content')
            </section>
            <section class="col-md-3">
                @yield('sub-content')
            </section>
        </section>
    </aside>
</div>

{{ Html::script('resources/js/jquery-1.9.0.min.js') }}
{{ Html::script('resources/js/jquery-ui.js') }}
{{ Html::script('resources/js/bootstrap.min.js') }}
{{ Html::script('resources/js/plugins/alertify.js') }}
{{ Html::script('resources/js/plugins/bootbox.js') }}
{{ Html::script('resources/js/validationRules.js') }}
{{ Html::script('resources/js/plugins/validation/jquery.validate.min.js') }}
{{ Html::script('resources/js/app.js') }}
{{ Html::script('pnotify.custom.min.js') }}
@section('post-js')
@show
<script>
    window.userRole = "msl";
    window.username = "MSL";

    $(document).ready(function () {
        $('.tree').hide();
        // $('.nav-list').hide();
        setTimeout(function () {
            $('.left-side').addClass('menu-back');
        }, 400);

    });

    $('.main-menu-item').click(function () {

        $('.tree').hide();
        $(this).parent().children('ul.tree').toggle(200);
    });
</script>

@if(Session::has('flash.alerts'))
    <script>
    @foreach(Session::get('flash.alerts') as $alert)

         new PNotify({
        title: '{!! $alert['title'] !!}',
        title_escape: false,
        text: '{!! $alert['message'] !!}',
        text_escape: false,
        styling: "bootstrap3",
        type: "{!! $alert['level'] !!}",
        icon: true,
        addclass: "stack-bottomright",
        delay:1500
    });


        @endforeach
            </script>
@endif

</body>
</html>


