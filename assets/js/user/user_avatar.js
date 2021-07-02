$(function(){
    var layer = layui.layer;
    var $image = $('#image');
    const options = {
        aspectRation: 1,
        preview: '.img-preview'
    };

    $image.cropper(options);

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click',function(){
        $('#file').click();
    });

    // 为文件选择框绑定change事件
    $('#file').on('change',function(e){
        // 获取用户选择的文件
        if(e.target.files.length === 0){
            return layer.msg('请选择照片！');
        }
        // 1.拿到用户选择的文件
        var file = e.target.files[0];
        // 2.将文件转化为路径
        var imgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')
            .attr('src',imgURL)
            .cropper(options);
    });

    $('#btnUpload').on('click',function(){
        // 1.要拿到用户裁剪之后的头像
        var dataURL = $image.cropper('getCroppedCanvas',{
            width: 100,
            height: 100
        }).toDataURL('image/png');
        // 2.调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        })
    });
});