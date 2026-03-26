import { Reflector } from '@nestjs/core';
import { RequiredPermission } from '../interfaces/required-permission.interface.ts';

export const Permission = Reflector.createDecorator<RequiredPermission[]>();
