import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliController } from './cli/cli.controller';
import { CliService } from './cli/cli.service';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [CliModule],
  controllers: [AppController, CliController],
  providers: [AppService, CliService],
})
export class AppModule {}
