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
                    <input type="text" class="form-control" id="email" placeholder="邮箱" name="email">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="code" name="code" placeholder="验证码">
                </div>
                <div class="col-sm-3">
                    <button type="button" style="width: 100%" id="codeBtn" class="btn btn-primary">获取验证码</button>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="text" class="form-control" id="password" placeholder="密码" name="password">
                </div>
            </div>
            <div class="form-group">
                <button type="submit" style="width: 100%" class="btn btn-info">注册</button>
            </div>
        </form>
    </div>
    <script>
        $(function () {
            $('#btnCode').on('click', function () {
                var email = $('#emit')
                $.post('/code/email/send?_csrf={{ ctx.csrf | safe }}', {
                    email: $()
                }, function (resp) {
                    console.log(resp);
                })
            });
        });

    </script>
</body>
</html>
