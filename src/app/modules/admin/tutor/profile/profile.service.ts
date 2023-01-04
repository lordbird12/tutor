import {
    HttpClient,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import {
    AssetItem,
    Store,
    AssetType,
    Chat,
    // PermissionProductDetailOSM,
    PositionPagination,
    PositionProduct,
    StoreType,
    AssetSize,
    Supplier,
    Division,
} from './page.types';
import { environment } from 'environments/environment';
import { AssetCategory } from 'app/shared/asset-category';
import { DataTablesResponse } from 'app/shared/datatable.types';
// import { UserDetail } from '../user/user.types';
const token = localStorage.getItem('accessToken') || null;
@Injectable({
    providedIn: 'root',
})
export class Service { 
    private _materials: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),  
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    //* get info by tutor_id
    getInfoById(tutor_id: any): Observable<any[]> { 
        return this._httpClient
            .get<any[]>(environment.API_URL + '/api/info/' + tutor_id)
            .pipe( 
                tap((meterial) => {
                    this._materials.next(meterial);
                })  
            );
    };
 
    saveInfo(data: any): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + '/api/info',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

}
