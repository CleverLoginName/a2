

<head>
    <title>Print Table</title>
    <style>

        /*======================== PAGE 1 CSS =============================*/

        body, ul, li, ol, h1, h2, h3, h4, h5, p {
            margin: 0;
            padding: 0;
            font-family: myFont;
        }
        h1, h2, h3, h4, h5 {
            font-family: extB;
        }
        .bld {font-family: extB}
        .bld_price{ font-family: extB; font-size:30px;}
        table td {	vertical-align: top;color: #404342}
        .tbl_authorise td {	vertical-align: middle}
        .common_padding {padding: 30px 30px 0px 10px;}
        .tbl_main {
            border-bottom: 5px solid #bdbdbd;
            width: 1140px;
        }
        .tbl_main th {
            background: #404342;
            padding: 20px 20px 20px 5px;
            text-align: left;
            font-size: 32px;
            font-weight: normal;
            color: #fff;
        }
        .tbl_top td ul {list-style: none;}
        .tbl_top td ul li {
            background: none !important;
            padding-left: 0px !important
        }
        .tbl_main td {
            border: 5px solid #bdbdbd;
            border-top: none;
            border-bottom: none;
        }
        .tbl_top td {border: none}
        .tbl_top td {
            padding: 30px 30px 0px 10px;
            font-size: 20px;
        }
        .tbl_main td p {margin-bottom: 20px;font-size: 18px;}
        .tbl_main td ul {
            margin-bottom: 30px;
            font-size: 18px;
            list-style: none
        }
        .tbl_main td ul li {
            padding-left: 30px;
        }
        .tbl_top td:first-child {border-right: 5px solid #bdbdbd}
        .tbl_authorise td {	padding-right: 20px;}
        .tbl_authorise td img {	border: 5px solid #fff;}
        .logo {
            text-align: right;
            width: 1140px;
            padding-top: 45px;
            padding-bottom: 20px;
        }
        .tbl_authorise td {font-size: 20px;}
        .wr_footer {bottom: 0;width: 1150px;
        }
        .footer_stripe {
            padding: 20px;
            background: #bdbdbd;
            margin-top: -27px;
        }
        .end_long {
            width:1800px !important;text-align:right; width:1150px; color:#4a4a4a;
        }
        /*======================== PAGE 1 CSS END=============================*/


        /*======================== PAGE 2 CSS =============================*/

        .tbl_BillOfMaterials{ border:none !important; border-collapse:collapse}
        .tbl_BillOfMaterials th{
            padding:0px !important;
            font-size:20px; font-weight:normal;
            background:#bdbdbd;
            color:#6c6c6c;
            border:1px solid #fff;
            padding:4px !important;
        }
        .tbl_BillOfMaterials th:last-child{border-right:none !important}
        .tbl_BillOfMaterials th:first-child{border-left:none !important}

        .tbl_BillOfMaterials td{ border:1px solid #c3c3c3 ; padding:4px; border-top:none; border-bottom:none !important}
        .tbl_BillOfMaterials tr:nth-child(odd) td {
            background: #d6d6d6;
        }
        .txtSmall{font-size:14px}
        /*======================== PAGE 2 CSS END =============================*/


        /*======================== PAGE 3 CSS =============================*/

        .tbl_product_display{ margin-bottom:7px;}
        .tbl_product_display th{
            padding:0px !important;
            font-size:20px; font-weight:normal;
            background:#fff;
            color:#6c6c6c;
            border:1px solid #fff;
            padding:4px !important;
        }
        .tbl_product_display td{ border:0; widow:80%; padding:4px; border-top:none; border-bottom:none !important}
        .tbl_product_display th {width:12%}
        .tbl_product_display img{ width:100%;}

        /*======================== PAGE 3 CSS END =============================*/


        /*======================== PAGE 4 CSS =============================*/

        .wr_img{ width:195px; float:left;border:3px solid #444444; margin-left:5px; margin-top:20px;}
        .wr_productDetails {float:left; margin:0; border-left:none !important; background:#bdbdbd; width:325px;}
        .wr_productDetails ul li{ background:none !important; padding:0 !important;}
        .wr_productDetails ul{ margin:0px !important}
        .wr_productDetails{ padding:10px; border:3px solid #444444; margin-top: 42px;}



        /*======================== PAGE 4 CSS END =============================*/

        .tbl_plan_Instructions {
            /*border-bottom: 5px solid #bdbdbd;*/
            width: 1800px;
        }
        .tbl_plan_Instructions th {
            background: #404342;
            padding: 20px 5px 0px 5px;
            text-align: left;
            font-size: 32px;
            font-weight: normal;
            color: #fff;
        }
        .tbl_plan_Instructions td {
            border-top: none;
            border-bottom: none;
        }
        .tbl_plan_Instructions td p {margin-bottom: 20px;font-size: 18px;}
        .tbl_plan_Instructions td ul {
            margin-bottom: 30px;
            font-size: 18px;
            list-style: none
        }
        .tbl_plan_Instructions td ul li {
            background: url(../images/bullet.jpg) no-repeat 0px 4px;
            padding-left: 30px;
        }
        .tbl_subHeader{ padding:20px 0 0 10px; background:#bdbdbd; font-size: 28px;}
        .logoDark{ width:180px; float:right; height:45px;}
        .txtMedium{ font-size:18px;}

        .sec01{ width:9px; border:2px solid #444; border-right:0; background:#bdbdbd; float:left; height:59px; margin-top:12px;}
        .sec02 img, .sec04 img{ width:100%}
        .sec02{ width:73px; float:left; border:2px solid #444;}
        .sec03{ width:9px; border:2px solid #444; border-right:0; background:#bdbdbd; float:left; border-right:0px; border-left:0px; height:59px; margin-top:12px;}
        .sec04{ width:72px; float:left; border:2px solid #444;}
        .sec05{ width:168px; border:2px solid #444; border-left:0; background:#bdbdbd; float:left; height:64px; margin-top:12px; box-sizing:border-box;  padding:5px;}
        .sec05 p{ font-size:11px !important; margin-bottom:3px !important}

        .tbl_products{ border: 5px solid #bdbdbd; border-top: 0px;}
        .tbl_products td{ padding-top:10px; padding-left:8px; width:20%;}
        .last_row td{ padding-bottom:15px;}
        .margin_top_40{ margin-top:40px;}

        .single_installation_comment{border-collapse:collapse; min-height: 70px;}
        .single_installation_comment th{ background:#fff; text-align:center; width:10%; padding:5px; box-sizing:border-box; border:1px solid #c2c2c2; }
        .single_installation_comment td{ text-align:left; width:90%; padding:5px; box-sizing:border-box; font-size:13px; border:1px solid #c2c2c2; }
        .num_comment{ background: #000;
            padding: 3px 5px 10px 5px;
            color: #fff;
            border-radius: 50%;
            font-size: 16px;
            width: 17px;
            height: 15px;
            display: block;
            vertical-align: middle;}
        .common_tbl_padding tr td:last-child{ padding-right:10px;}
        .common_tbl_padding tr:last-child td{ padding-bottom:15px;}
        .w_1800{ width:1800px;}

        .footer_stripe_long {
            padding: 20px;
            background: #bdbdbd;
            margin-top: -17px;
        }
        .f_18 td {font-size:18px;}
        .plan_header{ width:400px; float:left}

    </style>
</head>
<body>


<div id="topSection">
    <div class="logo"><img src="{!! asset('images/logo.jpg') !!}"/></div>
    <table width="1140" border="0" cellpadding="0" cellspacing="0" class="tbl_main">
        <tbody>
        <tr>
            <th scope="col"><span class="bld">Project</span> Specification</th>
        </tr>
        <tr>
            <td>
                <table width="1140" border="0" cellpadding="0" cellspacing="0" class="tbl_top">
                    <tbody>
                    <tr>
                        <td scope="col" width="70%">
                            <ul>
                                <li><span class="bld">Client Name 1:</span> Ms Belinda Butera</li>
                                <li><span class="bld">Client Name 2:</span> Mr Scott Power</li>
                                <li><span class="bld">House Design:</span> FORSYTH 35 CHALLOCK</li>
                                <li><span class="bld">Build Address:</span> Lot 25 No 63 Sample Street Sample Town Vic 3033</li>
                                <li><span class="bld">Job No:</span>	213421 HAYWARD</li>
                                <li><span class="bld">Consultant:</span>	David Mitchell</li>
                            </ul>
                        </td>
                        <td scope="col" width="30%">
                            <ul>
                                <li><span class="bld">Print Date:</span> 04 Feb 2017 </li>
                                <li><span class="bld">Time:</span>	9.34pm</li>
                                <li><span class="bld">Page No:</span> 1-20</li>
                                <li><span class="bld">Revision:</span>	1.0</li>
                                <li><span class="bld">Variation:</span> $21,145.00 (inc gst)</li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </td>
        </tr>
        <tr>
            <th><span class="bld">Product</span> Display</th>
        </tr>
        <tr>
            <td>


                <!-- ============================ Product Display table ============================ -->

                <table width="100%" border="0" class="tbl_product_display" cellpadding="0" cellspacing="0">
                    <tbody>
                    @foreach(session('qty') as $key=>$value)
                        @php
                            $product = session('products')[$key];
                        @endphp
                    <tr>
                        <td width="50%">
                            <div class="wr_img">
                                <img src="{!! asset($product->image) !!}" width="150"/>
                            </div>
                            <div class="wr_productDetails">
                                <ul>
                                    <li>{!! $product->name !!}</li>
                                    <li>AC0000580</li>
                                    <li>Brushed Stainless Steel</li>
                                    <li>LED</li>
                                    <li>Oty {!! $value !!}</li>
                                    <span class="bld_price">$49.79</span><span class="txtSmall"> (inc GST)</span>
                                </ul>
                            </div>
                        </td>
                        <td width="50%">

                        </td>
                    </tr>
                        @endforeach
                    </tbody>
                </table>


                <!-- ============================ Product Display table ============================ -->


            </td>
        </tr>
        </tbody>
    </table>
    <div class="end">END</div>
</div>


<!-- =============== FOOTER ============= -->
<div class="site_container">
    <div class="wr_footer"  id="inner">
        <div class="footer">
            <table width="100%" border="0" class="tbl_authorise">
                <tbody>
                <tr>
                    <td scope="col" width="230"><img src="http://192.168.33.10/print_static/images/logo_portar_davis.jpg" /></td>
                    <td scope="col" align="left"><span class="bld">Client</span> Authorisation ..........................................................................................</td>
                    <td scope="col" align="right">Date .......</td>
                </tr>
                </tbody>
            </table>

        </div>


        <div class="footer_stripe"></div>
        <div class="footer_para"><p>Level 10 720 Bourke St Docklands Vic 3008 P: 03555 5555 E: sales@iporterdavis.com.au W: porterdavis.com.au<br>
                Please Note: Terms and Conidtions do apply as is product subject availibifity. To review our Terms and conditions, please visit our website. Adapto is a registered trademark of Adapto Technologies Pty Limited.
            </p></div>
    </div>
</div>


</body>
