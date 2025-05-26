import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  Goal,
  GoalCreateDto,
  GoalUpdateDto,
} from '../../../shared/models/goal.model';
import { signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/goals`;
  private goalsSignal = signal<Goal[]>([]);

  goals = this.goalsSignal.asReadonly();

  constructor() {
    this.loadGoals();
  }

  loadGoals() {
    this.http.get<Goal[]>(this.baseUrl).subscribe({
      next: (goals) => {
        console.log('goals', goals);
        this.goalsSignal.set(goals);
      },
    });
  }

  createGoal(goal: GoalCreateDto) {
    return this.http.post<Goal>(this.baseUrl, goal).pipe(
      tap((newGoal) => {
        this.goalsSignal.update((goals) => [...goals, newGoal]);
      })
    );
  }

  updateGoal(id: string, changes: GoalUpdateDto) {
    return this.http.put<Goal>(`${this.baseUrl}/${id}`, changes).pipe(
      tap((updatedGoal) => {
        this.goalsSignal.update((goals) =>
          goals.map((goal) => (goal._id === id ? updatedGoal : goal))
        );
      })
    );
  }

  deleteGoal(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.goalsSignal.update((goals) =>
          goals.filter((goal) => goal._id !== id)
        );
      })
    );
  }
}
