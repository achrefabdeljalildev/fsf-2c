import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    standalone: false,
})
export class UserDetailsComponent {
    showDetailsDialog = false;
    @Input() visible: boolean = false;
    @Input() userId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    isLoading: boolean = false;
    isEditMode: boolean = false;

    Name: string = 'الاسم';
    JobItle: string = 'المسمى الوظيفي';
    Rank: string = 'الرتبة';
    IDs: string = 'رقم الهوية';

    userDetails: UserModel | null = null;

    constructor(private userService: UserService) {}

    ngOnChanges(): void {
        if (this.visible && this.userId) {
            this.isEditMode = true;
            this.loadUser(this.userId);
        }
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.userId = null;
        this.isEditMode = false;
    }

    loadUser(id: number): void {
        this.isLoading = true;
        this.userService.getUserDetails(id).subscribe((response) => {
            this.userDetails = response.data as UserModel;
            this.isLoading = false;
        });
    }
}
