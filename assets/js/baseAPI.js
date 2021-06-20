//注意每次调用$.get() 或 $.post 或 $.ajax() 
//都会调用 ajaxPrefilter 这个函数
//这个函数中我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})