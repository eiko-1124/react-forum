import { Module } from "@nestjs/common";
import { PlateModule } from "./plate/plate.module";
import { InvitationModule } from "./invitation/invitation.module";
import { UploadModule } from "./upload/upload.module";
import { CommentModule } from "./comment/comment.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [PlateModule, InvitationModule, UploadModule, CommentModule, UserModule]
})
export class AdminModule { }