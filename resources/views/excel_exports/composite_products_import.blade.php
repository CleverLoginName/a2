<style>
    .center {
        margin: auto;
        width: 50%;
        border: 3px solid green;
        padding: 10px;
    }
</style>
<?php

$products_custom_field_names = DB::table('custom_field_sub_categories')
        ->where('custom_field_sub_categories.sub_category_id','=',$sub_category->id)
        ->get();

        $categoryName = DB::table('categories')->where('id','=',$sub_category->category_id)->first();
        if($categoryName){
            $catalogName = DB::table('catalogs')->where('id','=',$categoryName->catalog_id)->first();
            $categoryName = $categoryName->name;


            if($catalogName){
            $catalogName= $catalogName->name;
                }else{
                $catalogName= '';
            }
        }else{
            $categoryName = '';}


$products_custom_field_count = DB::table('custom_field_sub_categories')
        ->where('custom_field_sub_categories.sub_category_id','=',$sub_category->id)
        ->count();
        $total_column_count = $products_custom_field_count+10;
?>
<table>
    <tr>
        <td colspan="{!! $total_column_count !!}" style="background-color: #fcfcd6;">Product Import Sheet
        </td>
    </tr>
    <tr><td colspan="2">Catalog</td><td colspan="3">{!! $catalogName !!}</td><td colspan="{!! ($total_column_count-5) !!}"></td> </tr>
    <tr><td colspan="2">Category</td><td colspan="3">{!! $categoryName !!}</td><td colspan="{!! ($total_column_count-5) !!}"></td> </tr>
    <tr><td colspan="2">Sub-Category</td><td colspan="3">{!! $sub_category->name !!}</td><td colspan="{!! ($total_column_count-5) !!}"></td> </tr>


<tr>
    <td>name</td>
    <td>description</td>
    <td>builder code</td>
    <td>pronto code</td>
    <td>Image name</td>
    <td>Manufacturing Product Code</td>
    <td>Builder Price (Incl GST)</td>
    <td>Supplier Price (Exc GST)</td>
    <td>Contractor Price (Exc GST)</td>
    <td>Discount</td>
    <td>Symbol Name</td>
    <td>Quantity</td>
    <td>Supplier</td>
@foreach($products_custom_field_names as $products_custom_field_name)

        <td>{!! $products_custom_field_name->name !!}</td>
@endforeach

    <td>Product ID</td>
</tr>

</table>