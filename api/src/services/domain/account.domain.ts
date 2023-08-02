import { type Account } from '@/db/schema';

export interface AccountDTO extends Omit<Account, 'hashedPassword'> {}
