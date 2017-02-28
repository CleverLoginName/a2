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
        tooltips:false,
        unpin: {
            icon: 'glyphicon glyphicon-pushpin',
        }

    });

    $('.inner-class').lobiPanel({
        reload: false,
        close: false,
        editTitle: false,
        sortable: true,
        expando: false,
        expand: false,
        tooltips: false,
        unpin: true,
        unpin: {
            icon: 'glyphicon glyphicon-pushpin',
            icon2: 'glyphicon glyphicon-pushpin'
        },
        minimize: {
            icon: 'fa fa-minus-square-o',
            icon2: 'fa fa-plus-square-o'
        },

    });

    $('.bom-medder').lobiPanel({
        reload: false,
        close: false,
        editTitle: false,
        sortable: true,
        expando: false,
        expand: false,
        unpin: false,
        tooltips: false,
        minimize: {
            icon: 'fa fa-minus-square-o',
            icon2: 'fa fa-plus-square-o'
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


    $('.cat').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
        $(this).find('.panel-heading').addClass("test1").removeClass("test2");
        addBoder(this);

    }).lobiPanel();

    $('.cat').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        $(this).find('.panel-heading').addClass("test2").removeClass("test1");
         addBoder(this);
    }).lobiPanel();

    $('.inner-class').lobiPanel('minimize');
    $('#bom-area').lobiPanel('minimize');

    $('#main-pnnel-drag').find('[data-func="unpin"]').attr("title", "Unpin");
    $('.inner-class').find('[data-func="unpin"]').attr("title", "Unpin");
    $('.inner-class').find('[data-func="minimize"]').attr("title", "Maximize");
    $('.bom-medder').find('[data-func="minimize"]').attr("title", "Maximize");

    $('.lobipanel').on('onUnpin.lobiPanel', function(ev, lobiPanel){
        $(this).find('[data-func="unpin"]').attr("title", "Pin");
    });
    $('.lobipanel').on('onPin.lobiPanel', function(ev, lobiPanel){
        $(this).find('[data-func="unpin"]').attr("title", "Unpin");
    });
    $('.lobipanel').on('beforeMinimize.lobiPanel', function(ev, lobiPanel){
        $(this).find('[data-func="minimize"]').attr("title", "Maximize");
    });
    $('.lobipanel').on('beforeMaximize.lobiPanel', function(ev, lobiPanel){
        $(this).find('[data-func="minimize"]').attr("title", "Minimize");
    });

    $('.lobipanel').on('onMaximize.lobiPanel', function(ev, lobiPanel){
        $(this).find('[data-func="minimize"]').attr("title", "Minimize");
        $(this).find('[data-func="unpin"]').attr("title", "Pin");
    });

    $('.cat').on('beforeUnpin.lobiPanel', function (ev, lobiPanel) {
        $(this).addClass("unpin-pannel-hight");
        $(this).find('.panel-body').addClass("unpin-pannel-hight-body");
        $(this).addClass("lobi-pannel-border");
        $(this).find(".body-inner").addClass("boddy-unpin-hight").removeClass("boddy-defalt-hight")
        $(this).lobiPanel('maximize');
    }).lobiPanel();

    $('.cat').on('beforePin.lobiPanel', function (ev, lobiPanel) {
        $(this).removeClass("unpin-pannel-hight");
        $(this).find('.panel-body').removeClass("unpin-pannel-hight-body");
         $(this).find(".body-inner").addClass("boddy-defalt-hight").removeClass("boddy-unpin-hight")
        $(this).removeClass("lobi-pannel-border");
        $(this).lobiPanel('maximize');
    }).lobiPanel();

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
         $('#bom-table').height($('#bom-area').height() - $('#bom-hedder').height()-10);
    }).lobiPanel();

    $('#bom-area').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
        bomMinimize = true;
        resizeSidebarContent();
    }).lobiPanel();

});

resizeSidebarContent();
function resizeSidebarContent() {
    var height = $(window).height() -1;
    if (pinedState) {
        if(bomMinimize){
            // $('.body-main').css("height",height*70/100);
            $('#main-pnnel-drag').height(height*94/100);
            $('#main-pannel-body').height($('#main-pnnel-drag').height()-$('.main-title').height());
            $('#bom-area').height(height*6/100);
            //main-title

        } else {
            $('#main-pnnel-drag').height(height*50/100);
            $('#main-pannel-body').height($('#main-pnnel-drag').height()-$('.main-title').height());
            $('#bom-area').height(height*50/100);
        }    
    }
    else{
        if(!bomMinimize){
           $('#main-pnnel-drag').height(height*50/100);
            $('#bom-area').height(height*50/100);
        } else{
            $('#main-pnnel-drag').height(height*94/100);
            $('#bom-area').height(height*6/100);
        }          
       // $('#main-pnnel-drag').height(height*70/100);
    }
}

//    $('.main-body-tag').css("height",height*94/100-$('#main-hadder').height());
//  $('#main-pannel-body').height( $('#main-pnnel-drag').height()-$('#main-hadder').height());