const express = require('express');
const router = express.Router();
const sourceMap = require('source-map');
const http = require('http');

// 定义post接口
router.post('/errorMsg/', (req, res) => {
  // 获取前端传过来的报错对象
  let error = req.body;
  let url = error.scriptURI; // 压缩文件路径
  if (url) {
    let fileUrl = url + '.map'; // map文件路径
    console.log(fileUrl);
    http.get(fileUrl, response => {
      response.setEncoding('binary'); // 二进制binary
      let sourceMapContent = '';
      response
        .on('data', data => {
          // 加载到内存
          sourceMapContent += data;
        })
        // 加载完
        .on('end', () => {
          // 解析sourceMap
          sourceMap.SourceMapConsumer.with(sourceMapContent, null, consumer => {
            // 解析原始报错数据
            let ret = consumer.originalPositionFor({
              line: error.lineNo, // 压缩后的行号
              column: error.columnNo // 压缩后的列号
            });
            res.send({
              code: 1,
              data: ret,
              msg: 'ok',
              time: Date.now()
            });
          });
        });
    });
  }
});

module.exports = router;
