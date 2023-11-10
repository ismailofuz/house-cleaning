import { Role } from '../../src/common/types/enums';

export const baseUsers = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        phone: '+998951254789',
        email: 'john@gmail.com',
        password:
            '$2b$10$Cl/iQBVyGUqiJkRm5b.bBeq8.CIaoNYDxfuEEb2SkngeN8g3Ma.vu',
        role: Role.SUPER_ADMIN,
        is_verify: true,
    },
];
