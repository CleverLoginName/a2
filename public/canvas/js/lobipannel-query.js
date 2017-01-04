/**
 * Created by ishara on 12/15/16.
 */
$(function(){
    var size = $('#main-pannel-body').height();
    $('#main-pnnel-drag').lobiPanel({
        //Options go here
        reload: false,
        close: false,
        editTitle: false,
        sortable: true,
        minimize:false,
        expand:false,
        unpin: {
            icon: 'glyphicon glyphicon-pushpin',
        }

    });

    $('.inner-class').lobiPanel({
        reload: false,
        close: false,
        editTitle: false,
        sortable: true,
        expando:false,
        expand:false,
        unpin:true,
        unpin: {
            icon: 'glyphicon glyphicon-pushpin',
            icon2:'glyphicon glyphicon-pushpin'
        },
        minimize:{
            icon:'fa fa-minus-square-o',
            icon2:'fa fa-plus-square-o'
        },

    });

    $('.bom-medder').lobiPanel({
        reload: false,
        close: false,
        editTitle: false,
        sortable: true,
        expando:false,
        expand:false,
        unpin:false,
        minimize:{
            icon:'fa fa-minus-square-o',
            icon2:'fa fa-plus-square-o'
        },


    });



    $('.bom-medder').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.bom-medder>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.bom-medder').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.bom-medder>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();


//                catlog1
    $('.cat-1').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-1>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-1').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-1>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();


//                catlog2
    $('.cat-2').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-2>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-2').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-2>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();

//                catlog3
    $('.cat-3').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-3>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-3').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-3>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();

//                catlog 4
    $('.cat-4').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-4>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-4').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-4>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();

//                catlog 5
    $('.cat-5').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-5>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-5').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-5>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();


//				catlog 6
    $('.cat-6').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-6>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-6').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-6>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();


    $('.cat-7').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-7>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.cat-7').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-7>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();

    $('.inner-class').lobiPanel('minimize');

    $('.cat-1').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).addClass("unpin-pannel-hight");
        $(this).find('.panel-body').addClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-1').on('beforePin.lobiPanel',function (ev,lobiPanel) {
        $(this).removeClass("unpin-pannel-hight");
        $(this).find('.panel-body').removeClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-2').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).addClass("unpin-pannel-hight");
        $(this).find('.panel-body').addClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-2').on('beforePin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).removeClass("unpin-pannel-hight");
        $(this).find('.panel-body').removeClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-3').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).addClass("unpin-pannel-hight");
        $(this).find('.panel-body').addClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-3').on('beforePin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).removeClass("unpin-pannel-hight");
        $(this).find('.panel-body').removeClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-4').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).addClass("unpin-pannel-hight");
        $(this).find('.panel-body').addClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat-4').on('beforePin.lobiPanel',function (ev,lobiPanel) {
//            alert("hi");
        $(this).removeClass("unpin-pannel-hight");
        $(this).find('.panel-body').removeClass("unpin-pannel-hight-body");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('#main-pnnel-drag').on('onPin.lobiPanel',function (ev,lobiPanel) {
        $(this).height(window.innerHeight*70/100);
        $('.body-main').css("height",window.innerHeight*70/100);
        $('#bom-area').css("height",window.innerHeight*30/100);
//            $('#main-pannel-body').removeClass("inside-body-pan");
    }).lobiPanel();

    $('#main-pnnel-drag').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
        $(this).height(window.innerHeight*70/100);
        $('.body-main').css("height",window.innerHeight*70/100);
        $('#bom-area').css("height",window.innerHeight);
//          $('#main-pannel-body').addClass("inside-body-pan");
    }).lobiPanel();




});