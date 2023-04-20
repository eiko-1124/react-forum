import { Module } from "@nestjs/common";
import { LoginModule } from "./login/login.module";
import { UserModule } from "./user/user.module";
import { PlateModule } from "./plate/plate.module";
import { SearchModule } from "./search/search.module";
import { InvitationModule } from "./invitation/invitation.module";
import { CommentModule } from "./comment/comment.module";

@Module({
    imports: [
        LoginModule,
        UserModule,
        PlateModule,
        SearchModule,
        InvitationModule,
        CommentModule
    ]
})
export class LocalModule { }