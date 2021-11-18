import { CreateVerbDto } from './dto/create-verb.dto';
import { UpdateVerbDto } from './dto/update-verb.dto';
export declare class VerbsService {
    create(createVerbDto: CreateVerbDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVerbDto: UpdateVerbDto): string;
    remove(id: number): string;
}
