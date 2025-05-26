import { Component, inject, OnDestroy } from '@angular/core';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { GoalService } from '../../services/goal.service';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditGoalItemDialogComponent } from '../edit-goal-item-dialog/edit-goal-item-dialog.component';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import {
  Goal,
  GoalCreateDto,
  GoalUpdateDto,
} from '../../../../shared/models/goal.model';

@Component({
  selector: 'app-goal-list',
  imports: [GoalItemComponent, MatIcon, MatFabButton],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
})
export class GoalListComponent implements OnDestroy {
  readonly goalService = inject(GoalService);
  readonly dialog = inject(MatDialog);

  private unsubscribe = new Subject<void>();

  onAddNewGoal() {
    const newGoalDialog = this.dialog.open(EditGoalItemDialogComponent, {
      width: '600px',
    });

    newGoalDialog
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newGoal: GoalCreateDto) =>
          this.goalService.createGoal(newGoal)
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
  }

  onEditGoal(goal: Goal) {
    const editGoalDialog = this.dialog.open(EditGoalItemDialogComponent, {
      width: '600px',
      data: {
        goal,
      },
    });

    editGoalDialog
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedGoal: GoalUpdateDto) =>
          this.goalService.updateGoal(goal._id, updatedGoal)
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
