import type { SuccessResponse } from "../config/axios.instance";
import type { ICredentials, IForgotPasswordForm, IRegisterForm, IResetPasswordForm } from "../pages/authentication/validator";
import BaseService from "./base.service";

class AuthService extends BaseService {
    async loginUser(credentials: ICredentials) {
        const response = await this.postRequest('auth/login', credentials) as unknown as SuccessResponse; // This will ensure the response is typed correctly
        localStorage.setItem('at', response.data.accessToken); // Store the token in localStorage
        localStorage.setItem('rt', response.data.refreshToken); // Store the user data in localStorage
    }

    async getUserProfile() {
        return await this.getRequest('auth/me-panel', {
            headers: {
                Authorization: "Bearer "+ localStorage.getItem('at'),
            },
        }); // This will ensure the response is typed correctly
    }

    async logoutUser() {   
        await this.getRequest('auth/logout'); // This will ensure the response is typed correctly
        localStorage.removeItem('at',); // Clear access token from localStorage
        localStorage.removeItem('rt'); // Clear refresh token from localStorage

    }

    async registerUser(data: IRegisterForm) {
        return await this.postRequest('auth/signup', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }) as unknown as SuccessResponse; // This will ensure the response is typed correctly
    }

    async activateUserProfile(token: string) {
        return await this.getRequest('auth/activate/'+token); // This will ensure the response is typed correctly
    }

    async forgetPassword(data: IForgotPasswordForm) {
        return await this.postRequest('auth/forget-password',data); // This will ensure the response is typed correctly
    }

    async resetPassword(data: IResetPasswordForm,token: string) {
        return await this.putRequest('auth/reset-password',data,{
            headers: {
                Authorization: "Bearer "+ token,
            },
        })
    }

}
const authService = new AuthService();
export default authService;