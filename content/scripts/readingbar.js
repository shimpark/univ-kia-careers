/*!
 * Readingbar jQuery plugin
 *
 * @author   : http://twitter.com/nicovanzyl
 * @author   : http://twitter.com/wixelhq
 * @url      : https://github.com/Wixel/readingbar.git
 * @copyright: 2016 Wixel
 * @license  : MIT license
 * @version  : 1.1
 */

(function($) {
  $.fn.viewportOffset = function() {
    var offset = $(this).offset();

    return {
      top: offset.top + $(window).scrollTop()
    };
  };
  $.fn.readingbar = function(options) {
    if (($('.read-bar').length > 0) === false) {
      var defaults = {
        backgroundColor:  '#ff521d',
        height:           2,
        counter:          false
      };
      settings = $.extend({}, defaults, options);
      $('<div class="read-bar"></div>').appendTo('body');
      $('.read-bar').css({
        position: 'fixed',
        top:   '0',
        left:     '0',
        width:    '0',
        maxWidth: '100%',
      });
      $('.read-bar').css({
        height:           settings.height + 'px',
        backgroundColor:  settings.backgroundColor
      });
      if(settings.counter){
        $('<span class="read-text"></span>').appendTo('body');
        $('.read-text').css({
          position:     'fixed',
          bottom:       settings.height + 'px',
          left:         '0',
          width:        settings.height*10 + 'px',
          marginLeft:   '-' + settings.height*10 + 'px',
          textAlign:    'right',
          color:        settings.backgroundColor,
          fontSize:     settings.height*5 + 'px'
        });
      }
    }
    _ = $(this);

    var readHeight = _.outerHeight();
    var startPoint = _.offset().top * 1.65;
    var currentPos = 0;

    $(document).on('scroll', function(){
      readHeight = _.outerHeight();
      currentPos = (_.viewportOffset().top - startPoint) / readHeight * 100;
      $('.read-bar').css('width', currentPos + '%');
      $('.read-text').css('left', currentPos + '%');
      if (currentPos > 100) {
        $('.read-bar, .read-text').css('opacity', '1');
      }else{
        $('.read-text').text(Math.round(currentPos) + '%');
        $('.read-text').css({
          opacity:    1,
          bottom:     '0'
        });
        $('.read-bar').css({
          opacity:    1,
          height:     settings.height + 'px'
        });
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          $('.read-bar').animate({
            opacity:  1,
            height:   settings.height + 'px'
          }, 150);
          $('.read-text').animate({
            opacity:  0,
            bottom:   '-' + settings.height*10 + 'px'
          }, 140);

        }, 250));
      }
    });
  };
}(jQuery));
