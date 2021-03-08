$(function() {
    var layer = layui.layer
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取信息失败！')
                }
                var htmlStr = template('tpl-table', res);
                console.log(htmlStr)
                $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
        });

    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    var indexedit = null;

    $('tbody').on('click', '#btn-edit', function() {
        var form = layui.form;
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res)
                form.val('form-edit', res.data)
            }
        })

    })
    $('body').on('submit', '#form-edit', function(e) {
        var layer = layui.layer;
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章列表失败！')
                }
                layer.msg('更新文章列表成功！')
                initArtCateList()
                layer.close(indexedit)
            }
        })
    })

    $('tbody').on('click', '#btn-delete', function() {
        var layer = layui.layer;
        var id = $(this).attr('data-Id');
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    initArtCateList()
                        // layer.close(index)
                }
            })


        })

    })
})