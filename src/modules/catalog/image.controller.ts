import { Controller, Delete, Body } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Delete('single')
  async deleteSingle(@Body('url') url: string) {
    return this.imageService.deleteImage(url);
  }

  @Delete('bulk')
  async deleteBulk(@Body('urls') urls: string[]) {
    await this.imageService.deleteImagesBulk(urls);
    return { success: true };
  }
}
