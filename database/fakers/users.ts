import { Role } from '../../src/common/types/enums';

export const baseUsers = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        phone: '+998951254789',
        password:
            '$2b$10$Cl/iQBVyGUqiJkRm5b.bBeq8.CIaoNYDxfuEEb2SkngeN8g3Ma.vu',
        role: Role.SUPER_ADMIN,
        region_id: 2,
        district_id: 17,
        is_verify: true,
    },
];
