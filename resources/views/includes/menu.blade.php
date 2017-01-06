<style>
    .nav > li > a {
        padding: 10px 15px 15px 35px;
    }

    .hid{
        display:none;
    }
    .white-background{
        background-color: white;
        color: black;
    }
    .sub-menu-item-text{
        color: black;
    }
    .nav > li > a:hover, .nav > li > a:focus{
        background-color: blue;
    }
    .nav > li > a:hover, .nav > li > a:focus{
        background-color: blue;
    }
    .sub-left-menu-item:hover{
        background-color: white !important;
    }
    .sub-left-menu-item:hover > span{
        color: blue !important;
    }
    .skin-blue .sidebar > .sidebar-menu > li:hover{
        background-color: blue;
    }

    .skin-blue .sidebar > .sidebar-menu > li:hover >{
        background-color: blue;
    }

    #menu_home_icon{
        background-image: "{{ URL::asset('resources/images/White/home.png') }}";
    }
    #menu_home_icon:hover{
        background-image: "{{ URL::asset('resources/images/Blue/home.png') }}";
    }
    #menu_project_icon{}
</style>

<ul class="nav nav-list sidebar-menu">
    <li class="dashboard main-left-menu-item">
        <a class="main-menu-item" id="Home" href="{!! url("/dashboard") !!}">
            <img class="main-menu-icon" id="menu_home_icon" src="{{ URL::asset('resources/images/home_ico_white.png') }}">
            <span class="main-menu-item-text">Home</span>
            <span class="menu-selected-item"></span></a>
    </li>
    <li class="projects main-left-menu-item">
        <a class="main-menu-item tree-toggle" id="Projects">
            <img class="main-menu-icon" id="menu_project_icon" src="{{ URL::asset('resources/images/project_ico_white.png') }}">
            <span class="main-menu-item-text">Projects</span>
            <span class="menu-selected-item"></span>
        </a>
        <ul class="nav nav-list tree hid white-background">
                <li>
                    <a class="main-menu-item sub-left-menu-item" id="Products" href="{!! url("/projects/create") !!}">
                        <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                        <span class="main-menu-item-text sub-menu-item-text">New</span>
                    </a>
                </li>
                <li>
                    <a class="main-menu-item sub-left-menu-item" id="Products" href="{!! url("/projects") !!}">
                        <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                        <span class="main-menu-item-text sub-menu-item-text">Search</span>
                    </a>
                </li>
        </ul>
    </li>
    <li class="products main-left-menu-item">
        <a class="main-menu-item tree-toggle" id="Products">
            <img class="main-menu-icon" src="{{ URL::asset('resources/images/products_ico_white.png') }}">
            <span class="main-menu-item-text">Products</span>
            <span class="menu-selected-item"></span>
        </a>

        <ul class="nav nav-list tree hid white-background">
            @if(Auth::user()->can('create-products'))
                <li>
                    <a class="main-menu-item sub-left-menu-item" id="Products" href="{!! url("/products/create") !!}">
                        <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                        <span class="main-menu-item-text sub-menu-item-text">New</span>
                    </a>
                </li>
            @endif
            @if(Auth::user()->can('view-products'))
                <li>
                    <a class="main-menu-item sub-left-menu-item" id="Products" href="{!! url("/products") !!}">
                        <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                        <span class="main-menu-item-text sub-menu-item-text">Search</span>
                    </a>
                </li>@endif
        </ul>
    </li>

    <li class="templates main-left-menu-item">
        <a class="main-menu-item tree-toggle" id="Templates">
            <img class="main-menu-icon" src="{{ URL::asset('resources/images/White/plan.png') }}">
            <span class="main-menu-item-text">Templates</span>
            <span class="menu-selected-item"></span>
        </a>


        <ul class="nav nav-list tree hid white-background">
            <li>
                <a class="main-menu-item sub-left-menu-item" id="Users" href="{!! url("/templates/create") !!}">
                    <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                    <span class="main-menu-item-text sub-menu-item-text">New</span>
                </a>
            </li>
            <li>
                <a class="main-menu-item sub-left-menu-item" id="Users" href="{!! url("/templates") !!}">
                    <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                    <span class="main-menu-item-text sub-menu-item-text">Search</span>
                </a>
            </li>
        </ul>
    </li>

    <li class="users main-left-menu-item">
        <a class="main-menu-item tree-toggle" id="Users">
            <img class="main-menu-icon" src="{{ URL::asset('resources/images/White/profile.png') }}">
            <span class="main-menu-item-text">Users</span>
            <span class="menu-selected-item"></span>
        </a>


        <ul class="nav nav-list tree hid white-background">
            <li>
                <a class="main-menu-item sub-left-menu-item" id="Users" href="{!! url("/users/create") !!}">
                    <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                    <span class="main-menu-item-text sub-menu-item-text">New</span>
                </a>
            </li>
            <li>
                <a class="main-menu-item sub-left-menu-item" id="Users" href="{!! url("/users") !!}">
                    <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                    <span class="main-menu-item-text sub-menu-item-text">Search</span>
                </a>
            </li>
            <li>
                <a class="main-menu-item sub-left-menu-item" id="Users" href="{!! url("/users/roles") !!}">
                    <img class="main-menu-icon" src="{{ URL::asset('resources/images/62.png') }}">
                    <span class="main-menu-item-text sub-menu-item-text">Roles</span>
                </a>
            </li>
        </ul>
    </li>


    <li class="profile main-left-menu-item">
        <a class="main-menu-item tree-toggle" id="profile" href="{!! url("/profile") !!}">
            <img class="main-menu-icon" src="{{ URL::asset('resources/images/prof_ico_white.png') }}">
            <span class="main-menu-item-text">My Profile</span>
            <span class="menu-selected-item"></span>
        </a>
    </li>

</ul>