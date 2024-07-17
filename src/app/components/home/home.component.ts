import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customers:any = [];
  transactions:any = [];
  filteredCustomers:any = [];
  searchValue:any=''
  searchTerm: string = '';
  searchAmount: string = '';
  spincheak:boolean=false
  constructor(private dataService: DataService , private _FormBuilder:FormBuilder) {}
  // addCustomer:FormGroup=this._FormBuilder.group({
  //   id:[null,[Validators.required]],
  //   name:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
  // })
  // addTrancaction:FormGroup=this._FormBuilder.group({
  //   id:[null,[Validators.required]],
  //   customer_id:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
  //   date:[null,[Validators.required]],
  //   amount:[null,[Validators.required]],
  // })
  ngOnInit(): void {
    this.dataService.getUserData().subscribe(data => {
      this.customers = data.customers;
      this.transactions = data.transactions;
      this.filteredCustomers = this.customers;
    });
  }
 
  
  // searchCustomer(searchTerm: string): void {
  //   this.searchTerm = searchTerm;
  //   this.filterCustomers();
  // }

  searchByAmount(searchAmount: string): void {
    this.searchAmount = searchAmount;
    this.filterCustomers();
  }

  filterCustomers(): void {
    let filteredByName = this.customers;
  
    if (this.searchTerm) {
      filteredByName = filteredByName.filter((customer: { name: string; }) =>
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    if (this.searchAmount) {
      filteredByName = filteredByName.filter((customer: { id: number; }) => {
        const customerTransactions = this.getTransactions(customer.id);
        const foundTransaction = customerTransactions.some((transaction: { amount: { toString: () => string | string[]; }; }) =>
          transaction.amount.toString().includes(this.searchAmount)
        );
        return foundTransaction;
      });
    }
  
    this.filteredCustomers = filteredByName;
  }
  searchCustomer(searchTerm: string): void {
    this.filteredCustomers = this.customers.filter((customer: { name: string; }) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getTransactions(customerId: number) {
    return this.transactions.filter((transaction: { customer_id: number; }) => transaction.customer_id === customerId);
  }

}
