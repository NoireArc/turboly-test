import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty()
    title!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    due_date!: string;

    @ApiProperty({
        example: 'high',
    })
    priority!: string;
}