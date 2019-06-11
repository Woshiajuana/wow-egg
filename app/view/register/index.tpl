<html>
<head>
    <title>WOW-EGG注册</title>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <h2 style="font-size: 26px; color: #333; margin-top: 20%">WOW-EGG注册</h2>
        <form class="center-block" style="width: 50%;margin-top: 20px"
              method="POST" action="/user/register?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="text" class="form-control" id="username" placeholder="邮箱" name="username">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputPassword" placeholder="验证码">
                </div>
                <div class="col-sm-3">
                    <button type="button" style="width: 100%" class="btn btn-primary">获取验证码</button>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" style="width: 100%" class="btn btn-info">注册</button>
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
