import { PartialType } from '@nestjs/mapped-types';
import { CreateVerbDto } from './create-verb.dto';

export class UpdateVerbDto extends PartialType(CreateVerbDto) {}
