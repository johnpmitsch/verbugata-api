import { VerbsService } from "./verbs.service";
export declare class VerbsController {
    private readonly verbsService;
    constructor(verbsService: VerbsService);
    findOne(id: string): import(".prisma/client").Prisma.Prisma__VerbClient<import(".prisma/client").Verb>;
}
