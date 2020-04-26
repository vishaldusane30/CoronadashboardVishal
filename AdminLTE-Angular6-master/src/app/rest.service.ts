import { WSR } from './Modelclass/WSR';
import { Application } from './Modelclass/Application';
import { Release } from './Modelclass/Release';
import { Efforts } from './Modelclass/Efforts';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Users } from './Modelclass/Users';
import { Task } from './Modelclass/task';
import { RiskIssue } from './Modelclass/RiskIssue';
import { ActionItem } from './Modelclass/ActionItem';
import { MOM } from './Modelclass/MOM';
import { Review } from './Modelclass/Review';
import { ReviewDetails } from './Modelclass/ReviewDetails';
import { DefectDetails } from './Modelclass/DefectDetails';



 const endpointcybmis = 'https://cybagemis.cybage.com:7865/TESWS/TESService.asmx';
//const endpointcybmis = 'https://docs.dhtmlx.com/gantt/samples/common/data.json';


 const endpoint = 'http://localhost:65389/api/Timesheet';

// const endpoint = 'http://172.27.123.64/timeapi/Api/Timesheet';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  GetCustomerlst(): Observable<any> {
    // return this.http.get(endpoint + 'GetCustomerlst').pipe(
      return this.http.get(endpoint + 'gettest').pipe(
      map(this.extractData));
  }



  getProduct(id): Observable<any> {
    return this.http.get(endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }


  addCust (customer:any): Observable<any> {

    console.log(customer);
    return this.http.post<any>(endpoint + 'Create?value=' + 'd', httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  saveRelease(release: Release) {

    return this.http.post(endpoint + 'Create', release)

      .pipe(map(
        response => {
          return response;
        }));
  }


  createRelease(release: Release): Observable<Release> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Release>(endpoint + '/InsertReleaseDetails/', release, httpOptions);
  }

  updateRelease(release: Release): Observable<Release> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Release>(endpoint + '/UpdateReleaseDetails/', release, httpOptions);
  }

  getReleaseById(ReleaseID: number): Observable<Release> {
    return this.http.get<Release>(endpoint + '/GetReleaseDetailsById/' + ReleaseID);
  }


  saveActionItem(actionItem: ActionItem) {

    return this.http.post(endpoint + 'Create', actionItem)

      .pipe(map(
        response => {
          return response;
        }));
  }


  createActionItem(actionItem: ActionItem): Observable<ActionItem> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<ActionItem>(endpoint + '/InsertActionItemDetails/', actionItem, httpOptions);
  }

  updateActionItem(actionItem: ActionItem): Observable<ActionItem> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<ActionItem>(endpoint + '/UpdateActionItemDetails/', actionItem, httpOptions);
  }

  getActionItemById(ActionItemID: number): Observable<ActionItem> {
    return this.http.get<ActionItem>(endpoint + '/GetActionItemDetailsById/' + ActionItemID);
  }

  GetActionItemReport(): Observable<any> {

    return this.http.get(endpoint + '/GetActionItemReport').pipe(
    map(this.extractData));
}



GeActionItemReportdt(dt1: string, dt2: string): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(endpoint + '/GetActionItemReportcst/' + dt1 + '/' + dt2).pipe(
    map(this.extractData));
  }


  GeMOMReportdt(dt1: string, dt2: string): Observable<any> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(endpoint + '/GetMOMReportcst/' + dt1 + '/' + dt2).pipe(
      map(this.extractData));
    }


createReview(review: Review): Observable<Review> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post<Review>(endpoint + '/InsertReviewDetails/', review, httpOptions);
}

updateReview(review: Review): Observable<Review> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.put<Review>(endpoint + '/UpdateReviewDetails/', review, httpOptions);
}

AddReviewDetails(ReviewDetails: ReviewDetails): Observable<Review> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.put<Review>(endpoint + '/AddReviewDetails/', ReviewDetails, httpOptions);
}


