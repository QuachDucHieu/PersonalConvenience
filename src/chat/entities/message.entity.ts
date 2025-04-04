import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @ApiProperty({
    example: 1,
    description: 'ID của tin nhắn',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Xin chào!',
    description: 'Nội dung tin nhắn',
  })
  @Column()
  content: string;

  @ApiProperty({
    example: 1,
    description: 'ID của người gửi',
  })
  @Column()
  senderId: number;

  @ApiProperty({
    example: 2,
    description: 'ID của người nhận',
  })
  @Column()
  receiverId: number;

  @ApiProperty({
    example: 'https://example.com/file.pdf',
    description: 'Đường dẫn đến file đính kèm (nếu có)',
    required: false,
  })
  @Column({ nullable: true })
  file?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Thời gian tạo tin nhắn',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Thời gian cập nhật tin nhắn',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { foreignKey: 'senderId' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, { foreignKey: 'receiverId' })
  @JoinColumn({ name: 'receiverId' })
  receiver: User;
} 