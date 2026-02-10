import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsModule } from './auctions/auctions.module';
import dbConfig from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuctionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
