import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    Input,
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
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { sortBy, startCase } from 'lodash-es';
import { AssetType, DataPosition, PositionPagination } from '../page.types';
import { Service } from '../page.service';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceShared } from 'app/shared/shared.service';    
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

    files: File[] = [];
    tutor_id = JSON.parse(localStorage.getItem('user')).user.id; 

    // images: any = ['assets/images/gallery/1.jpg', 'assets/images/gallery/2.jpg', 'assets/images/gallery/3.jpg', 'assets/images/gallery/4.jpg'];
    images: any;
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

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.formData = this._formBuilder.group({
            // name: ['', Validators.required],
            // description: ['', Validators.required],
            images: ['', Validators.required],
        });
        this.display();
    }
    display(): void {
        this._Service.listDrdwGallery(this.tutor_id).subscribe((resp: any) => { 
            console.clear();
            this.images = resp ? resp : { data: [] };   
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

    update() {
         
        if (this.formData.valid === true) {
            let img = this.formData.value ; 
            let filesSelected =   img.images ; 
            let sendData = new FormData();  
            console.log('filesSelected ' , filesSelected );
            for (let i = 0; i <  filesSelected.length; i++) {
                console.log('filesSelected name' , filesSelected[i].name ); 
                sendData.append('images[]', filesSelected[i].name );
               
              }
              sendData.append('tutor_id', this.tutor_id);
          

            // let postData = {
            //     tutor_id: this.tutor_id,
            //     ...this.formData.value,
            // };
            console.log('sendData' , sendData)
            this._Service.uploadFileGallery(sendData).subscribe((resp: any) => {
                if (resp.status === true) {
                    this._Ssh.Toast.fire({
                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                    });
                    this._router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                            this._router.navigate(['/tutor/gallery/list']);
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
        } else {
            Swal.fire(
                'Warning!', //title
                'กรุณาระบุข้อมูลให้ครบ ก่อนทำรายการ!!', //main text
                'warning' //icon
            );
        }
    }

    onSelect(event) {
        this.files.push(...event.addedFiles);
        // Trigger Image Preview
        setTimeout(() => {
            this._changeDetectorRef.detectChanges();
        }, 150);
        this.formData.patchValue({
            images: this.files,
        });
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
        this.formData.patchValue({
            images: [],
        });
    }
}
