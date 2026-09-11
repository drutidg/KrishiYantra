import { User } from '@/types';

export const DEMO_FARMER_PHONE = '9876543210';
export const DEMO_STAFF_PHONE = '9876543211';

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('krishiyantra_user') || localStorage.getItem('kisanqueue_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('krishiyantra_user', JSON.stringify(user));
  localStorage.setItem('kisanqueue_user', JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('krishiyantra_user');
  localStorage.removeItem('kisanqueue_user');
}
