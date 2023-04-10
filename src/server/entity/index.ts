import { commit } from "./commit.entity";
import { commitLike } from "./commitLike.entity";
import { commitReply } from "./commitReply.entity";
import { invitation } from "./invitation.entity";
import { invitationCollect } from "./invitationCollect.entity";
import { invitationHistory } from "./invitationHistory.entity";
import { invitationLike } from "./invitationLike.entity";
import { plate } from "./plate.entity";
import { plateBlacklist } from "./plateBlacklist.entity";
import { plateSubscribe } from "./plateSubscribe.entity";
import { upload } from "./upload.entity";
import { user } from "./user.entity";
import { userBlacklist } from "./userBlacklist.entity";
import { userFans } from "./userFans.entity";

export default [
    commit,
    commitLike,
    commitReply,
    invitation,
    invitationCollect,
    invitationHistory,
    invitationLike,
    plate,
    plateBlacklist,
    plateSubscribe,
    upload,
    user,
    userBlacklist,
    userFans
]