import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { NomineeprofileModule } from './nomineeprofile/nomineeprofile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
       //PORT
       PORT: Joi.number().required(),
       //...SECRETS
       JWT_SECRET: Joi.string().required(),
       JWT_EXPIRATION_TIME: Joi.string().required(),
       // Refresh token part
       JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
       JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
       JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       //google Oauth
       GOOGLE_ID: Joi.string().required(),
       GOOGLE_SECRET: Joi.string().required(),
       //Email Service
       EMAIL_SERVICE: Joi.string().required(),
       EMAIL_USER: Joi.string().required(),
       EMAIL_PASSWORD: Joi.string().required(),
       EMAIL_CONFIRMATION_URL: Joi.string().required(),
       JWT_VERIFICATION_TOKEN_SECRET:Joi.string().required(),
       JWT_VERIFICATION_TOKEN_EXPIRATION_TIME:Joi.string().required(),

       // Twillo account module
      //  TWILIO_ACCOUNT_SID: Joi.string().required(),
      //  TWILIO_AUTH_TOKEN: Joi.string().required(),
      //  TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required()
     })
     }),
     MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_SERVICE'),
          secure: false,
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
     useFactory: async(configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'), 
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      //ca: await fs.promises.readFile("C:/Users/hp/Downloads/ca.pem")
      //ca: await fs.promises.readFile("../")
      },
     // ssl:configService.get('DB_SSL'),
     //change this whilst going live in Spin it production server to synchronise false
        synchronize:true,
      }),
      inject: [ConfigService],
    })
    ,EmailModule, EmailConfirmationModule, UserModule, AuthModule, NomineeprofileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
