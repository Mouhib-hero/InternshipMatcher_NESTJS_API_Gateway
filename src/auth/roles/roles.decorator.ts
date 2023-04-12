import { SetMetadata } from '@nestjs/common';
import { roleEnum } from '../roles/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: roleEnum[]) => SetMetadata(ROLES_KEY, roles);