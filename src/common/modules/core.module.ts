import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { cwd } from 'process';
import configuration, { RedisConfigI } from '../options/configuration';
import { KnexOptions } from '../options/knex.options';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@nestjs-modules/ioredis';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        LoggerModule.forRootAsync({
            useFactory: () => ({
                pinoHttp: {
                    autoLogging: true,
                    transport: {
                        targets: [
                            {
                                level: 'info',
                                target: 'pino-pretty',
                                options: {
                                    colorize: true,
                                    singleLine: true,
                                    levelFirst: false,
                                    // ignore: 'hostname,res',
                                    translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                                    messageFormat:
                                        '{req.headers.x-correlation-id} [{context}] {msg}',
                                    errorLikeObjectKeys: ['err', 'error'],
                                },
                            },
                            {
                                target: 'pino/file',
                                level: 'error',
                                options: {
                                    destination: join(
                                        __dirname,
                                        '..',
                                        '..',
                                        '..',
                                        'logs/error.log',
                                    ),
                                    ignore: 'hostname,res',
                                },
                            },
                        ],
                    },
                    serializers: {
                        err: pino.stdSerializers.err,
                        req: (r) => {
                            return {
                                id: r.id,
                                method: r.method,
                                url: r.url,
                                // jwt: r.headers.authorization,
                                params: r.params,
                                query: r.query,
                            };
                        },
                        res: pino.stdSerializers.res,
                    },
                },
            }),
        }),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                const { host, port, password, username } =
                    configService.get<RedisConfigI>('redis');
                return {
                    config: {
                        url: `redis://${username}:${password}@${host}:${port}`,
                        retryStrategy(times) {
                            console.warn(
                                `Retrying redis connection: attempt ${times}`,
                            );
                            return Math.min(times * 500, 2000);
                        },
                    },
                };
            },
            inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get('throttle.ttl'),
                limit: config.get('throttle.limit'),
            }),
        }),
        KnexModule.forRootAsync({
            useClass: KnexOptions,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(cwd(), 'assets', 'files'),
        }),
    ],
})
export class CoreModules {}
