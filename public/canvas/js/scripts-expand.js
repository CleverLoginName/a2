/**************************************************************/
/* Prepares the cv to be dynamically expandable/collapsible   */
/**************************************************************/
function prepareList() {
    // $('#expList').find('li:has(ul)')
    // .click( function(event) {
    //     if (this == event.target) {
    //         $(this).toggleClass('expanded');
    //         $(this).children('ul').toggle('medium');
    //     }
    //     return false;
    // })
    // .addClass('collapsed')
    // .children('ul').hide();
    //
    // //Create the button funtionality
    // $('#expandList > li > div')
    // .unbind('click')
    // .click( function() {
    //     $('.collapsed').addClass('expanded');
    //     $('.collapsed').children().show('medium');
    // })
    // $('#collapseList > li > div')
    // .unbind('click')
    // .click( function() {
    //     $('.collapsed').removeClass('expanded');
    //     $('.collapsed').children().hide('medium');
    // })

    $('.level-1 > li > div').click(function() {
        $(this).toggleClass('expanded');
        $(this).parent().find('ul').toggle();
    });

    $('.level-2 > li > div').click(function() {
        $(this).toggleClass('expanded');
        $(this).parent().find('ul').toggle();
    });

    $('.level-3 > li > div').click(function() {
        $(this).toggleClass('expanded');
        $(this).parent().find('ul').toggle();
    });

    $('.level-4 > li > div').click(function() {
        $(this).toggleClass('expanded');
        $(this).parent().find('ul').toggle();
    });

};


/**************************************************************/
/* Functions to execute on loading the document               */
/**************************************************************/
$(document).ready( function() {
    prepareList()
});
