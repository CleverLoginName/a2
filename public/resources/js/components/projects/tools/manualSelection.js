/**
 *
 */

var ManualSelection = function (containerId, returnId, data) {

    this.container = $('#' + containerId);
    this.returnContainer = $('#' + returnId);
    this.data = data;
    this.id = UUID();
    this.selectionObjs = new Array();
    this.selectionMatrix = new Array();

};
ManualSelection.prototype = {

    init: function () {

        var selectionTmpl = '<section class="row thumb-wrapper import-upload-wrapper">' +
            '<section class="row import-upload-actions">' +
            '<div class="row margin-left-right-0 upload-heading font-size-18" id="upload-actions">Select Your Floor Plan areas from below images and Press "Done" button.' +
                //'<div class="row margin-left-right-0 upload-heading" id="upload-actions">' +
            '<button class="btn  upload-next import-cancel-btn margin-right-30" id="' + this.id + '-selection-cancel">Cancel</button>' +
            '<button class="btn  upload-next import-done-btn" id="' + this.id + '-selection-done"  disabled="true">Done<img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-done-croping-loading"></button>' +
            '</div>' +
            '</section>' +
            '<section class="row import-upload-body" id="' + this.id + '-images-body">' +
            '</section>' +
            '</section>';

        this.container.empty();
        $(selectionTmpl).appendTo(this.container);

        this._initImages();
        this._initEvents();


    },
    _initEvents: function () {

        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();

        for(var i = 0; i < this.data.length ; i++){

            var instance = null;

            if(i === 0){
                instance = $('#' + this.id + '-image-' + i + '-img').imgAreaSelect({ instance: true,handles: true ,show:true,onSelectEnd : function(img, selection){
                    _this._imageSelectionHandler(img,selection);
                }});

            }else{
                instance = $('#' + this.id + '-image-' + i + '-img').imgAreaSelect({ instance: true,handles: true ,hide:true,onSelectEnd : function(img, selection){
                    _this._imageSelectionHandler(img,selection);
                }});
            }

            this.selectionObjs.push(instance);

        }

        $('#' + this.id + '-selection-cancel').on('click', function () {

            _this._clean();
            _this.container.hide();
            _this.returnContainer.show();

        });

        $('#' + this.id + '-selection-done').on('click', function () {

            var cleanedMatrix = _this._cleanUpEmptyMatrix();
            if(cleanedMatrix.length === 0){
                _this.container.hide();
                _this.returnContainer.show();
                return;
            }

            var data = new Object();
            data['cropImageItems'] = cleanedMatrix;
            $('#' + _this.id + '-done-croping-loading').show();
            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/json',
                url: 'restAPI/project/plans/crop/images',
                data: JSON.stringify(data)
            }).success(function (response) {
                if (response && response.type === "ERROR") {
                    alertify.error("Failed to Crop Images due to " + response.msg);
                } else {
                    _this._clean();
                    $(document).trigger('extracted/newImages', {'images': response.data.successList});
                    $(document).trigger('manualy/selected', {});
                    _this.container.hide();
                    _this.returnContainer.show();
                }
                $('#' + _this.id + '-done-croping-loading').hide();
            }).fail(function (e) {
                alertify.error("Failed to Crop Images due to System fault.");
                $('#' + _this.id + '-done-croping-loading').hide();
            });


        });

        $('#' + this.id + '-images-wrapper').on('click', '[id$="-next"]', function () {

            var thisRef = $(this).attr('data-this-ref'),
                nextRef = $(this).attr('data-next-ref');

            _this.selectionObjs[thisRef].setOptions({ hide: true });
            _this.selectionObjs[thisRef].update();

            $('#' + _this.id + '-image-' + thisRef).hide();
            $('#' + _this.id + '-image-' + nextRef).show();

            var nextObj = _this.selectionObjs[nextRef];
            if(_this.selectionMatrix[nextRef] && _this.selectionMatrix[nextRef] !== "NONE"){

                var matrix = _this.selectionMatrix[nextRef];
                nextObj.setSelection(matrix.x1, matrix.y1, matrix.x2, matrix.y2, false);

            }

            nextObj.setOptions({ show: true });
            nextObj.update();

        });

        $('#' + this.id + '-images-wrapper').on('click', '[id$="-prev"]', function () {

            var thisRef = $(this).attr('data-this-ref'),
                prevRef = $(this).attr('data-prev-ref');

            _this.selectionObjs[thisRef].setOptions({ hide: true });
            _this.selectionObjs[thisRef].update();
            $('#' + _this.id + '-image-' + thisRef).hide();
            $('#' + _this.id + '-image-' + prevRef).show();

            var prevObj = _this.selectionObjs[prevRef];
            if(_this.selectionMatrix[prevRef] && _this.selectionMatrix[prevRef] !== "NONE"){

                var matrix = _this.selectionMatrix[prevRef];
                prevObj.setSelection(matrix.x1, matrix.y1, matrix.x2, matrix.y2, false);
            }

            prevObj.setOptions({ show: true });
            prevObj.update();


        });

        $('#' + this.id + '-images-wrapper').on('click', '[id$="-rotate"]', function () {

            var thisRef = $(this).attr('data-this-ref'),
                absUrl = $('#' + _this.id + '-image-' + thisRef + '-img').attr('data-abs-url');
            _this.selectionObjs[thisRef].setOptions({ hide: true });
            _this.selectionObjs[thisRef].update();

            if(_this.selectionMatrix[thisRef])
                _this.selectionMatrix[thisRef] = "NONE";

            _this._resetDoneBtn();

            $('#' + _this.id + '-image-' + thisRef + '-img').hide();
            $('#' + _this.id + '-image-' + thisRef + '-img-loading').show();

            var dataObj = new Object();
            dataObj['path'] = absUrl;

            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/json',
                url: 'restAPI/project/plans/rotate/image',
                data: JSON.stringify(dataObj)
            }).success(function (response) {

                if (response.type === "ERROR") {
                    alertify.error("Failed to Rotate Image due to " + response.msg);
                } else {
                    $('#' + _this.id + '-image-' + thisRef + '-img').attr('src',_this._getImageUrl(response.data) + '?' + Math.random());
                    setTimeout(function(){
                        _this.selectionObjs[thisRef].setSelection(0, 0, 0, 0, false);
                        _this.selectionObjs[thisRef].setOptions({ show: true });
                        _this.selectionObjs[thisRef].update();
                    },1000);

                }

                $('#' + _this.id + '-image-' + thisRef + '-img-loading').hide();
                $('#' + _this.id + '-image-' + thisRef + '-img').show();

            }).fail(function (e) {
                alertify.error("Failed to Rotate Image due to System fault.");
                $('#' + _this.id + '-image-' + thisRef + '-img-loading').hide();
                $('#' + _this.id + '-image-' + thisRef + '-img').show();
            });


        });

    },
    _initImages: function () {

        var imagesWrapper = '<section class="row"  id="' + this.id + '-images-wrapper">';

        for (var i = 0; i < this.data.length; i++) {

            if (i === 0) {

                if(this.data.length === 1){
                    imagesWrapper += this._initImageItem(this.data[i], i, true, false, false);
                }else{
                    imagesWrapper += this._initImageItem(this.data[i], i, true, true, false);
                }


            } else if (i === (this.data.length - 1)) {

                imagesWrapper += this._initImageItem(this.data[i], i, false, false, true);

            } else {

                imagesWrapper += this._initImageItem(this.data[i], i, false, true, true);

            }


        }

        imagesWrapper += '</section>';

        $(imagesWrapper).appendTo($('#' + this.id + '-images-body'));

    },
    _initImageItem: function (url, index, isDisplay, hasNext, hasPrev) {

        var itemTmpl = '<section class="row center" id="' + this.id + '-image-' + index + '" ' + ((isDisplay) ? "" : "style='display:none;'") + '>' +
            '<section class="row content-home-loading loading-wrapper manual-loader" style="display: none;" id="' + this.id + '-image-' + index + '-img-loading">Processing ....<div class="loader loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div></section>' +
            '<img data-abs-url="' + url + '" data-this-ref = "' + index + '" id="' + this.id + '-image-' + index + '-img" class="img-responsive manual-img" src="' + this._getImageUrl(url) + '"/>' +
            '<section class="row manual-bottom-bar">';



        var nextRef = -1,
            prevRef = -1,
            thisRef = index;
        // ref initialization

        if (hasNext) {

            nextRef = index + 1;

        }

        if (hasPrev) {

            prevRef = index - 1;

        }

        // rotate button
        itemTmpl += '<button class="btn  upload-next import-done-btn float-none" data-this-ref = "' + thisRef + '" data-next-ref = "' + nextRef + '" data-prev-ref = "' + prevRef + '" id="' + this.id + '-image-' + index + '-rotate" data-toggle="tooltip" data-placement="top" title="" data-original-title="Rotate"><i class="fa fa-rotate-right"></i></button>'


        if (hasPrev) {

            itemTmpl += '<button class="btn  upload-next import-done-btn float-none" data-this-ref = "' + thisRef + '" data-next-ref = "' + nextRef + '" data-prev-ref = "' + prevRef + '" id="' + this.id + '-image-' + index + '-prev" data-toggle="tooltip" data-placement="top" title="" data-original-title="Previous"><i class="fa fa-chevron-left"></i></button>'

        }

        if (hasNext) {

            itemTmpl += '<button class="btn  upload-next import-done-btn float-none" data-this-ref = "' + thisRef + '" data-next-ref = "' + nextRef + '" data-prev-ref = "' + prevRef + '" id="' + this.id + '-image-' + index + '-next" data-toggle="tooltip" data-placement="top" title="" data-original-title="Next"><i class="fa fa-chevron-right"></i></button>'

        }



        itemTmpl += '</section></section>';

        return itemTmpl;

    },
    _getImageUrl: function (url) {

        return mapUrlAsExternalRes(url);

    },
    _clean : function(){

        this._cleanSelections();

    },
    _cleanSelections : function(){

        for(var i = 0; i < this.selectionObjs.length; i++){

            this.selectionObjs[i].setOptions({ hide: true });
            this.selectionObjs[i].update();

        }

    },
    _cleanUpEmptyMatrix : function(){

        var cleanedMatrix = new Array();

        for(var i = 0; i < this.selectionMatrix.length; i++){

            if(this.selectionMatrix[i]  && this.selectionMatrix[i] !== "NONE"){
                cleanedMatrix.push(this.selectionMatrix[i]);
            }

        }

        return cleanedMatrix;

    },
    _resetDoneBtn : function(){

        var cleanedMatrix = this._cleanUpEmptyMatrix();
        if(cleanedMatrix.length === 0){
            $('#' + this.id + '-selection-done').attr('disabled',true);
        }else{
            $('#' + this.id + '-selection-done').attr('disabled',false);
        }

    },
    _imageSelectionHandler : function(img,selection){

        var thisRef = $(img).attr('data-this-ref');

        if(selection.width === 0 || selection.height === 0){
            this.selectionMatrix[thisRef] = "NONE";
        }else{
            var imgUrl = $(img).attr('data-abs-url'),
                imgWidth = $(img).width(),
                imgHeight = $(img).height();

            selection['imgWidth'] = imgWidth;
            selection['imgHeight'] = imgHeight;
            selection['imgUrl'] = imgUrl;
            this.selectionMatrix[thisRef] = selection;
        }

        this._resetDoneBtn();

    }

};