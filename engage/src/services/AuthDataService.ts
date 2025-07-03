import DataService from "./utils/dataservice/DataService"

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterValues {
    firstName: string
    lastName: string
    email: string
    password: string
    organizationName: string
}

interface VerificationData {
    token?: string
    email?: string
}

class AuthDataService extends DataService {
    constructor() {
        super()
    }

    async login(credentials: LoginCredentials) {
        return this.post('auth/login', credentials)
    }

    async register(values: RegisterValues) {
        return this.post('/registration', values)
    }

    async registerVerification(verificationData?: VerificationData) {
        return this.get('/registration/verify', verificationData)
    }

    async registerationResendVerification(verificationData: VerificationData) {
        return this.post('/registration/resend-verification', verificationData)
    }

    async logout() {
        return this.post('/auth/logout')
    }
}

// Create a single instance
const authDataService = new AuthDataService()
export default authDataService
