(function () {

    // const frame = document.querySelector('#qrFrame');
    const queryButton = document.querySelector('.go');
    const qrText = document.querySelector('#text');
    const qrImage = document.querySelector('#qrImage');
    const helpText = document.querySelector("#hepl");

    let lastText = '';

    queryButton.addEventListener('click', qrCode, false);

    function qrCode() {
        const text = qrText.value;
        if (text) {
            if (text === lastText) {
                helpText.innerHTML = `二维码已生成 - ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
                return;
            }
            lastText = text;
            genQrImage(text);
        } else {
            helpText.innerHTML = `请输入文本内容 - ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
        }
    }

    function genQrImage(text) {
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
                    helpText.innerHTML = `二维码已生成 - ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
                }
            },
            error: function (e) {
                console.log(e);
            },
        });
    }
    window.onload = function(){
        genQrImage('http://www.mohexiang.cn/')
    }
})()