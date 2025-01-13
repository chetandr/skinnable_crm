import { Staff } from './Staff.entity';
import { StaffFile } from './StaffFile.entity';
import { Address } from './Address.column';
import { PointOfContact } from './PointOfContact.column';
import { StageHistory } from './StageHistory.column';
import { Organizations } from './Organizations.entity';
import { Industry } from './Industry.entity';
import { Stage } from './stages.entity';
import { Acl } from './Acl.entity';
import { Template } from './Template.entity';
const entities = [
    Staff,
    StaffFile,
    Address,
    PointOfContact,
    StageHistory,
    Organizations,
    Industry,
    Stage,
    Acl,
    Template
]

export default entities;