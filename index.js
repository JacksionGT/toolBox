const express = require('express');
const path = require('path');
const cors = require('cors');
const swig = require('swig');

const config = require('./config');

const app = express();
const { port } = config;

// 利用express.static中间件来托管静态资源。
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// ----------------- 模板引擎 -------------------------

//使用swig渲染html文件
app.engine('html', swig.renderFile);

//设置默认页面扩展名
app.set('view engine', 'html');

//设置模板编译无缓存
app.set('view cache', false);

//设置项目的页面文件，也就是html文件的位置
app.set('views', path.join(__dirname, 'views'));

//关闭swig模板缓存
swig.setDefaults({ cache: false });

//从文件载入模板，请写绝对路径，不要使用相对路径
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/views') });


app.get('/', (req, res) => {
    res.render('index', { title: '首页' });
})

app.get('/qrcode', (req, res) => {
    res.render('qrcode', { title: '二维码生成' });
})

app.listen(port, () => {
    console.log(`start: ${port}`)
}) 