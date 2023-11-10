import {
    Controller,
    Get,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Post,
    Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }

    @Roles(Role.USER)
    @Get('user')
    findByUserId(
        @CurrentUser('id') id: number,
        @Query() query: QueryNotificationDto,
    ) {
        query.user_id = id;
        return this.notificationsService.findByUserId(query);
    }

    @Get('unread-count')
    findUnreadCount(@CurrentUser('id') id: number) {
        return this.notificationsService.findUnreadCount(id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateNotificationDto: UpdateNotificationDto,
    // ) {
    //     return this.notificationsService.update(+id, updateNotificationDto);
    // }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.notificationsService.remove(id);
    }
}
