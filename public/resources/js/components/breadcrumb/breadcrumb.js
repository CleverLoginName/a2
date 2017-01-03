/**
 * Created by devthree on 1/6/15.
 */
var BreadCrumb = function (containerId) {

    this.id = UUID();
    this.container = $('#' + containerId);
    this.itemCount = 0;
    this.pathHistory = new Array();
    this.currentRef = null;

};
BreadCrumb.prototype = {

    init : function(){
        this._initEvents();
    },
    addItem: function (text, ref, icon) {

        this.itemCount++;
        this.currentRef = ref;
        if ($('#' + this.itemCount + '-bc').length == 0) {
            var btn = $('<button data-ref="'
            + ref
            + '" data-index="'
            + this.itemCount
            + '" class="breadcrumb-btn ' + ((this.itemCount == 1)? 'cursor-normal' : 'font-blue') + '" type="submit" id="'
            + this.itemCount + '-bc">' + ((icon) ? this._prepareIconItem(icon,text) : '<span class="breadcrumb-text">' + text +'</span>') + '</button><i class="fa fa-chevron-right breadcrumb-icn ' + ((this.itemCount == 1)? '' : 'font-blue') + '" id="' + this.itemCount + '-ic"></i>');
            btn.appendTo(this.container);

            var _this = this;
            $('#' + this.itemCount + '-bc').on('click', function () {

            	if($(this).attr('data-index') !== '1')
            		_this._bcAction($(this).attr('data-ref'), parseInt($(this).attr('data-index')));

            });


        }

    },
    _bcAction: function (ref, index) {

        for (var i = (index + 1); i < (this.itemCount + 1); i++) {

            $('#' + $('#' + i + "-bc").attr('data-ref')).hide();
            $('#' + i + "-bc").remove();
            $('#' + i + "-ic").remove();

        }

        this.itemCount = index;

        $('#' + this.currentRef).hide();
        this._cleanUp();
        $('#' + ref).show();

    },
    _initEvents : function(){

        var _this = this;
        $(document).on('breadcrumb/reset',function(e,data){
            _this._bcAction(data.ref,data.index);
        });

    },
    _prepareIconItem : function(icon,text){

        return '<span class="bc-img-wrap"><img class="breadcrumb-main-icon" src="' + icon + '"/></span><span class="breadcrumb-text">' + text + '</span>';

    },
    _cleanUp : function(){
    	$('embed').hide().remove();
    }

};