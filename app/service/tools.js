'use strict';

// https://www.npmjs.com/package/svg-captcha

var svgCaptcha = require('svg-captcha'); //引入验证

var md5 = require('md5');

var sd = require('silly-datetime');


var path=require('path');

const mkdirp = require('mz-modules/mkdirp');

const Jimp = require("jimp");  //生成缩略图的模块


const Service = require('egg').Service;

class ToolsService extends Service {

  //生成验证码
  async captcha (){    
    var captcha = svgCaptcha.create({ 
        size:4,
        fontSize: 50, 
        width: 100, 
        height:32,
        background:"#cc9966" 
      });

    this.ctx.session.code = captcha.text;   /*验证码的信息*/

    return captcha;
  }
  async md5(str){

    return md5(str);
  }
  async getTime(){

    var d=new Date();

    return d.getTime();

  }

  async  getUploadFile(filename){

    // 1、获取当前日期     20180920
   
      var day=sd.format(new Date(), 'YYYYMMDD');
  
    //2、创建图片保存的路径

      var dir=path.join(this.config.uploadDir,day);

      await mkdirp(dir);

      var d=await this.getTime();   /*毫秒数*/


      //返回图片保存的路径

      var uploadDir=path.join(dir,d+path.extname(filename));


      // app\public\admin\upload\20180914\1536895331444.png
      return {
        uploadDir:uploadDir,
        saveDir:uploadDir.slice(3).replace(/\\/g,'/')
      }




  }
  //生成缩略图的公共方法
  async jimpImg(target){
     //上传图片成功以后生成缩略图
     Jimp.read(target, (err, lenna) => {
      if (err) throw err;  		
            lenna.resize(200, 200) // resize
                .quality(90) // set JPEG quality                  
                .write(target+'_200x200'+path.extname(target)); // save


            lenna.resize(400, 400) // resize
                .quality(90) // set JPEG quality                  
                .write(target+'_400x400'+path.extname(target)); // save
      });


  }
 
}

module.exports = ToolsService;
