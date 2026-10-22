import type { ScreeningSession, ScreeningStats } from '../types/screening';
import { DEMO_SESSIONS, DEMO_STATS } from './demoData';
import { api } from './api';

export class ScreeningService {

  async getAllScreenings(): Promise<{ data: ScreeningSession[]; isMock: boolean }> {
    try {
      const response = await api.get<{ data: ScreeningSession[] }>('/screenings');
      return { data: response.data, isMock: false };
    } catch {
      // Graceful fallback to verified typed demo dataset
      return { data: [...DEMO_SESSIONS], isMock: true };
    }
  }

  async getScreeningById(id: string): Promise<{ data: ScreeningSession | null; isMock: boolean }> {
    try {
      const response = await api.get<{ data: ScreeningSession }>(`/screenings/${id}`);
      return { data: response.data, isMock: false };
    } catch {
      const found = DEMO_SESSIONS.find(s => s.id === id) || null;
      return { data: found, isMock: true };
    }
  }

  async getScreeningStats(): Promise<{ stats: ScreeningStats; isMock: boolean }> {
    try {
      const response = await api.get<{ stats: ScreeningStats }>('/stats');
      return { stats: response.stats, isMock: false };
    } catch {
      return { stats: DEMO_STATS, isMock: true };
    }
  }
}

export const screeningService = new ScreeningService();
