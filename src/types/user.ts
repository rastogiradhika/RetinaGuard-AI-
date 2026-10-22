export type UserRole = 
  | 'vision_technician'
  | 'asha_worker'
  | 'medical_officer'
  | 'ophthalmologist'
  | 'administrator';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  healthCenter: string;
  district: string;
  state: string;
  abhaHealthProfessionalId?: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
