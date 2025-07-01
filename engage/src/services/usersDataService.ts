import DataService from './utils/dataservice/DataService'

// Types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  organization: string
  department: string
  // tenant: string
}

interface CreateUserCredentials {
  firstName: string
  lastName: string
  email: string
  role: string
  organization: string
  department: string
  // tenant: string
}

interface UpdateUserCredentials extends CreateUserCredentials {
  id: string
}

interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

class UsersDataService extends DataService {
  constructor() {
    super()
  }

  createUser = async (credentials: CreateUserCredentials): Promise<{ data: User[] }> => {
    return this.post('users', credentials)
  }

  updateUser = async (credentials: UpdateUserCredentials): Promise<{ data: User[] }> => {
    const { id, ...userData } = credentials
    return this.patch(`users/${id}`, userData)
  }

  getAllUsers = async (): Promise<{ data: User[] }> => {
    return this.get('users')
  }

  deleteUser = async (id: string): Promise<{ data: any }> => {
    return this.delete(`users/${id}`)
  }

  getLoggedinUsersInfo = async (): Promise<{ data: User }> => {
    return this.get('users/me')
  }

  editLoggedinUsersInfo = async (userData: Omit<CreateUserCredentials, 'id'>): Promise<{ data: User }> => {
    return this.patch('users/me', userData)
  }

  changePassword = async (passwordData: ChangePasswordRequest): Promise<{ data: any }> => {
    return this.post('users/me/change-password', passwordData)
  }
}

// Create a single instance
const usersDataService = new UsersDataService()
export default usersDataService 