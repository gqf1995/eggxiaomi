'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534304805936_5738';

  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true //  延长会话有效期       
  }


  // add your config here
  config.middleware = ['adminauth'];

  config.adminauth = {
    match: '/admin',
  }
  //图片上传地址
  config.uploadDir = 'app/public/admin/upload'


  //多模板引擎配置
  config.view = {
    mapping: {
      '.html': 'ejs',

      '.nj': 'nunjucks'
    },
  };

  //配置mongose连接mongodb数据库

  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/eggxiaomi',
      options: {
        auth: {
          authSource: "admin"
        },
        user: 'admin',
        pass: '123456'
      },
    }
  };
  //配置上传文件时表单数量
  exports.multipart = {
    fields: '50'
  };
  exports.security = {
    csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => {
          if(ctx.request.url=='/admin/goods/goodsUploadImage' || ctx.request.url=='/admin/goods/goodsUploadPhoto'){
            return true;
          }
          return false;
        }      
      }
    }
  return config;
};