
<table>
    <tr>
        <td>ID</td>
        <td>name</td>
        <td>Category</td>
    </tr>
<?php


        $categories = DB::table('categories')->where('catalog_id','=',$catalog->id)->get();

        foreach ($categories as $category){
            $subCategories = DB::table('sub_categories')->where('category_id','=',$category->id)->where('is_pack','=',false)->get();
            foreach ($subCategories as $subCategory){

                $products_ = DB::table('sub_category_products')->where('sub_category_id','=',$subCategory->id)->get();
                foreach ($products_ as $product_){
                $products = DB::table('products')->where('id','=',$product_->product_id)->get();
                foreach ($products as $product){
?>
    <tr>
        <td>{!! $product->id !!}</td>
        <td>{!! $product->name !!}</td>
        <td>{!! $category->name !!}</td>
    </tr>
<?php
                }
                }
            }
        }

?>


</table>