AddDefectDetails(DefectDetails: DefectDetails): Observable<Review> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.put<Review>(endpoint + '/AddDefectDetails/', DefectDetails, httpOptions);
}

getReviewById(reviewID: number): Observable<Review> {
  return this.http.get<Review>(endpoint + '/GetReviewDetailsById/' + reviewID);
}

getReviewedDetById(reviewID: number): Observable<ReviewDetails> {
  return this.http.get<ReviewDetails>(endpoint + '/GetReviewDetById/' + reviewID);
}

GetReviewReport(): Observable<any> {

  return this.http.get(endpoint + '/GetReviewReport').pipe(
  map(this.extractData));
}


GeReviewReportdt(dt1: string, dt2: string): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(endpoint + '/GetReviewReportCst/' + dt1 + '/' + dt2).pipe(
    map(this.extractData));
  }

DeleteReviewById(ID: number): Observable<WSR> {
  return this.http.get<WSR>(endpoint + '/DeleteReviewDetails/' + ID);
}




createMOM(mom: MOM): Observable<MOM> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post<MOM>(endpoint + '/InsertMOMDetails/', mom, httpOptions);
}

updateMOM(mom: MOM): Observable<MOM> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.put<MOM>(endpoint + '/UpdateMOMDetails/', mom, httpOptions);
}

getMOMById(momID: number): Observable<MOM> {
  return this.http.get<MOM>(endpoint + '/GetMOMDetailsById/' + momID);
}

GetMOMReport(): Observable<any> {

  return this.http.get(endpoint + '/GetMOMReport').pipe(
  map(this.extractData));
}

DeleteMOMbyUD(ID: number): Observable<MOM> {
  return this.http.get<MOM>(endpoint + '/DeleteMOMDetails/' + ID);
}

DeleteActionbyUD(ID: number): Observable<MOM> {
  return this.http.get<MOM>(endpoint + '/DeleteActionDetails/' + ID);
}











  GetEffortsReport(): Observable<any> {

    return this.http.get('https://api.covid19india.org/data.json').pipe(
    map(this.extractData));
}


  createEfforts(efforts: Efforts): Observable<Efforts> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Efforts>(endpoint + '/InsertReleaseEstimationDetails/', efforts, httpOptions);
  }

  updateEfforts(efforts: Efforts): Observable<Efforts> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Efforts>(endpoint + '/UpdateReleaseEstimationDetails/', efforts, httpOptions);
  }

  getEffortsById(effortsID: number): Observable<Efforts> {
    return this.http.get<Efforts>(endpoint + '/GetReleaseEstimationDetailsById/' + effortsID);
  }





  createRiskIssue(riskissue: RiskIssue): Observable<RiskIssue> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<RiskIssue>(endpoint + '/InsertRiskissueDetails/', riskissue, httpOptions);
  }

  updateRiskIssue(riskissue: RiskIssue): Observable<RiskIssue> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<RiskIssue>(endpoint + '/UpdateRiskissueDetails/', riskissue, httpOptions);
  }

  getRiskIssueById(RiskIssueID: number): Observable<RiskIssue> {
    return this.http.get<RiskIssue>(endpoint + '/GetRiskissueDetailsById/' + RiskIssueID);
  }


  DeleteRiskIssueById(RiskIssueID: number): Observable<RiskIssue> {
    return this.http.get<RiskIssue>(endpoint + '/DeleteRiskissueDetails/' + RiskIssueID);
  }





  createWSR(wsr: WSR): Observable<WSR> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<WSR>(endpoint + '/InsertWSRDetails/', wsr, httpOptions);
  }

  updateWSR(wsr: WSR): Observable<WSR> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<WSR>(endpoint + '/UpdateWSRDetails/', wsr, httpOptions);
  }

  getRWSRById(wsrID: number): Observable<WSR> {
    return this.http.get<WSR>(endpoint + '/GetWSRDetailsById/' + wsrID);
  }


  DeleteWSRyId(wsrID: number): Observable<WSR> {
    return this.http.get<WSR>(endpoint + '/DeleteWSRDetails/' + wsrID);
  }


  createUser(users: Users): Observable<Users> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Users>(endpoint + '/InsertUserDetails/', users, httpOptions);
  }

  updateUser(users: Users): Observable<Users> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Users>(endpoint + '/UpdateUserDetails/', users, httpOptions);
  }

  getUserById(UserID: number): Observable<Users> {
    return this.http.get<Users>(endpoint + '/GetUserDetailsById/' + UserID);
  }


  createApplication(application: Application): Observable<Application> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Application>(endpoint + '/InsertApplicationDetails/', application, httpOptions);
  }

  updateApplication(application: Application): Observable<Application> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Application>(endpoint + '/UpdateAppDetails/', application, httpOptions);
  }

  getApplicationById(AppID: number): Observable<Application> {
    return this.http.get<Application>(endpoint + '/GeAppDetailsById/' + AppID);
  }




  Imageupload(frmData: FormData,id: number) {

  this.http.post(endpoint + '/ImageUp/?loginID=' + id, frmData).subscribe(
      data => {

        let sMsg = data as string;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // Show error, if any.
      }
    );
  }


  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }



