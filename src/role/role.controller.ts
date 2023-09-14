import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLES, Role } from './role.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @ApiOperation({ summary: 'Create new role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, type: [Role] })
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @ApiOperation({ summary: 'Delete role by value' })
    @ApiResponse({ status: 200 })
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('/:value')
    deleteRole(@Param('value') value: string) {
        return this.roleService.deleteRole(value);
    }
}
