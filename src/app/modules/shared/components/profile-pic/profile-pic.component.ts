import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DocumentService} from '../../services/documents.service';
import {switchMap} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/user.model';
import {UserAccountInfosModel} from '../../models/user-account-infos.model';
import {EmployeeModel} from '../../models/employee.model';

@Component({
    selector: 'app-profile-pic',
    templateUrl: './profile-pic.component.html',
    styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit, OnChanges {
    @Input() fileId!: string;
    @Input() fullName: string = '';
    imageSrc: string = '';
    employee: EmployeeModel | null = null;
    user: UserModel | undefined;
    userAccount: UserAccountInfosModel = { fullName: '', profilePicture: null, picture: null };
    defaultImageSrc: string = '../../assets/images/DefaultUser.jpg';
    isLoading: boolean = false;
    hasError: boolean = false;
    @Input() isSidebar: boolean = false;
    @Input() isSmall: boolean = false;
    @Input() isProfile: boolean = false;
    showProfileImage: boolean = true;
    showAddPhotoOverlay = false;
    showVisibility = true;

    constructor(
        private documentService: DocumentService,
        private employeeService: EmployeeService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.currentUser$.subscribe((data: UserModel | undefined) => {
            if (data) {
                this.user = data;
                this.employee = data.employee;

                this.showProfileImage = this.employee?.isProfilePictureHidden ?? false;

                this.imageSrc = data.profilePicture ? data.profilePicture : 'assets/images/DefaultUser.jpg';

                this.isLoading = false;
            }
        });
    }

    onSelectFile(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const file = input.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.isLoading = true;
                this.documentService
                    .uploadFile(file)
                    .pipe(
                        switchMap((res: any) => this.employeeService.updateProfilePicture(res.fileToken).pipe(switchMap(() => this.authService.reloadUserInfo()))),
                    )
                    .subscribe({
                        next: (res) => {
                            this.isLoading = false;
                        },
                        error: (err) => {
                            console.error(err);
                            this.isLoading = false;
                        },
                    });
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isLoading = false;
        if (changes['fileId'] && this.fileId) {
            this.documentService.downloadBinaryFileByToken(this.fileId).subscribe({
                next: (blob) => {
                    this.imageSrc = URL.createObjectURL(blob);
                    this.isLoading = false;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.hasError = true;
                },
            });
        }
    }

    toggleProfilePictureVisibility(): void {
        if (!this.user) {
            return;
        }

        this.showProfileImage = !this.showProfileImage;

        const employeeId = this.user?.employeeId;

        this.employeeService.updateProfilePictureVisibility(employeeId, this.showProfileImage).subscribe({
            next: () => {
                this.employee!.isProfilePictureHidden = this.showProfileImage;
                this.authService.reloadUserProfile();
                this.imageSrc = this.showProfileImage ? this.imageSrc : '../../assets/images/DefaultUser.jpg';
            },
        });
    }
}
