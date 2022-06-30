(function () {

    // const frame = document.querySelector('#qrFrame');
    const queryButton = document.querySelector('.go');
    const qrText = document.querySelector('#text');
    const qrImage = document.querySelector('#qrImage');

    let lastText = '';

    queryButton.addEventListener('click', qrCode, false);

    function qrCode() {
        $(qrImage).removeAttr("src");
        const text = qrText.value;
        if (text) {
            if (text === lastText) {
                console.log('已取消');
                return;
            }
            lastText = text;
            //切换麻花样式并重新生成二维码
            $.ajax({
                type: 'GET',
                url: 'https://user.cli.im/api/qrcode_template/get_template_byid_forapi',
                async: false,
                data: {
                    value: text,
                    id: '245125',
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (ret) {
                    if (ret.status == 1) {
                        var new_qrimg = ret.qrimg;
                        $(qrImage).attr('src', new_qrimg);
                        qrText.value = '';
                    }
                },
                error: function (e) {
                    console.log(e);
                },
            });
        } else {
            console.log('不合法');
        }
    }
})()