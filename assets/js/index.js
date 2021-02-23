$(function() {

    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res)
        }
    })
}


getUserInfo();
$('.btnLogout').on('click', function() {
    var layer = layui.layer;
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //清空本地存储的token
        localStorage.removeItem(token);
        //重新跳转到登陆界面
        location.href = '/login.html';

        layer.close(index);
    })

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',


        success: function(res) {
            console.log(res);
            if (res.status !== 0) {

                return layui.layer.msg('获取用户信息失败！')
            }

            renderAvater(res.data);
        },

        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败!') {
        //         localStorage.removeItem(token);
        //         location.href = '/login.html'
        //     }
        // }

    })

}

function renderAvater(user) {
    var name = user.nickname || user.username;
    console.log(name);

    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    if (user.user_pic != null) {
        $('.layui-nav-img').attr("src", "user.user_pic").show();
        $('.text-avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}