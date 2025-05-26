import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../../../shared/models/goal.model';

@Component({
  selector: 'app-edit-goal-item-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatCheckbox,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatHint,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-goal-item-dialog.component.html',
  styleUrl: './edit-goal-item-dialog.component.css',
})
export class EditGoalItemDialogComponent {
  goalService = inject(GoalService);
  dialogRef = inject(MatDialogRef<EditGoalItemDialogComponent>);
  data: { goal: Goal } = inject(MAT_DIALOG_DATA);

  dialogTitle = this.data ? 'Edit goal' : 'Add new goal';

  goalForm = new FormGroup({
    title: new FormControl<string>(this.data?.goal.title || '', {
      validators: [Validators.required],
    }),
    description: new FormControl<string>(this.data?.goal.description || ''),
    deadline: new FormControl<string>(this.data?.goal.deadline || '', {
      validators: [Validators.required],
    }),
    isPublic: new FormControl<boolean>(this.data?.goal.isPublic || false),
  });

  constructor() {}

  onConfirm() {
    const goal = {
      title: this.goalForm.value.title,
      description: this.goalForm.value.description,
      deadline: this.goalForm.value.deadline,
      isPublic: this.goalForm.value.isPublic,
    };
    this.dialogRef.close(goal);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
