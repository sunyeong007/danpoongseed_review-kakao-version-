$(function() {
    $('html').attr('data-scrollify-page-index', 1);
    
    $.scrollify({
        section: ".panel",
        scrollbars: false,
        before: function(i, panels) {
            $('html').attr('data-scrollify-page-index', i + 1);
            
            var ref = panels[i].attr("data-section-name");

            $(".pagination .active").removeClass("active");

            $(".pagination")
                .find('a[href="#' + ref + '"]')
                .addClass("active");
        },
        afterRender: function() {
            var pagination = '<ul class="pagination">';
            var activeClass = "";
            $(".panel").each(function(i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                pagination +=
                    '<li><a class="' +
                    activeClass +
                    '" href="#' +
                    $(this).attr("data-section-name") +
                    '"><span class="hover-text">' +
                    $(this)
                    .attr("data-section-name")
                    .charAt(0)
                    .toUpperCase() +
                    $(this)
                    .attr("data-section-name")
                    .slice(1) +
                    "</span></a></li>";
            });

            pagination += "</ul>";

            $(".page1").append(pagination);
            $(".pagination a").on("click", function() {
                var no = parseInt($(this).attr('href').replace('#page', ''));
                
                Page__moveTo(no);
            });
        }
    });
    
    $('.panel').bind('mousewheel', function(e) {
        
        if(e.originalEvent.wheelDelta /120 > 0) {
            Page__moveUp();
        }
        else{
            Page__moveDown();
        }
        
        e.preventDefault();
        e.stopPropagation();
    });
});

function Page__moveUp() {
    var currentScrollifyPageIndex = parseInt($('html').attr('data-scrollify-page-index'));
    var postPageExist = $('[data-section-name="page' + (currentScrollifyPageIndex - 1) + '"]').length == 1;
    
    if ( postPageExist ) {
        Page__moveTo(currentScrollifyPageIndex - 1);
    }
}

function Page__moveDown() {
    var currentScrollifyPageIndex = parseInt($('html').attr('data-scrollify-page-index'));
    var postPageExist = $('[data-section-name="page' + (currentScrollifyPageIndex + 1) + '"]').length == 1;
    
    if ( postPageExist ) {
        Page__moveTo(currentScrollifyPageIndex + 1);
    }
}

function Page__moveTo(name) {
    var currentScrollifyPageIndex = $('html').attr('data-scrollify-page-index');
    var $currentPage = $('[data-section-name="page' + currentScrollifyPageIndex + '"]');
    
    var leaveAnimationFuncName = $currentPage.attr('data-scrollify-leave-animation-func-name');
    
    if ( leaveAnimationFuncName ) {
        window[leaveAnimationFuncName](function() {
            $('.page' + name).removeClass('animate-out');
            $.scrollify.move("#page" + name);
        });
    }
    else {
        $('.page' + name).removeClass('animate-out');
        $.scrollify.move("#page" + name);
    }
}

function Page__startPage1OutAni(callback) {
    var $currentPage = $('.page1');
    
    $currentPage.addClass('animate-out');
    
    setTimeout(callback, 2000);
}