setSession(key: string, value: any): void {
    // sessionStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));
}
getSession(key: string): any {
    if (typeof window !== 'undefined') {
        // let retrievedObject = sessionStorage.getItem(key) as string;
        let retrievedObject = localStorage.getItem(key) as string;
        return retrievedObject;
    }
}

clearSession(): void {
    localStorage.clear();
}



GetMenuList(): Observable<any> {
  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    return this.http.get(endpoint + '/GetMenus').pipe(
    map(this.extractData));
}

GetUserDetails(seesionValue: number): Observable<any> {
  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    return this.http.get(endpoint + '/GetUserDetails?UID=' + seesionValue).pipe(
    map(this.extractData));
}


Login(userName, password): Observable<any> {

  return this.http.get(endpoint + '/GetVerifyUser?userName=' + userName + '&password=' + password).pipe(map(user => {
    // login successful if there's a jwt token in the response

    if (user !== 0) {

      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }));
}



// login(username: string, password: string) {
//     ;
//   return this.http.post<any>('http://localhost:61994/api/MIS/GetVerifyUser', { username, password })
//     .pipe(map(user => {
//       // login successful if there's a jwt token in the response
//       if (user && user.token) {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('currentUser', JSON.stringify(user));
//       }


//       return user;
//     }));
// }





GetReleaseReport(): Observable<any> {

    return this.http.get(endpoint + '/GetReleaseReport').pipe(
    map(this.extractData));
}

GetRiskIssueReport(): Observable<any> {

  return this.http.get(endpoint + '/GetRiskIssueReport').pipe(
  map(this.extractData));
}

GetWSRReport(): Observable<any> {

  return this.http.get(endpoint + '/GetWSRReport').pipe(
  map(this.extractData));
}



GetWSRReportdt(dt1: string, dt2: string): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(endpoint + '/GetWSRReportCst/' + dt1 + '/' + dt2).pipe(
    map(this.extractData));
  }

GetUserReport(): Observable<any> {

  return this.http.get(endpoint + '/GetUserReport').pipe(
  map(this.extractData));
}


GetApplicationReport(): Observable<any> {

  return this.http.get(endpoint + '/GetApplicationReport').pipe(
  map(this.extractData));
}


GetReleaseChartReport(): Observable<any> {

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.get(endpoint + '/GetReleaseChartReport').pipe(
  map(this.extractData));
}


GetReleaseBarChartReport(StatusID: number): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.get(endpoint + '/GetReleaseBarChartReport/' + StatusID).pipe(
    map(this.extractData));
  }


GetTimeentry(): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(endpoint + '/GetTimeEntry').pipe(
    map(this.extractData));
  }


  GetTimeentry2(GlobalDate: string, GlobalEmpID: string): Observable<any> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(endpoint + '/GetTimeEntry/' + GlobalDate + '/' + GlobalEmpID).pipe(
      map(this.extractData));
    }

