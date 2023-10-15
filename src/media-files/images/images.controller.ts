import {
    Body,
    Controller,
    Delete,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileMetadataDto } from '../dto/upload-file-metadata.dto';
import { MediaFilesService } from '../media-files.service';
import { FileTypesValidation } from '../pipes/file-types-validation';
import { DeleteMediaDto } from '../dto/delete-media.dto';
import { MultiDeleteMediaDto } from '../dto/multi-delete-file.dto';

@ApiTags('Media Images')
@ApiBearerAuth()
@Controller('images')
export class ImagesController {
    constructor(private mediaFilesService: MediaFilesService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    upload(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 83886080 }),
                    new FileTypesValidation({
                        types: [
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'image/webp',
                            'application/pdf',
                            'image/gif',
                        ],
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body() uploadMediaFileMetadata: UploadFileMetadataDto,
    ) {
        return this.mediaFilesService.processFileUpload(
            file,
            uploadMediaFileMetadata,
        );
    }

    @Delete()
    deleteFile(@Body() dto: DeleteMediaDto) {
        return this.mediaFilesService.deleteFile(dto);
    }

    @Delete('multi-delete')
    multiDeleteFile(@Body() dto: MultiDeleteMediaDto) {
        return this.mediaFilesService.multiDeleteFile(dto);
    }
}
