// types.d.ts
import { WebAppUser } from '@twa-dev/sdk';

export interface ExtendedWebAppUser extends WebAppUser {
  id: number; // Kullanıcı ID'sini number olarak tanımlayın
  username?: string;
  
  photo?: {
    small_file_id: string;
    big_file_id: string;
  };
}
