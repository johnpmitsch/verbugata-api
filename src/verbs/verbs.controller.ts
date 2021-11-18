import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { CreateVerbDto } from './dto/create-verb.dto';
import { UpdateVerbDto } from './dto/update-verb.dto';

@Controller('verbs')
export class VerbsController {
  constructor(private readonly verbsService: VerbsService) {}

  @Post()
  create(@Body() createVerbDto: CreateVerbDto) {
    return this.verbsService.create(createVerbDto);
  }

  @Get()
  findAll() {
    return this.verbsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verbsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerbDto: UpdateVerbDto) {
    return this.verbsService.update(+id, updateVerbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verbsService.remove(+id);
  }
}
