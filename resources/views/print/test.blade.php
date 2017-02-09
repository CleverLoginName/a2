<ul>
@foreach($data as $product)
<li>Name :{!! $product->name !!}<br>Price :{!! $product->contractor_price !!}</li>

@endforeach
</ul>