$(function() {
    $('#link-login').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link-reg').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();

    })
})

var form = layui.form;
var layer = layui.layer;

form.verify({

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function(value) {
            var pwd = $('.reg-box[name=password]').val()
                // console.log(value)
                // console.log(pwd)
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }


    })
    // 监听注册提交事件
$('#form-reg').on('submit', function(e) {
    e.preventDefault();
    $.post('/api/reguser', {
            username: $('#form-reg[name=username]').val(),
            password: $('#form-reg[name=password]').val()
        },
        function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            $('#link-reg').click;
        }

    )
})

//监听登陆提交事件
$('#form-login').on('submit', function(e) {
    e.preventDefault();
    $.post('/api/login', {
        username: $('#form-login[name=username]').val(),
        password: $('#form-login[name=password]').val()
    }, function(res) {
        if (res.status != 0) {
            return layer.msg('登陆成功！')
        }
        layer.msg('登陆失败！');

    })
})