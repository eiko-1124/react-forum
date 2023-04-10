import { Module } from "@nestjs/common";
import { LocalModule } from "./local/local.module";
import { AdminModule } from "./admin/admin.module";

@Module({
    imports: [LocalModule, AdminModule]
})
export class ApiModule { }