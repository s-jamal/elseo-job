$(document).ready(function() {
    
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > $("header").height()) {
            $("header").addClass("fixed");
            $("a.scrollUp").css("display","block");
        } else {
            $("header").removeClass("fixed");
            $("a.scrollUp").css("display","none");
        }
    })

    var left_arrow = $("#hero .slide-left").first();
    var right_arrow = $("#hero .slide-right").first();
    
    

    var $grid = $('.grid').isotope({
                masonry: {
                    columnWidth: 290
                },
                    itemSelector: '.grid-item',
                    
                });

               

    $("#works .sidebar li").on('click', function() {
        var $index =  $("#works .sidebar li").index(this);
        var $filter = $("#works .sidebar li").eq($index).data('filter');
        console.log('index: ' + $index);
        console.log('index: ' + $filter);
        

        $("#works .sidebar li").removeClass('active');
        $("#works .sidebar li").eq($index).addClass('active');

        if ($filter == "all" ) {
            $grid.isotope({
                filter: '.item'
            })
        } else {
            $grid.isotope({
                filter: '.' + $filter
            })
        }
        
    })            

    // $grid.isotope({
    //     filter: '.w-dev'
    // })

    reset_slide_interval();

    left_arrow.on('click', function(e) {
        e.preventDefault();
        var current_slider_item = $("#hero .slider .slider-item.active").first();
        var slider_items = $("#hero .slider-collection").children();
        var slider_item_count = slider_items.length;
        var current_slide_no = current_slider_item.index();
        
        if (current_slide_no != 0) {    
            slider_items.filter(".active").removeClass('active');
            slider_items.eq(current_slide_no - 1).addClass('active');
        } else {     
            slider_items.filter(".active").removeClass('active');
            slider_items.eq(slider_item_count - 1).addClass('active');
        }
        fix_active_slide_no();
        reset_slide_interval();

    })
    right_arrow.on('click', function(e) {
        e.preventDefault();
        slide_right();
    })

    $("#testimonial .navigation ul li").on('click', function(e) {
        var index = $("#testimonial .navigation ul li").index(this);
        $("#testimonial .navigation ul li").filter('.active').removeClass('active');
        $("#testimonial .navigation ul li").eq(index).addClass('active');
        $("#testimonial .testimonial-collection .item.active").removeClass('active');
        $("#testimonial .testimonial-collection .item").eq(index).addClass('active');
    })

    // $(window).scroll(function() {
    //     var scrollTop = $(window).scrollTop();
    //     var imgPos = scrollTop / 10 + 'px';
    //     $('#demo').find('img').css('transform', 'translateY(-' + imgPos + ')');
    // });

    $(function() {

        var $window = $(window);
    
        $('section[data-type="background"]').each(function() {
    
            var $bgobj = $(this);
    
            $(window).scroll(function() {
    
                var yPos = -($window.scrollTop() / $bgobj.data('speed'));
                var coords = '50% ' + yPos + 'px';
    
                $bgobj.css(({backgroundPosition: coords}));
    
            })
        })
    })

    $("#partners .navigation li").on('click', function() {
        var index = $("#partners .navigation li").index(this);
        $("#partners .navigation li.active").removeClass('active');
        $("#partners .navigation li").eq(index).addClass('active');

        var frame_width = $("#partners .frame").width();
        console.log(frame_width);
        var translate_px = (frame_width + 30) * index;
        console.log(translate_px);
        $("#partners .partner-items").first().css('transform', 'translateX(-' + translate_px + 'px)');

    });

    $("#about").find("a").click(function(e) {
        e.preventDefault();
        var section = $(this).attr("href");
        console.log(section);
        $("html, body").animate({
            scrollTop: $("#" + section).offset().top
        });
    });
    
    
});

function fix_active_slide_no() {
    var current_slider_item = $("#hero .slider .slider-item.active").first();
    var slide_no = $("#hero .slider .slider-item").index(current_slider_item) + 1;
    
    $("#hero .paging .current-no").text("0" + slide_no);
    // console.log(index);
}

function reset_slide_interval() {
    
    var interval_id = window.setInterval(function(){
        slide_right();
      }, 5000);
    setTimeout(clearInterval(interval_id), 7000);
      
}

function slide_right() {
    var current_slider_item = $("#hero .slider .slider-item.active").first();
    var slider_items = $("#hero .slider-collection").children();
    var slider_item_count = slider_items.length;
    var current_slide_no = current_slider_item.index();
    
    if (current_slide_no != (slider_item_count - 1)) {    
        slider_items.filter(".active").removeClass('active');
        slider_items.eq(current_slide_no + 1).addClass('active');
    } else {     
        slider_items.filter(".active").removeClass('active');
        slider_items.eq(0).addClass('active');
    }
    fix_active_slide_no();
    reset_slide_interval();
}
