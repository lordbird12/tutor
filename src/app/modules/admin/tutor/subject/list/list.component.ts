import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog , MatDialogRef } from '@angular/material/dialog';
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
    tutor_id = JSON.parse(localStorage.getItem('user')).user.id; 
    subjects : any;
    SubjectForm : any = [];
 
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
            // phone: ['', Validators.required],
            // line: ['', Validators.required],
            // facebook: ['', Validators.required],
            // youtube: ['', Validators.required],
            name: ['' ],
            student_teach_1: ['' ],
            student_teach_2: ['' ],
            student_teach_3: ['' ],
            student_teach_4: ['' ],
            student_teach_5: ['' ],
            student_teach_6: ['' ],
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
     
        this.display();

        // this._Service.listDrdwSubject(this.tutor_id).subscribe((resp: any) => { 
        //     let { name  , description } = resp.data ? resp.data : [];  
        //     this.formData.patchValue({
        //         name: name ,
        //         description: description ,
        //     });
        // }); 
       
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
    display(): void {
        this._Service.listDrdwSubject(this.tutor_id).subscribe((resp: any) => { 
            console.clear();
            this.subjects = resp ? resp : { data: [] };  
        }); 
    }
 
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

    dialogSave() {
        let postData = { tutor_id:this.tutor_id , ...this.formData.value}; 
        console.log('dialogSave postData' , postData);
        // let postData = { tutor_id:this.tutor_id , ...this.formData.value}; 
        // this._Service.saveSubject(postData).subscribe((resp: any) => {   
        //     if(resp.status === true){ 
        //           this._Ssh.Toast.fire({
        //             icon: 'success',
        //             title: 'บันทึกข้อมูลสำเร็จ'
        //           })
        //     }else{ 
        //         let code = resp.code ? resp.code : '' ;
        //         this._Ssh.Toast_Stick.fire({
        //             icon: 'error',
        //             title: 'บันทึกข้อมูลไม่สำเร็จ', 
        //             text: 'เกิดข้อผิดพลาด : '+ code  , 
        //           }) 
        //     } 
        // }) ;
    }
    actionClickDialog(type: any): void {
        var openButton = document.getElementById('open');
        var dialog = document.getElementById('dialog');
        var closeButton = document.getElementById('close');
        var overlay = document.getElementById('overlay');
    
        if (type == "Open") {
          dialog.classList.remove('hidden');
          overlay.classList.remove('hidden');
        //   this.formData.patchValue({
        //             name: this.SubjectForm.name ,
        //             student_teach_1: this.SubjectForm.student_teach_1 ,
        //             student_teach_2: this.SubjectForm.student_teach_2 ,
        //             student_teach_3: this.SubjectForm.student_teach_3 ,
        //             student_teach_4: this.SubjectForm.student_teach_4 ,
        //             student_teach_5: this.SubjectForm.student_teach_5 ,
        //             student_teach_6: this.SubjectForm.student_teach_6 ,
        //   });
          
        
        }
        else {
          dialog.classList.add('hidden');
          overlay.classList.add('hidden'); 
        }
      }

 
}

  