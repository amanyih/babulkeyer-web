import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Post()
  // addUser(@Body() user: createUserDto) {
  //   return this.userService.addNewUser(user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  allUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/status/:status')
  getUsersByStatus(@Param('status') status: string) {
    return this.userService.getUsersByStatus(status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateUser(@Param('id') id: string) {
    return this.userService.updateUser(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
