import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsService } from '../questions.service';
import { StockLogsService } from '../stock-logs.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  questionForm:FormGroup;
  selectedQuestion: boolean;
  selectedQuestionId: any;
  loading: boolean = false;
  Questions: any[];
  getCategoriesList :any[];
  setBulkDeleteItems = [];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private stockService: StockService, private questionsService: QuestionsService, private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check', 'question', 'products', 'brand', 'action'];
  ngOnInit(): void {
    this.getData();
    this.questionForm = this._formBuilder.group({
      answer: ['', [Validators.required]]
    })
  }

  ngAfterViewInit() {
    this.getData()
  }

  

  getData() {
    this.questionsService.getQuestions({ params: this.tablePaging }).subscribe((res: any) => {
      console.log('getdata', res);
      this.loading = false;
      this.Questions = res.Questions;
      console.log('Questions', this.Questions)
      this.Questions.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Questions);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.questionsService.getQuestions({ params: this.tablePaging }).subscribe((response: any) => {
        this.loading = false;
        console.log(response.Questions)
        this.Questions.length = this.tablePaging['previousSize'];
        this.Questions.push(...response.Questions);

        this.Questions.length = response.total;
        this.dataSource = new MatTableDataSource<any>(this.Questions);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.Paginator;
      })
  }


  pageChanged(event: any) {
    this.tablePaging['limit'] = event.pageSize;
    this.tablePaging['offset'] = event.pageIndex.toString();
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.tablePaging['previousSize'] = previousSize;
    this.getNextData();
    //this.dataTableSize = event.pageSize
  }

  applyFilter(filterValue: string) {
    //console.log('this.tablePaging', this.tablePaging);
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.questionsService.filterQuestions(filterData).subscribe((res: any) => {
      this.loading = false;
      this.Questions = res.Questions;
      //console.log('this.StockLogs', this.Questions)
      this.Questions.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Questions);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openUpdateModal(data: any) {
    this.selectedQuestionId = data._id;
    console.log(this.selectedQuestionId)
    this.questionForm.patchValue(data);
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.questionForm.reset();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  

  postData() {
    console.log('postData',this.questionForm.value)
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      console.log('this.questionForm', this.questionForm.value)
      return false;
    }
      this.questionsService.updateAnswers(this.selectedQuestionId, this.questionForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.questionForm.reset();
          console.log(this.Questions.length)
          this.getNextData()       
        },
        errors => {
          console.log(errors);
        }
      )
  }

  deleteQuestions(deleteStockLog: any) {
    //console.log(delsubsubCategories);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this.questionsService.deleteQuestions(deleteStockLog).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }

  checkAllDeleteItems(e:any) {
    //console.log(e)
    var items:any =  document.getElementsByClassName("deleteChecks");
    if(e.target.checked) {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = true
        let getId = element.getAttribute('id')
        console.log(element);
        this.setBulkDeleteItems.push(getId)
      
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = false
        console.log(element);
        this.setBulkDeleteItems = []
      }
   }  
  }

  getDeleteItems(event: any, index:any) {
    let checkElement = <HTMLInputElement> document.getElementById('deleteAll');
    checkElement.checked = false
    var element = <HTMLInputElement> document.getElementById(event._id);
    var isChecked = element.checked;  
    console.log('index', this.setBulkDeleteItems)
    //console.log('element', event)
    if(isChecked) {
      this.setBulkDeleteItems.push(event._id);
    } else {

      this.setBulkDeleteItems.splice(index, 1)
    }
      console.log(this.setBulkDeleteItems) 
  }


  BulkDelete() {
    //console.log('bulkDelete')
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.questionsService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
          console.log('response', res)
          let element = <HTMLInputElement> document.getElementById('deleteAll');
          element.checked = false
          this._snackBar.open(res.message, '', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.getNextData();
        }, (errors:any) => {
          console.log(errors)
        })
      }
    }
    else {
      this._snackBar.open('No product selected', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }

}