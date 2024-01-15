import { IProfile } from '../../interfaces/profile.interface';
import { Session } from '@supabase/supabase-js';

export interface AuthState {
  profile: IProfile | null;
  session: Session | null;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  profile: null,
  loading: false,
  session: null,
};
