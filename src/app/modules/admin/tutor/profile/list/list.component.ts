import { Input, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { sortBy, startCase } from 'lodash-es';
import { AssetType, DataPosition, PositionPagination } from '../page.types';
import { Service } from '../page.service';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertType , FuseAlertService } from '@fuse/components/alert';

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
    flashErrorMessage: string;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    showAlert: boolean = false; 
    itemData: any = [];
    tutor_id = JSON.parse(localStorage.getItem('user')).user.id; 
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
        private _fuseAlertService: FuseAlertService
    ) { 
        this.formData = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        }); 
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * On init
     */
    
    ngOnInit(): void {   
        this._Service.getInfoById(this.tutor_id).subscribe((resp: any) => { 
            this.itemData = resp.data ? resp.data : []; 
            let { name  , description } = this.itemData; 
            this.formData.patchValue({
                name: name ,
                description: description ,
            });
        });
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

    resetForm(): void {
        this.formData.reset();
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

    update2(): void {
    
        this.flashMessage = null;
        this.flashErrorMessage = null;
        // Return if the form is invalid
        if (this.formData.invalid) {
            return;
        }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'แก้ไขรายการ',
            message: 'คุณต้องการแก้ไขรายการใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Disable the form 
                let postData = { tutor_id:this.tutor_id , ...this.formData.value}
                this._Service.saveInfo(postData).subscribe({
                    next: (resp: any) => {
                        this._router
                            .navigateByUrl('tutor/profile/list')
                            .then(() => {});
                    },
                    error: (err: any) => {
                        this._fuseConfirmationService.open({
                            title: 'กรุณาระบุข้อมูล',
                            message: err.error.message,
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'ยืนยัน',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                        console.log(err.error.message);
                    },
                });
            }
        });
    }

    update() { 
        let postData = { tutor_id:this.tutor_id , ...this.formData.value}
        this._Service.saveInfo(postData).subscribe((resp: any) => { 
            // this.itemData = resp.data ? resp.data : [];  
            console.log('resp' , resp);  
            // resp.status == true ?  this.showFlashMessage("success") :this.showFlashMessage("error")  ;
           
        this.showAlert = true; 
        console.log('this.showAlert' , this.showAlert)
        this.showFuseAlert('alertSave');
        setTimeout(() => this.dismissFuseAlert('alertSave'), 2000);
         
        });

        
 
    }

    /**
     * Fuse Alert Service
     */
    dismissFuseAlert(name: string): void {
        this._fuseAlertService.dismiss(name);
    }
    showFuseAlert(name: string): void {
        this._fuseAlertService.show(name);
    }
}
