import {
    Controller,
    Post,
    Body,
    HttpCode,
    UseGuards,
    Version,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/is-public.decorator';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerificationDto } from './dto/verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CheckHostGuard } from './guards/check-host.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterV2Dto } from './dto/register-v2.dto';
import { VerificationV2Dto } from './dto/verification-v2.dto';
import { ResendVerifyCodeV2Dto } from './dto/resend-verify-code-v2.dto';
import { MobileLogoutDto } from './dto/mobile-logout.dto';
import { CurrentUser } from './decorators/current-user';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { CheckDto } from './dto/check.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     *
     * @param register Userlar uchun ro'yxatdan o'tish version 2
     * @returns
     */
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'Successfully register' })
    @Public()
    @Post('register')
    registerv2(@Body() register: RegisterV2Dto) {
        return this.authService.registerV2(register);
    }

    /**
     *
     * @param login Userlar uchun tizimga kirish
     * @returns
     */
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Successfully user login' })
    @HttpCode(200)
    @Public()
    @Post('user/login')
    login(@Body() login: UserLoginDto) {
        return this.authService.userLogin(login);
    }

    @ApiOperation({ summary: 'User verification' })
    @ApiResponse({ status: 201, description: 'Successfully verified' })
    @HttpCode(200)
    @Public()
    @Post('verify')
    verifyV2(@Body() verify: VerificationV2Dto) {
        return this.authService.verifyV2(verify);
    }

    @Public()
    @Post('check')
    check(@Body() dto: CheckDto) {
        return this.authService.check(dto);
    }

    @Version('2')
    @HttpCode(200)
    @Public()
    @Post('resendVerifyCode')
    resendVerifyCodeV2(@Body() dto: ResendVerifyCodeV2Dto) {
        return this.authService.resendVerificationCode(dto);
    }
    /**
     *
     * @param login Oliygoh adminlari uchun tizimga kirish
     * @param request
     * @returns
     */
    @Public()
    @UseGuards(CheckHostGuard)
    @HttpCode(200)
    @Post('admin/login')
    adminLogin(@Body() login: AdminLoginDto) {
        return this.authService.adminLogin(login);
    }

    /**
     *
     * @param login Super admin uchun tizimga kirish
     * @returns
     */
    @Public()
    @HttpCode(200)
    @Post('super-admin/login')
    superAdminLogin(@Body() login: AdminLoginDto) {
        return this.authService.superAdminLogin(login);
    }

    /**
     *
     * @param forgot User parolini unutgan bo'lsa telefon nomerini shuyerdan kiritadi
     * unga sms ni id(uuis) si qaytadi, undan keyin confirm url ga murojaat qiladi
     * @returns
     */
    @Public()
    @HttpCode(200)
    @Post('forgot-password')
    forgotPassword(@Body() forgot: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgot);
    }

    /**
     *
     * @param confirm User forgot password qilgandan keyin unga sms boradi smsni
     * @returns
     */
    @Public()
    @HttpCode(200)
    @Post('confirm')
    confirmForgotPassword(@Body() confirm: VerificationDto) {
        return this.authService.confirmForgotPassword(confirm);
    }

    /**
     *
     * @param reset Yangi parol yaratish
     * @returns
     */
    @Public()
    @HttpCode(200)
    @Post('reset-password')
    resetPassword(@Body() reset: ResetPasswordDto) {
        return this.authService.resetPassword(reset);
    }

    /**
     *
     * @param dto Refresh token orqali access token olish
     * @returns
     */
    @Public()
    @HttpCode(200)
    @Post('refresh')
    adminRefreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @HttpCode(200)
    @Roles(Role.USER)
    @ApiBearerAuth()
    @Post('logout')
    mobileLogout(
        @Body() dto: MobileLogoutDto,
        @CurrentUser('id', ParseIntPipe) user_id: number,
    ) {
        return this.authService.logoutWithMobile(user_id, dto);
    }
}
