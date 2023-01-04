import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ServiceShared } from 'app/shared/shared.service'; 

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    formData: FormGroup
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
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
        private _Ssh: ServiceShared,
    ) {
        this.formData = this._formBuilder.group({
            email: ['', Validators.required],
            phone: ['', Validators.required],
            line: ['', Validators.required],
            facebook: [''],
            youtube: [''], 
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._Service.getContactById(this.tutor_id).subscribe((resp: any) => { 
            let data = resp.data ? resp.data : [];  
            this.formData.patchValue({
                ...data
            });
        })  
    }

 
    /**
     * After view init
     */
    ngAfterViewInit(): void {

    }

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

    update() {
        let postData = { tutor_id : this.tutor_id, ...this.formData.value}; 
        this._Service.saveContact(postData).subscribe((resp: any) => {   
            if(resp.status === true){ 
                  this._Ssh.Toast.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ'
                  })
            }else{ 
                let code = resp.code ? resp.code : '' ;
                this._Ssh.Toast_Stick.fire({
                    icon: 'error',
                    title: 'บันทึกข้อมูลไม่สำเร็จ', 
                    text: 'เกิดข้อผิดพลาด : '+ code  , 
                  }) 
            } 
        }) ;
    }

}
