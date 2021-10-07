import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { AuthService } from 'app/core/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content: any;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource;
  constructor(private _authService: AuthService, private http: HttpClient, 
    private modalService: NgbModal, private formBulider: FormBuilder) { }

  displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'registerWith', 'action'];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.compileTable();
    this.getData();
  }

  getData() {
    this._authService.getAdminUsers().subscribe((res: any) => {
      this.compileTable(res);
      console.log(res);
    })
  }

  compileTable(data = []) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    //console.log(data);
     
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
