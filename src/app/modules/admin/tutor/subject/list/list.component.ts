import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    debounceTime,
    map,
    merge,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { sortBy, startCase } from 'lodash-es';
import { AssetType, DataPosition, PositionPagination } from '../page.types';
import { Service } from '../page.service';
import { ServiceShared } from 'app/shared/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    formData: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    tutor_id = JSON.parse(localStorage.getItem('user')).user.id;
    subjects: any;
    SubjectForm: any = [];
    CheckEdit: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        // private _Service: PermissionService,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _Ssh: ServiceShared
    ) {
        this.formData = this._formBuilder.group({
            // phone: ['', Validators.required],
            name: ['', Validators.required],
            student_teach_1: true ,
            student_teach_2: true ,
            student_teach_3: true ,
            student_teach_4: true ,
            student_teach_5: true ,
            student_teach_6: true ,
            teach_date_1: true ,
            teach_date_2: true ,
            teach_time_1: true ,
            teach_time_2: true ,
            teach_time_3: true ,
            availability_1: true ,
            availability_2: true ,
            availability_3: true ,
            how_to_1: true ,
            how_to_2: true ,
            client_1: true ,
            client_2: true ,
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.display();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    display(): void {
        this._Service.listDrdwSubject(this.tutor_id).subscribe((resp: any) => {
            console.clear();
            this.subjects = resp ? resp : { data: [] };
        });
    }

    resetForm(): void {
        this.formData.reset({
            name:  '' ,
            student_teach_1: true ,
            student_teach_2: true ,
            student_teach_3: true ,
            student_teach_4: true ,
            student_teach_5: true ,
            student_teach_6: true ,
            teach_date_1: true ,
            teach_date_2: true ,
            teach_time_1: true ,
            teach_time_2: true ,
            teach_time_3: true ,
            availability_1: true ,
            availability_2: true ,
            availability_3: true ,
            how_to_1: true ,
            how_to_2: true ,
            client_1: true ,
            client_2: true ,
        });
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    textStatus(status: string): string {
        return startCase(status);
    }

    dialogSave() {
        let postData = { tutor_id: this.tutor_id, ...this.formData.value };
        console.log('dialogSave postData', postData);
        if (this.formData.valid === true) {
            Swal.fire({
                title: 'ยืนยันการบันทึกข้อมูล ?',
                // text: `${id}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง',
                allowEscapeKey: false,
                allowOutsideClick: false,
                cancelButtonText: 'ปิดหน้าต่าง',
            }).then((result) => {
                if (result.isConfirmed) {
                    let postData = {
                        tutor_id: this.tutor_id,
                        ...this.formData.value,
                    };
                    const mappedObj = Object.keys(postData).reduce(
                        (acc, key) => {
                            if (postData[key] === true) {
                                acc[key] = 'Yes';
                            } else if (postData[key] === false) {
                                acc[key] = 'No';
                            } else {
                                acc[key] = postData[key];
                            }
                            return acc;
                        },
                        {}
                    ); 

                    this._Service
                        .saveSubject(mappedObj)
                        .subscribe((resp: any) => {
                            if (resp.status === true) {
                                this._Ssh.Toast.fire({
                                    icon: 'success',
                                    title: 'บันทึกข้อมูลสำเร็จ',
                                }); 
                                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                                    this._router.navigate(['/tutor/subject/list']);
                                }); 
                            } else {
                                let code = resp.code ? resp.code : '';
                                this._Ssh.Toast_Stick.fire({
                                    icon: 'error',
                                    title: 'บันทึกข้อมูลไม่สำเร็จ',
                                    text: 'เกิดข้อผิดพลาด : ' + code,
                                });
                            }
                        });
                }
            });
        } else {
            Swal.fire(
                'Warning!', //title
                'กรุณาระบุข้อมูลให้ครบ ก่อนทำรายการ!!', //main text
                'warning' //icon
            );
        }
      
    }
    actionClickDialog(type: any): void {
        var openButton = document.getElementById('open');
        var dialog = document.getElementById('dialog');
        var closeButton = document.getElementById('close');
        var overlay = document.getElementById('overlay');

        if (type == 'Open') {
            this.CheckEdit = true;
            dialog.classList.remove('hidden');
            overlay.classList.remove('hidden');
            this.resetForm();
        } else {
            dialog.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    }

    editClickDialog(id: any): void {
        
        this.actionClickDialog('Open'); 
        this.CheckEdit = false;
        this._Service.getSubjectById(id).subscribe((resp: any) => {
            console.clear();
            let subjects = resp ? resp.data : { data: [] };
            const mappedObj = Object.keys(subjects).reduce((acc, key) => {
                if (subjects[key] === 'Yes') {
                    acc[key] = true;
                } else if (subjects[key] === 'No') {
                    acc[key] = false;
                } else {
                    acc[key] = subjects[key];
                }
                return acc;
            }, {});

            this.formData.patchValue({ ...mappedObj });
        });
    }

    delSubject(id: any): void { 
        console.log('delSubject', id); 
        Swal.fire({
            title: 'ต้องการลบข้อมูล ?',
            // text: `${id}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            allowEscapeKey: false,
            allowOutsideClick: false,
            cancelButtonText: 'ปิดหน้าต่าง',
        }).then((result) => {
            if (result.isConfirmed) { 
                this._Service
                        .delSubject(id)
                        .subscribe((resp: any) => {
                            if (resp.status === true) {
                                this._Ssh.Toast.fire({
                                    icon: 'success',
                                    title: 'ลบข้อมูลสำเร็จ',
                                }); 
                                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                                    this._router.navigate(['/tutor/subject/list']);
                                });  
                            } else {
                                let code = resp.code ? resp.code : '';
                                this._Ssh.Toast_Stick.fire({
                                    icon: 'error',
                                    title: 'ลบข้อมูลไม่สำเร็จ',
                                    text: 'เกิดข้อผิดพลาด : ' + code,
                                }); 
                            }
                        });


                // this._router.navigate(['/tutor/subject/list']);
            }
        });


    }

    
}
