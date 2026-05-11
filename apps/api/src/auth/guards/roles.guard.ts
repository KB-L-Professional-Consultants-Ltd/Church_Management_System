import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

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

    const userRank = HIERARCHY[user.role];
    if (userRank === undefined) {
      throw new ForbiddenException(
        'Invalid user role configuration. Please contact an administrator.',
      );
    }

    const allowed = requiredRoles.some((requiredRole) => {
      const requiredRank = HIERARCHY[requiredRole];
      if (requiredRank === undefined) {
        throw new InternalServerErrorException(
          `Role '${requiredRole}' is not defined in HIERARCHY. Check @Roles() decorator usage.`,
        );
      }
      return userRank >= requiredRank;
    });

    if (!allowed)
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    return true;
  }
}
