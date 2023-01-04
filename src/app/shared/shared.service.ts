import Swal from 'sweetalert2';
import { FuseAlertType, FuseAlertService } from '@fuse/components/alert';

import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class ServiceShared {
    constructor(private _fuseAlertService: FuseAlertService) {}

    // เรียก Sweet Alert
    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

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
