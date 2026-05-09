import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

type Role = 'ADMIN' | 'PASTOR' | 'DEPARTMENT_LEADER' | 'FINANCE' | 'VIEWER';

type RequestWithUser = {
  user?: {
    role?: Role;
  };
};

const HIERARCHY: Record<Role, number> = {
  ADMIN: 100,
  PASTOR: 80,
  DEPARTMENT_LEADER: 60,
  FINANCE: 60,
  VIEWER: 10,
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) as Role[] | undefined;
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user || !user.role) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    const userRank = HIERARCHY[user.role] ?? 0;
    const allowed = requiredRoles.some((requiredRole) => {
      const requiredRank = HIERARCHY[requiredRole] ?? 0;
      return userRank >= requiredRank;
    });

    if (!allowed)
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    return true;
  }
}
