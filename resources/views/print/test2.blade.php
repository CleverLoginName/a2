<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
@php
    $img = \App\TemplateImage::find(1);


@endphp
@if($img)
    <img src="{!! $img->path !!}" style="height: 3508px;width:2480px;image-resolution: 300dpi;  transform: rotate(90deg); transform-origin: 50%; ">
@endif