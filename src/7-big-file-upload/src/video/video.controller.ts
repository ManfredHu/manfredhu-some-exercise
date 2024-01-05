import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('video')
export class VideoController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './uploads/videos', // 上传文件保存的目录
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    // 在这里可以处理上传的视频文件，例如保存到数据库或者返回相关信息给客户端
    console.log('Video uploaded:', file);
    return { message: 'Video uploaded successfully' };
  }
}
