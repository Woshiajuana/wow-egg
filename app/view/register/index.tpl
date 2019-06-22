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
        <form class="center-block" style="width: 50%;margin-top: 20px">
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="text" class="form-control" id="email" placeholder="邮箱" name="email">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="captcha" name="captcha" placeholder="验证码">
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
                <button type="button" id="submit" style="width: 100%" class="btn btn-info">注册</button>
            </div>
        </form>
    </div>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <script>
        $(function () {
            $('#codeBtn').on('click', function () {
                var email = $('#email').val();
                if (!email) return $('.alert').alert();
                $.post('/code/email/send?_csrf={{ ctx.csrf | safe }}', {
                    email: email,
                }, function (resp) {
                    console.log(resp);
                })
            });
            $('#submit').on('click', function () {
                var email = $('#email').val();
                var captcha = $('#captcha').val();
                var password = $('#password').val();
                $.post('/user/register?_csrf={{ ctx.csrf | safe }}', {
                    email: email,
                    captcha: captcha,
                    password: password,
                }, function (resp) {
                    console.log(resp);
                });
            })
        });

    </script>
</body>
</html>
