import authReducer, { authActions } from '../slices/authSlice';

describe('Auth Slice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loginLoadingState: { state: 'READY' as const, message: '' },
    showErrorMessage: false as string | false,
    showSuccessMessage: false as string | false,
    navigationPath: null,
    registrationDetails: {
      data: null,
      loading: false,
      error: null,
    },
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setLoginLoadingState', () => {
    it('should handle login loading state', () => {
      const loadingState = { state: 'LOADING' as const, message: 'Signing in...' };
      const action = authActions.setLoginLoadingState(loadingState);
      const newState = authReducer(initialState, action);

      expect(newState.loginLoadingState).toEqual(loadingState);
    });
  });

  describe('setShowErrorMessage', () => {
    it('should handle error message', () => {
      const errorMessage = 'Invalid credentials';
      const action = authActions.setShowErrorMessage(errorMessage);
      const newState = authReducer(initialState, action);

      expect(newState.showErrorMessage).toBe(errorMessage);
    });

    it('should clear error message', () => {
      const stateWithError = { ...initialState, showErrorMessage: 'Error message' };
      const action = authActions.setShowErrorMessage(false);
      const newState = authReducer(stateWithError, action);

      expect(newState.showErrorMessage).toBe(false);
    });
  });

  describe('setShowSuccessMessage', () => {
    it('should handle success message', () => {
      const successMessage = 'Login successful';
      const action = authActions.setShowSuccessMessage(successMessage);
      const newState = authReducer(initialState, action);

      expect(newState.showSuccessMessage).toBe(successMessage);
    });

    it('should clear success message', () => {
      const stateWithSuccess = { ...initialState, showSuccessMessage: 'Success message' };
      const action = authActions.setShowSuccessMessage(false);
      const newState = authReducer(stateWithSuccess, action);

      expect(newState.showSuccessMessage).toBe(false);
    });
  });

  describe('setNavigationPath', () => {
    it('should set navigation path', () => {
      const path = '/dashboard';
      const action = authActions.setNavigationPath(path);
      const newState = authReducer(initialState, action);

      expect(newState.navigationPath).toBe(path);
    });

    it('should clear navigation path', () => {
      const stateWithPath = { ...initialState, navigationPath: '/dashboard' };
      const action = authActions.setNavigationPath(null);
      const newState = authReducer(stateWithPath, action);

      expect(newState.navigationPath).toBe(null);
    });
  });

  describe('setAuthenticated', () => {
    it('should set authenticated state to true', () => {
      const action = authActions.setAuthenticated(true);
      const newState = authReducer(initialState, action);

      expect(newState.isAuthenticated).toBe(true);
    });

    it('should set authenticated state to false', () => {
      const loggedInState = { ...initialState, isAuthenticated: true };
      const action = authActions.setAuthenticated(false);
      const newState = authReducer(loggedInState, action);

      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('setUser', () => {
    it('should set user', () => {
      const mockUser = { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User' };
      const action = authActions.setUser(mockUser);
      const newState = authReducer(initialState, action);

      expect(newState.user).toEqual(mockUser);
    });

    it('should clear user', () => {
      const stateWithUser = { 
        ...initialState, 
        user: { id: '1', email: 'test@example.com' } 
      };
      const action = authActions.setUser(null);
      const newState = authReducer(stateWithUser, action);

      expect(newState.user).toBe(null);
    });
  });

  describe('setRegistrationDetails', () => {
    it('should set registration details', () => {
      const registrationDetails = {
        data: { email: 'test@example.com' },
        loading: true,
        error: null,
      };
      const action = authActions.setRegistrationDetails(registrationDetails);
      const newState = authReducer(initialState, action);

      expect(newState.registrationDetails).toEqual(registrationDetails);
    });
  });

  describe('clearAuth', () => {
    it('should clear all auth state', () => {
      const loggedInState = {
        ...initialState,
        isAuthenticated: true,
        user: { id: '1', email: 'test@example.com' },
        loginLoadingState: { state: 'LOADING' as const, message: 'Loading...' },
        showErrorMessage: 'Error',
        showSuccessMessage: 'Success',
        navigationPath: '/dashboard',
        registrationDetails: {
          data: { email: 'test@example.com' },
          loading: true,
          error: 'Error',
        },
      };
      const action = authActions.clearAuth();
      const newState = authReducer(loggedInState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('state transitions', () => {
    it('should handle complete login flow', () => {
      let state = authReducer(initialState, authActions.setLoginLoadingState({ 
        state: 'LOADING', 
        message: 'Signing in...' 
      }));
      expect(state.loginLoadingState.state).toBe('LOADING');

      const mockUser = { id: '1', email: 'test@example.com' };
      state = authReducer(state, authActions.setUser(mockUser));
      state = authReducer(state, authActions.setAuthenticated(true));
      state = authReducer(state, authActions.setShowSuccessMessage('Login successful'));
      
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.showSuccessMessage).toBe('Login successful');

      state = authReducer(state, authActions.clearAuth());
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.loginLoadingState.state).toBe('READY');
    });

    it('should handle login failure flow', () => {
      let state = authReducer(initialState, authActions.setLoginLoadingState({ 
        state: 'LOADING', 
        message: 'Signing in...' 
      }));
      expect(state.loginLoadingState.state).toBe('LOADING');

      state = authReducer(state, authActions.setShowErrorMessage('Invalid credentials'));
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.showErrorMessage).toBe('Invalid credentials');

      state = authReducer(state, authActions.setShowErrorMessage(false));
      expect(state.showErrorMessage).toBe(false);
    });
  });
}); 