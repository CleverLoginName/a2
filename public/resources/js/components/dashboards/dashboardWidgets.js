var DashboardWidgets = function (containerId, userRole,itemData) {

    this.container = $('#' + containerId);
    this.currentUserRole = userRole;
    this.id = UUID();
    this.initData = {

        "asa" : [
            {"items" : ["ASA-COUNT","MSL-COUNT","LM-COUNT","LEC-COUNT"]},
            {"items" : ["PRODUCT-COUNT",,"CATEGORY-COUNT","SUPPLIER-COUNT"]},
            {"items" : ["PROJECT-COUNT","PLAN-COUNT"]},
            {"items" : ["HELP"]}
        ],
        "msl" : [
            {"items" : ["LM-COUNT","LEC-COUNT","PRODUCT-COUNT"]},
            {"items" : ["PROJECT-COUNT","PLAN-COUNT"]},
            {"items" : ["HELP"]}
        ],
        "lm" : [
            {"items" : ["PRODUCT-COUNT","PROJECT-COUNT","PLAN-COUNT"]},
            {"items" : ["HELP"]}
        ],
        "lec" : [
            {"items" : ["PRODUCT-COUNT","PROJECT-COUNT","PLAN-COUNT"]},
            {"items" : ["HELP"]}
        ]

    };

    this.itemData = itemData;

};
DashboardWidgets.prototype = {

    init: function () {

        this._initUI();

    },
    _initUI : function(){

        this.container.empty();
        var widgets = this._getCurrentUserWidgets();
        var template = '<section class="title-wrapper"><h4 class="dashboard-title">Summary</h4></section><section id="' + this.id + '-widget-wrapper">';

        for(var i = 0; i < widgets.length; i++){

            template += '<section class="row" style="margin-bottom:10px;">';

            var items = widgets[i]['items'];
            for(var j = 0; j < items.length; j++){
                template += this._getWidgetTemplate(items[j]);
            }

            template += '</section>';

        }

        template += '</section>';

        $(template).appendTo(this.container);        


    },
    _getWidgetTemplate : function(widgetName){

        var template = '';

        switch(widgetName){

            case 'ASA-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-user"></span><span class="dashboard-item-name">System Adminitrators </span><span class="dashboard-item-count">' + this.itemData['asas'] + '</span></section></section>';
                break;
            case 'MSL-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-user"></span><span class="dashboard-item-name">Software Licensees </span><span class="dashboard-item-count">' + this.itemData['msls'] + '</span></section></section>';
                break;
            case 'LEC-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-user"></span><span class="dashboard-item-name"> Customers</span><span class="dashboard-item-count">' + this.itemData['lecs'] + '</span></section></section>';
                break;
            case 'LM-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-user"></span><span class="dashboard-item-name">Merchants </span><span class="dashboard-item-count">' + this.itemData['lms'] + '</span></section></section>';
                break;
            case 'PROJECT-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-projects"></span><span class="dashboard-item-name">Projects </span><span class="dashboard-item-count">' + this.itemData['projects'] + ' </span></section></section>';
                break;
            case 'PLAN-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-projects"></span><span class="dashboard-item-name">Floor Plans </span><span class="dashboard-item-count">' + this.itemData['plans'] + ' </span></section></section>';
                break;
            case 'SUPPLIER-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-sup"></span></i><span class="dashboard-item-name">Suppliers </span><span class="dashboard-item-count">' + this.itemData['suppliers'] + ' </span></section></section>';
                break;
            case 'PRODUCT-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-products"></span><span class="dashboard-item-name">Products </span><span class="dashboard-item-count">' + this.itemData['products'] + ' </span></section></section>';
                break;
            case 'CATEGORY-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-cat"></span><span class="dashboard-item-name">Categories </span><span class="dashboard-item-count">' + this.itemData['categories'] + ' </span></section></section>';
                break;
            case 'CLIENT-PROJECT-COUNT':
                template = '<section class="col-md-4  dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-projects"></span><span class="dashboard-item-name">Projects </span><span class="dashboard-item-count">' + this.itemData['projects'] + ' </span></section></section>';
                break;
            case 'CONSULTANT-PROJECT-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-projects"></span><span class="dashboard-item-name">Projects </span><span class="dashboard-item-count">' + this.itemData['projects'] + ' </span></section></section>';
                break;
            case 'ACCOUNTANT-PRODUCT-COUNT':
                template = '<section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><i class="fa fa-lightbulb-o"> </i><span class="dashboard-item-name">Products </span><span class="dashboard-item-count">' + this.itemData['products'] + ' </span></section></section>';
                break;
            case 'HELP':
                template = '<a href="help-topics"><section class="col-md-4 dashboard-widget-col"><section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-help"></span><span class="dashboard-item-name">Help Topics </span><span class="dashboard-item-count">46</span></section></section></a>';
                break;
            default :
                break;

        }

        return template;

    },
    _getCurrentUserWidgets : function(){

        return this.initData[this.currentUserRole];

    }

};
