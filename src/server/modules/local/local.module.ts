import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { UserModule } from "./user/user.module";
import { PlateModule } from "./plate/plate.module";
import { SearchModule } from "./search/search.module";

@Module({
    imports: [LoginModule, UserModule, PlateModule, SearchModule]
})
export class LocalModule { }