export declare class CreateOtpDto {
    email: string;
    name: string;
    password: string;
}
export declare class RegisterUserDto extends CreateOtpDto {
    otp: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
