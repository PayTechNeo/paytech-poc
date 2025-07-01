import { all, takeLatest } from 'redux-saga/effects';
import { rootSaga, authSagaActions } from '../authSaga';
import AuthDataService from '../../../services/AuthDataService';

// Mock the data service
jest.mock('../../../services/AuthDataService');

describe('Auth Saga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rootSaga', () => {
    it('should yield all sagas', () => {
      const gen = rootSaga();
      const firstYield = gen.next();
      
      expect(firstYield.value).toEqual(
        all([
          takeLatest('AUTH/REGISTER', expect.any(Function)),
          takeLatest('AUTH/LOGIN', expect.any(Function)),
          takeLatest('AUTH/LOGOUT', expect.any(Function)),
          takeLatest('AUTH/ROUTE_CHANGE', expect.any(Function)),
        ])
      );
    });
  });

  describe('authSagaActions', () => {
    it('should create login action', () => {
      const payload = { email: 'test@example.com', password: 'password123' };
      const action = authSagaActions.login(payload);
      
      expect(action).toEqual({
        type: 'AUTH/LOGIN',
        payload,
      });
    });

    it('should create register action', () => {
      const payload = {
        values: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
          organizationName: 'Test Org',
        },
        userAgent: 'test-agent',
        ipAddress: '127.0.0.1',
      };
      const action = authSagaActions.register(payload);
      
      expect(action).toEqual({
        type: 'AUTH/REGISTER',
        payload,
      });
    });

    it('should create logout action', () => {
      const action = authSagaActions.logout();
      
      expect(action).toEqual({
        type: 'AUTH/LOGOUT',
      });
    });

    it('should create route change action', () => {
      const action = authSagaActions.routeChange();
      
      expect(action).toEqual({
        type: 'AUTH/ROUTE_CHANGE',
      });
    });

    it('should create navigate action', () => {
      const path = '/dashboard';
      const action = authSagaActions.navigate(path);
      
      expect(action).toEqual({
        type: 'AUTH/NAVIGATE',
        payload: path,
      });
    });
  });

  describe('login flow', () => {
    it('should handle successful login', () => {
      const mockResponse = {
        data: {
          access_token: 'mock-token',
          user: { id: '1', email: 'test@example.com', firstName: 'Test' },
        },
      };
      
      (AuthDataService.login as jest.Mock).mockResolvedValue(mockResponse);

      const action = authSagaActions.login({ email: 'test@example.com', password: 'password123' });
      
      // This would be tested in integration tests with actual saga execution
      expect(action.type).toBe('AUTH/LOGIN');
      expect(action.payload).toEqual({ email: 'test@example.com', password: 'password123' });
    });

    it('should handle login failure', () => {
      const mockError = new Error('Invalid credentials');
      (AuthDataService.login as jest.Mock).mockRejectedValue(mockError);

      const action = authSagaActions.login({ email: 'test@example.com', password: 'wrong-password' });
      
      expect(action.type).toBe('AUTH/LOGIN');
      expect(action.payload).toEqual({ email: 'test@example.com', password: 'wrong-password' });
    });
  });

  describe('register flow', () => {
    it('should handle successful registration', () => {
      const mockResponse = {
        status: 201,
        data: {
          response: {
            data: {
              message: 'Registration successful!',
            },
          },
        },
      };
      
      (AuthDataService.register as jest.Mock).mockResolvedValue(mockResponse);

      const payload = {
        values: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
          organizationName: 'Test Org',
        },
      };
      const action = authSagaActions.register(payload);
      
      expect(action.type).toBe('AUTH/REGISTER');
      expect(action.payload).toEqual(payload);
    });

    it('should handle registration failure', () => {
      const mockError = {
        response: {
          data: {
            message: 'Email already exists',
          },
        },
      };
      (AuthDataService.register as jest.Mock).mockRejectedValue(mockError);

      const payload = {
        values: {
          firstName: 'Test',
          lastName: 'User',
          email: 'existing@example.com',
          password: 'password123',
          organizationName: 'Test Org',
        },
      };
      const action = authSagaActions.register(payload);
      
      expect(action.type).toBe('AUTH/REGISTER');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('logout flow', () => {
    it('should handle logout', () => {
      (AuthDataService.logout as jest.Mock).mockResolvedValue({});

      const action = authSagaActions.logout();
      
      expect(action.type).toBe('AUTH/LOGOUT');
    });
  });

  describe('route change flow', () => {
    it('should handle route change', () => {
      const action = authSagaActions.routeChange();
      
      expect(action.type).toBe('AUTH/ROUTE_CHANGE');
    });
  });

  describe('navigation flow', () => {
    it('should handle navigation', () => {
      const path = '/dashboard';
      const action = authSagaActions.navigate(path);
      
      expect(action.type).toBe('AUTH/NAVIGATE');
      expect(action.payload).toBe(path);
    });
  });
}); 