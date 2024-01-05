import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VideoController } from './video/video.controller';

@Module({
  imports: [
    // for uploaded files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 设置静态文件目录的路径
      serveRoot: '/files' // 路由路径映射
    }), 
    // for index.html ect.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'), // 设置静态文件目录的路径
      exclude: ['files']
    }),
  ],
  controllers: [AppController, VideoController],
  providers: [AppService],
})
export class AppModule {}
