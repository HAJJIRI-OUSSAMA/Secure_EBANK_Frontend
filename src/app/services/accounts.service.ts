import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AccountDetails } from "../model/account.model";
import { BankAccountDTO } from '../model/bank-account.model'; // Import the correct model

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = { accountId: accountId, amount: amount, description: description }
    return this.http.post(environment.backendHost + "/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = { accountId: accountId, amount: amount, description: description }
    return this.http.post(environment.backendHost + "/accounts/credit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string) {
    let data = { accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost + "/accounts/transfer", data);
  }

  public createCurrentAccount(accountData: any): Observable<any> {
    return this.http.post(environment.backendHost + "/accounts/current", accountData);
  }

  public createSavingAccount(accountData: any): Observable<any> {
    return this.http.post(environment.backendHost + "/accounts/saving", accountData);
  }

  // Add this method to fetch customer accounts
  public getCustomerAccounts(customerId: number): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${environment.backendHost}/customers/${customerId}/accounts`);
  }
}