GetDDL(ID,DDL): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // getReleaseById(ReleaseID: number): Observable<Release> {
  //   return this.http.get<Release>(endpoint + '/GetReleaseDetailsById/' + ReleaseID);
  // }

    return this.http.get(endpoint + '/GetDDLById/' + DDL).pipe(
    map(this.extractData));
}




GetTaskDDL(ID): Observable<any> {

  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // getReleaseById(ReleaseID: number): Observable<Release> {
  //   return this.http.get<Release>(endpoint + '/GetReleaseDetailsById/' + ReleaseID);
  // }

    return this.http.get(endpoint + '/GetTaskDDLById/' + ID).pipe(
    map(this.extractData));
}


GetChainWideReport(JOBID,REPORTID,SPNAME): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    return this.http.get(endpoint + 'GetChainWideAuditVarianceReport?JOBID=' + JOBID + '&REPORTID=' + REPORTID).pipe(
    map(this.extractData));
}



GetActivityAreaDetails(store,JOBID,REPORTID,section): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    // tslint:disable-next-line:max-line-length
    return this.http.get(endpoint + 'GetInvOverview?store=' + store + '&reportId=' + REPORTID + '&jobNumber=' + JOBID + '&section=' + section).pipe(

    // return this.http.get(endpoint + 'GetStickerSummary?store=164').pipe(
    map(this.extractData));
}

GetInventorystatusDetails(store,JOBID,REPORTID,section): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    // tslint:disable-next-line:max-line-length
    return this.http.get(endpoint + 'GetInvOverview?store=' + store + '&reportId=' + REPORTID + '&jobNumber=' + JOBID + '&section=' + section).pipe(

    // return this.http.get(endpoint + 'GetStickerSummary?store=164').pipe(
    map(this.extractData));
}

GetScanningPoductivityDetails(store,JOBID,REPORTID,section): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    // tslint:disable-next-line:max-line-length
    return this.http.get(endpoint + 'GetInvOverview?store=' + store + '&reportId=' + REPORTID + '&jobNumber=' + JOBID + '&section=' + section).pipe(

    // return this.http.get(endpoint + 'GetStickerSummary?store=164').pipe(
    map(this.extractData));
}

GetActivityPerHourDetails(store,JOBID,REPORTID,section): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    // tslint:disable-next-line:max-line-length
    return this.http.get(endpoint + 'GetInvOverview?store=' + store + '&reportId=' + REPORTID + '&jobNumber=' + JOBID + '&section=' + section).pipe(

    // return this.http.get(endpoint + 'GetStickerSummary?store=164').pipe(
    map(this.extractData));
}

GetDateTimeofDetails(store,JOBID,REPORTID,section): Observable<any> {

  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
    // tslint:disable-next-line:max-line-length
    return this.http.get(endpoint + 'GetInvOverview?store=' + store + '&reportId=' + REPORTID + '&jobNumber=' + JOBID + '&section=' + section).pipe(

    // return this.http.get(endpoint + 'GetStickerSummary?store=164').pipe(
    map(this.extractData));
}

GetInventorycompletionstatusReport(JOBID,QTR): Observable<any> {
    return this.http.get(endpoint + 'GetInventorycompletionstatus').pipe(
    map(this.extractData));
}
GetGetInventoryStatusAnalysisReport(JOBID,QTR): Observable<any> {
  return this.http.get(endpoint + 'GetInventoryStatusAnalysis').pipe(
  map(this.extractData));
}


GetStickerSummaryReport(JOBID,REPORTID,Store): Observable<any> {
  // return this.http.get(endpoint + 'GetCustomerlst').pipe(
      return this.http.get(endpoint + 'GetStickerSummary?JOBID=' + JOBID + '&REPORTID=' + REPORTID + '&store=' + Store).pipe(
    map(this.extractData));
}



GetCovidStateReport(): Observable<any> {

  return this.http.get('https://api.covid19india.org/data.json').pipe(
  map(this.extractData));
}


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
