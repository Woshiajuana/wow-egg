<html>
<head>
    <title>WOW-EGG注册</title>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container ">
        <form class="center-block" style="width: 50%;margin-top: 10%"
              method="POST" action="/user/register?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
            <div class="form-group row">
                <label for="username" class="col-sm-2 col-form-label">邮箱</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="username" placeholder="请输入邮箱" name="username">
                </div>
            </div>
            <div class="form-group row">
                <!--<label for="password">密码</label>-->
                <input type="password" class="form-control" id="password" placeholder="密码" name="password">
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
            </div>
            <div class="form-group row">
                <!--<label for="phone">验证码</label>-->
                <input type="text" class="form-control" id="phone" placeholder="验证码" name="phone">
                <button type="button" class="btn btn-primary mb-2">获取验证码</button>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-info pull-right">注册</button>
            </div>
        </form>
    </div>
    <script>
        $('#avatarPic').bind('click', function () {
            $('#avatarBtn').click();
        });
        $('#avatarBtn').bind('change',function (e) {
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                //监听文件读取结束后事件
                reader.onloadend = function (e) {
                    $('#avatarPic').attr("src",e.target.result);    //e.target.result就是最后的路径地址
                };
            }
        });
    </script>
</body>
</html>
