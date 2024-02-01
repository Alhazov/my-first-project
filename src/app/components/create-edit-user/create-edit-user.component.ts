import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit{
  userForm: FormGroup;
  isEdit: boolean = false;
  buttonText: string = 'Создать';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: ['']
    })

    if (data && data.user) {
      this.userForm.patchValue(data.user);
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.isEdit) {
      this.isEdit = true;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const resultData = {
        ...this.userForm.value,
        // id: this.data.user ? this.data.user.id : null,
        isEdit: this.isEdit
      };

      if (this.isEdit) {
        resultData.id = this.data.user?.id ?? null; // Используем опциональную цепочку и условный оператор для добавления id
      }

      this.dialogRef.close(resultData); // this.userForm.value
    }
  }
}
