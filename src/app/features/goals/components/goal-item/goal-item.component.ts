import { Component, inject, Input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Goal } from '../../../../shared/models/goal.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal-item',
  imports: [MatCheckbox, CommonModule, MatIcon],
  templateUrl: './goal-item.component.html',
  styleUrl: './goal-item.component.css',
})
export class GoalItemComponent {
  @Input({ required: true }) goal!: Goal;

  goalService = inject(GoalService);

  onDeleteGoal(event: MouseEvent) {
    event.stopPropagation();
    this.goalService.deleteGoal(this.goal._id).subscribe();
  }
}
