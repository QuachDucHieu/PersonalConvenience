import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: 2,
    description: 'ID của người nhận tin nhắn',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'ID người nhận không được để trống' })
  receiverId: number;

  @ApiProperty({
    example: 'Xin chào!',
    description: 'Nội dung tin nhắn',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  content: string;

  @ApiProperty({
    example: null,
    description: 'File đính kèm (tùy chọn)',
    required: false,
  })
  @IsOptional()
  file?: Express.Multer.File;
} 