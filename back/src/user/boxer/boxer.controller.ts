import { Controller, Post, Get, Body } from '@nestjs/common';
import { BoxerService } from '../service/boxer/boxer.service';
import { BoxerDto } from '../dto/boxer.dto'

@Controller('storage')
export class BoxerController {
    constructor(private boxerService: BoxerService){}

    @Post('/new')
    add(@Body() box: BoxerDto): Promise<any>{
        return this.boxerService.add(box);
    }

    @Post('/remove')
    delete(@Body() id: any): Promise<number>{
        return this.boxerService.delete(id);
    }
}