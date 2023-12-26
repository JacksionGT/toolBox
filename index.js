const express = require('express');
const path = require('path');
const cors = require('cors');
const swig = require('swig');

const config = require('./config');

const app = express();
const { port } = config;

// 自定义静态资源中间件，覆盖默认的 express.static
const customStaticMiddleware = (staticPath, options) => {
  return (req, res, next) => {
    express.static(staticPath, options)(req, res, err => {
      if (err) return next(err);
      res.status(200); // 总是返回状态码 200 OK
      next();
    });
  };
};

// 使用自定义的静态资源中间件，并添加自定义头部信息
app.use(customStaticMiddleware(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'max-age=604800'); // 缓存一周，单位为秒
  }
}));

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

app.get('/photo', (req, res) => {
    res.render('photo', { title: '全景图片浏览器' });
})

app.listen(port, () => {
    console.log(`start: ${port}`)
}) 