/**
 * Created by ishara on 12/15/16.
 */
pinedState = true;
bomMinimize = true;
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

    function addBoder(context) {
        var instance = $(context).data('lobiPanel');
        $(context).find('.panel-heading').removeClass("minimize-border");
        if(!instance.isPinned()){
            $(context).find('.panel-heading').addClass("minimize-border");
        }
    }

    $('.bom-medder').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.bom-medder>.panel-heading').addClass("test1").removeClass("test2");

    }).lobiPanel();

    $('.bom-medder').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.bom-medder>.panel-heading').addClass("test2").removeClass("test1");
    }).lobiPanel();


//                catlog1
    $('.cat-1').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-1>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);

    }).lobiPanel();

    $('.cat-1').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-1>.panel-heading').addClass("test2").removeClass("test1");
         addBoder(this);
    }).lobiPanel();


//                catlog2
    $('.cat-2').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-2>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-2').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-2>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

//                catlog3
    $('.cat-3').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-3>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-3').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-3>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

//                catlog 4
    $('.cat-4').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-4>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-4').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-4>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

//                catlog 5
    $('.cat-5').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-5>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-5').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-5>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


//				catlog 6
    $('.cat-6').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-6>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-6').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-6>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.cat-7').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-7>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-7').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-7>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();



    $('.cat-8').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-8>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);

    }).lobiPanel();

    $('.cat-8').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-8>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.cat-9').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-9>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-9').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-9>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.cat-10').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-10>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);

    }).lobiPanel();

    $('.cat-10').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-10>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

    $('.cat-11').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-11>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-11').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-11>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.cat-12').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-12>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-12').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-12>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.cat-13').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-13>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-13').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-13>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

    $('.cat-14').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-14>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-14').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-14>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();

    $('.cat-15').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-15>.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);
    }).lobiPanel();

    $('.cat-15').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $('.cat-15>.panel-heading').addClass("test2").removeClass("test1");
        addBoder(this);
    }).lobiPanel();


    $('.inner-class').lobiPanel('minimize');
    $('#bom-area').lobiPanel('minimize');

    $('.cat-1').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-1').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-2').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-2').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-3').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-3').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-4').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-4').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-5').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-5').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-6').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-6').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-7').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-7').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-8').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-8').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-9').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-9').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-10').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-10').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-11').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-11').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-12').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-12').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-13').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-13').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-14').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-14').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();

    $('.cat-15').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {unpinPan(this);}).lobiPanel();
    $('.cat-15').on('beforePin.lobiPanel',function (ev,lobiPanel) {pinPan(this)  }).lobiPanel();
    $('#main-pnnel-drag').on('onPin.lobiPanel',function (ev,lobiPanel) {
        pinedState = true;
        resizeSidebarContent();
    }).lobiPanel();

    $('#main-pnnel-drag').on('beforeUnpin.lobiPanel',function (ev,lobiPanel) {
        pinedState = false;
        resizeSidebarContent();
    }).lobiPanel();


    $('#bom-area').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        bomMinimize = false;
        resizeSidebarContent();
    }).lobiPanel();


    $('#bom-area').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        bomMinimize = true;
        resizeSidebarContent();
    }).lobiPanel();

});

function unpinPan(element){
    $(element).addClass("unpin-pannel-hight");
    $(element).find('.panel-body').addClass("unpin-pannel-hight-body");
    $(element).addClass("lobi-pannel-border");
    $(element).lobiPanel('maximize');
}

function pinPan(element){
         $(element).removeClass("unpin-pannel-hight");
        $(element).find('.panel-body').removeClass("unpin-pannel-hight-body");
        $(element).removeClass("lobi-pannel-border");
        $(element).lobiPanel('maximize');
}

resizeSidebarContent();
function resizeSidebarContent() {
    var height = $(window).height() -1;
    if (pinedState) {
        if(bomMinimize){
            $('.body-main').css("height",height*70/100);
            $('#main-pnnel-drag').height(height*94/100);
            $('#bom-area').height(height*6/100);
        } else {
            $('#main-pnnel-drag').height(height*50/100);
            $('#bom-area').height(height*50/100);
        }    
    }
    else{
        if(!bomMinimize){
            $('#bom-area').height(height*70/100);
        }          
        $('#main-pnnel-drag').height(height*70/100);
    }
}