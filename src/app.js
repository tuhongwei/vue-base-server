const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: 'http://localhost:8080', //只有百度可以访问
  optionsSuccessStatus: 200
}

// 接口参数处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 挂载中间层
let middleware = require('./middleware');
app.use('/middleware', middleware);

// 挂载路由
let routes = require('./route');
app.use('/', routes);

const port = process.env.PORT || 8080; // 端口设置

// 启动服务
app.listen(port, () => {
  	console.log(`server started at localhost:${port}`);
});
