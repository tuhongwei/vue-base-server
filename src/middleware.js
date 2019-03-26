const express = require('express');
const cors = require('cors');
const fs = require('fs');
const router = express.Router();
const sourceMap = require('source-map');

const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
// 定义post接口
router.post('/errorMsg/', cors(corsOptions), (req, res) => {
  // 获取前端传过来的报错对象
  let error = req.body;
  let url = error.scriptURI; // 压缩文件路径
  if (url) {
    let fileUrl = url + '.map'; // map文件路径
    // 解析sourceMap
    let smc = new sourceMap.SourceMapConsumer(
      fs.readFileSync(resolve(fileUrl), 'utf8')
    ); // 返回一个promise对象
    smc.then(result => {
      // 解析原始报错数据
      let ret = result.originalPositionFor({
        line: error.lineNo, // 压缩后的行号
        column: error.columnNo // 压缩后的列号
      });
      console.log(ret);
    });
  }
});

module.exports = router;
