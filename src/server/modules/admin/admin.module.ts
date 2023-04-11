import { Module } from "@nestjs/common";
import { PlateModule } from "./plate/plate.module";

@Module({
    imports: [PlateModule]
})
export class AdminModule { }