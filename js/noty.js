$.noty.defaults = {
    layout: 'top',
    theme: 'relax', // or 'relax'
    type: 'success',
    text: '', // can be html or string
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {
            height: 'toggle'
        }, // or Animate.css class names like: 'animated bounceInLeft'
        close: {
            height: 'toggle'
        }, // or Animate.css class names like: 'animated bounceOutLeft'
        easing: 'swing',
        speed: 1000 // opening & closing animation speed
    },
    timeout: true, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 10, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onCloseClick: function() {},
    },
    buttons: false // an array of buttons
};