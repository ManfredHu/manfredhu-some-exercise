import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    // 'files' 是指定请求中文件的字段名，即上传文件的字段名。对应fieldname的value, FormData append的key
    // 20 是指定最大上传文件数量。
    // desc 指定文件上传的目标目录
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    // console.log('body', body); // body [Object: null prototype] { name: '007227_linda.jpeg-0' }
    // console.log('files', files);
    // [
    //   {
    //     fieldname: 'files',
    //     originalname: 'blob',
    //     encoding: '7bit',
    //     mimetype: 'application/octet-stream',
    //     destination: 'uploads',
    //     filename: 'a48b2f1695bba67312bca9fdf132bb11',
    //     path: 'uploads/a48b2f1695bba67312bca9fdf132bb11',
    //     size: 20480
    //   }
    // ]

    const sliceIdxRst = body.name.match(/(.+)\-\d+$/);
    if (!sliceIdxRst) {
      // 普通文件上传
      fs.cpSync(files[0].path, 'uploads/files/' + body.name);
    } else {
      // 分chunk上传
      const fileName = sliceIdxRst[1];
      const chunkDir = 'uploads/chunks_' + fileName;

      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir);
      }
      fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    }
    // 删除临时文件
    fs.rmSync(files[0].path);
  }

  // 接收文件名，然后查找对应的 chunks 目录，把下面的文件读取出来，按照不同的 start 位置写入到同一个文件里
  // 因name是前端随机字符串_真文件名组成, 只有随机字符串命中才能进行
  @Get('merge')
  merge(@Query('name') name: string) {
    return new Promise((resolve, reject) => {
      // name: 007227_linda.jpeg
      const chunkDir = 'uploads/chunks_' + name;

      const files = fs.readdirSync(chunkDir);

      // files [
      //   '007227_linda.jpeg-0',
      //   '007227_linda.jpeg-1',
      //   '007227_linda.jpeg-2',
      //   '007227_linda.jpeg-3',
      //   '007227_linda.jpeg-4',
      //   '007227_linda.jpeg-5',
      //   '007227_linda.jpeg-6'
      // ]
      let count = 0;
      let startPos = 0;

      // 文件按照ascii排序, 会出现 -1和-10,-11…-2,-3,需要按照数字重新排序一下
      const regExp = /-(\d+)$/;
      files.sort((a, b) => {
        const aNum = +a.match(regExp)[1];
        const bNum = +b.match(regExp)[1];
        return aNum - bNum;
      });
      console.log('files', files);
      files.map((file) => {
        const filePath = chunkDir + '/' + file;
        const stream = fs.createReadStream(filePath);
        // 读取chunk里的一项(filePath)内容写入 uploads/linda.jpeg 里, 通过start控制写入的游标
        stream
          .pipe(
            fs.createWriteStream('uploads/' + name, {
              start: startPos,
            }),
          )
          .on('finish', () => {
            // 读取了全部chunks_linda.jpeg文件后做目录递归删除
            count++;
            if (count === files.length) {
              fs.rm(
                chunkDir,
                {
                  recursive: true,
                },
                () => {},
              );
            }
            resolve({
              url: '/files/' + name,
              code: 0,
            });
          });

        startPos += fs.statSync(filePath).size;
      });
    });
  }

  @Post('upload-by-fetch')
  @UseInterceptors(
    FileInterceptor('files', { // 注意这里是单个文件
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    response.setHeader('Content-Length', file.size);
    response.json({
      message: 'File uploaded successfully!',
      filename: file.filename,
      code: 0,
    })
  }
}
