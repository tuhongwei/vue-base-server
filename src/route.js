const express = require('express');
const router = express.Router();

// 挂载中间件
router.use(function(req, res, next) {
	console.log('加载' + req.path + '成功');
	next();
});

module.exports = router;

