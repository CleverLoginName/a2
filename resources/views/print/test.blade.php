

<head>
    <title>Print Table</title>
    <style>
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
            background: url(http://dev.adapto.com.au/print_static/images/bullet.jpg) no-repeat 0px 4px;
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

        .footer_para {padding: 5px;}
        /*.site_container {display: table-cell;vertical-align: bottom;}*/
        .end{ text-align:right; width:1150px; color:#4a4a4a;}

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

      .tbl_BillOfMaterials td{
        border:1px solid #c3c3c3;
        /*padding:4px;*/
        border-top:none;
        border-bottom:none !important
      }
         .tbl_BillOfMaterials tr:nth-child(odd) td {
              background: #d6d6d6;
          }
          .txtSmall{font-size:14px}
        /*======================== PAGE 2 CSS END =============================*/


    </style>
</head>
<body>


<div id="topSection">
    <div class="logo"><img src="http://test.adapto.com.au/print_static/images/logo.jpg"/></div>
    <table width="800" border="0" cellpadding="0" cellspacing="0" class="tbl_main">
        <tbody>
        <tr>
            <th scope="col"><span class="bld">Project</span> Specification</th>
        </tr>
        <tr>
            <td>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="tbl_top">
                    <tbody>
                    <tr>
                        <td width="70%">
                            <ul>
                                <li><span class="bld">Client Name 1:</span> Ms Belinda Butera</li>
                                <li><span class="bld">Client Name 2:</span> Mr Scott Power</li>
                                <li><span class="bld">House Design:</span> FORSYTH 35 CHALLOCK</li>
                                <li><span class="bld">Build Address:</span> Lot 25 No 63 Sample Street Sample Town Vic 3033</li>
                                <li><span class="bld">Job No:</span>	213421 HAYWARD</li>
                                <li><span class="bld">Consultant:</span>	David Mitchell</li>
                            </ul>
                        </td>
                        <td width="30%">
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
            <th><span class="bld">Billof</span> Materials</th>
        </tr>
        <tr>
            <td>


                <!-- ============================ Billof Materials table ============================ -->

                <table width="100%" border="0" class="tbl_BillOfMaterials" cellpadding="0" cellspacing="0" >
                    <tbody>
                    <tr>
                        <th scope="col" width="5%">No.</th>
                        <th scope="col" width="15%">Category.</th>
                        <th scope="col" width="15%">Supplier Code.</th>
                        <th scope="col"width="62%">Product Description.</th>
                        <th scope="col" width="8%">Total Qty.</th>
                        <th scope="col" width="10%">Variation Price <span class="txtSmall">inc gst.</span></th>
                    </tr>
                    @php
                        $no = 0;
                    @endphp
                    @foreach(session('qty') as $key=>$value)
                        @php
                            $product = session('products')[$key];
                            $no = ++$no;
                        @endphp
                    <tr>
                        <td>{!! $no !!}</td>
                        <td>{!! $product->name !!}</td>
                        <td>AC0000580</td>
                        <td>{!! $product->description !!}</td>
                        <td>{!! $value !!}</td>
                        <td>{!! $product->builder_price !!}</td>
                    </tr>
                    @endforeach

                    </tbody>
                </table>


                <!-- ============================ Billof Materials table ============================ -->


            </td>
        </tr>
        </tbody>
    </table>
    <div class="end">END</div>
</div>

<!-- =============== FOOTER ENDS ============= -->

</body>
