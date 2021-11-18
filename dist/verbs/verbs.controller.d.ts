import { VerbsService } from './verbs.service';
import { CreateVerbDto } from './dto/create-verb.dto';
import { UpdateVerbDto } from './dto/update-verb.dto';
export declare class VerbsController {
    private readonly verbsService;
    constructor(verbsService: VerbsService);
    create(createVerbDto: CreateVerbDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVerbDto: UpdateVerbDto): string;
    remove(id: string): string;
}
