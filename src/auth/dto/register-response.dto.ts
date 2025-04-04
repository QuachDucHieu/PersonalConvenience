import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID của người dùng đã đăng ký',
  })
  id: number;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên người dùng',
  })
  fullName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email của người dùng',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Thời gian tạo tài khoản',
  })
  createdAt: Date;
} 