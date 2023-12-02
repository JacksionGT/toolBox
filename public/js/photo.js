

window.onload = function () {
    console.log(navigator.userAgent);
    if ('serviceWorker' in navigator) {
        // 判断浏览器支不支持 service worker
        console.log('支持 service worker ------------------');
        // 注册 service worker，sw.js 就是 service worker 的应用程序逻辑代码
        navigator.serviceWorker.register('/js/photo-sw.js')
            // 注册好后，会返回一个 promise，数据是 woker 上下文运行环境对象
            .then(resitration => {
                console.log("register", resitration);
            }).catch(err => console.error(err));
    }

    function showFileInfo(url, pos) {
        $('#viewer').html('');
        $('#viewer').show();
        new PhotoSphereViewer.Viewer({
            container: document.querySelector('#viewer'),
            panorama: url,
        });
        $('#intro').hide();
        bindDrag('viewer');
    }
    function bindDrag(id) {
        var dashboard = document.getElementById(id);
        dashboard.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        dashboard.addEventListener('dragenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        dashboard.addEventListener('drop', function (e) {
            // 必须要禁用浏览器默认事件
            e.preventDefault();
            e.stopPropagation();
            var files = e.dataTransfer.files; //获取文件对象

            var fileUrl = window.URL.createObjectURL(files[0]);
            if (files[0].type.indexOf('image') === 0) {
                showFileInfo(fileUrl);
            } else {
                console.log(files[0].type);
                $('#fileInfo').hide();
                $('#intro').hide();
                $('#notSupport').show();
                $('#uploaded').hide();
            }
        });
    }
    bindDrag('intro');

    function initFileChange() {
        const fileSelector = document.querySelector("#file");
        fileSelector.addEventListener('change', function (e) {
            const files = e.target.files;
            if (files && files.length > 0 &&
                files[0].type.indexOf('image') === 0) {
                const fileUrl = window.URL.createObjectURL(files[0])
                showFileInfo(fileUrl);
            }
        })
    }

    initFileChange();
}