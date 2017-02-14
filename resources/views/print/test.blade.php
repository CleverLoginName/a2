

<head>
    <title>Print Table</title>
    <style>
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
            background: url(http://192.168.33.10/print_static/images/bullet.jpg) no-repeat 0px 4px;
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
    <div class="logo"><img src="http://192.168.33.10/print_static/images/logo.jpg"/></div>
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
                    <tr>
                        <td>1</td>
                        <td>Interior Lights</td>
                        <td>AC0000580</td>
                        <td>Harley Oyster 15w LED RND Opal</td>
                        <td>5</td>
                        <td>$248.95</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Interior Lights</td>
                        <td>AC0000581	</td>
                        <td>Delta Oyster 18w LED RND SCH</td>
                        <td>10</td>
                        <td>$1485.00</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Interior Lights</td>
                        <td>AC0000582	</td>
                        <td>Detroit Oyster 18w LED 3K SOR SCH	</td>
                        <td>14</td>
                        <td>$2861.74</td>
                    </tr>

                    <tr>
                        <td>9</td>
                        <td>Miscellaneous</td>
                        <td>554J4-WE</td>
                        <td>Junction Box - Internal</td>
                        <td>&nbsp;</td>
                        <td>$88.77</td>
                    </tr>

                    <tr>
                        <td>12</td>
                        <td>Argus	</td>
                        <td>N/A</td>
                        <td>TP-LINK Network Switch - 24-port<br>
                            The TL-SG1024 Gigabit Ethernet Switch provides you with a high-performance, lowcost, easy-to-use, seamless and standard upgrade to improve old network to 1000Mbps network. All 24 ports support auto MDI/MDIX, no need to worry about the cable type, simply plug and play. Moreover, with the innovative energy-efficient technology,
                            the TL-SG1024 can save up to 25% of the power consumption and 80%
                            of the packaging material can be recycled, making it an eco-friendly solution for your business network.
                            Parts list:<br>
                            1 x TP Link 24 port switch<br>
                            1 x Install of Network switch<br>
                            **Does not include power point<br>
                            **Does not include patch leads<br>
                        </td>
                        <td>1</td>
                        <td>$403.93</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Ducted Vacuum	</td>
                        <td>N/A</td>
                        <td>DUC VAC DELUXE HOSE KIT UPGRADE - 9M	</td>
                        <td>1</td>
                        <td>$74.30</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>Heating</td>
                        <td>N/A</td>
                        <td>Regional Surcharge</td>
                        <td>1</td>
                        <td>$120.00</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Fans	</td>
                        <td>AC0000003	</td>
                        <td>CEIL FAN AIRFLOW ACES48AL PROMO ONLY, inland areas only	</td>
                        <td>1</td>
                        <td>$192.50</td>
                    </tr>
                    </tbody>
                </table>


                <!-- ============================ Billof Materials table ============================ -->


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


<!-- =============== FOOTER ENDS ============= -->

</body>
