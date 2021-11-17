import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from '../../services//user.service';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('content') content: any;
  @ViewChild('rolesModal') rolesModal: any;
  @ViewChild('UserTablePaginator') UserTablePaginator!: MatPaginator;
  @ViewChild('RoleTablePaginator') RoleTablePaginator!: MatPaginator;
  users: any[];
  roles: any[]
  loading: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  userDataSource = new MatTableDataSource<any>();
  roleDataSource = new MatTableDataSource<any>();
  userForm: FormGroup;
  userRoles: any;
  getRoleName: any;
  selectedUser: any;
  setRoles: any;
  roleNames: {};
  selectedRole: any;
  roleForm: FormGroup;
  roleName: any;
  permissions = {
    dashboard: {
      canSeeDefaultDashboard: false,
      canSeeAcademyDashboard: false,
      canSeeEcommerceDashboard: false,
      canSeeHospitalDashboard: false,
      canSeeHrmDashboard: false,
    },
    authentication: {
      canSeeRegistration: false,
      canSeeForgetPassword: false,
      canseeResetPassword: false
    },
    database: {
      canSeeBasicDatabase: false,
      canManageFunctionalDatabase: false,
      canSeeAdvanceDatabase: false,
      canSeeResponsiveDatabase: false,
      canSeeFilterTypeDatabase: false,
      canSeePaginationTypeDatabase: false,
      canViewGridViewDatabase: false
    },
    form: {
      canSeeFormLayouts: false,
      canseeFormElements: false,
      canSeeFormValidation: false,
      canSeeTextEditor: false,
    },
    uiElements: {
      canSeeAvatar: false,
      canSeebagdesPills: false,
      canSeebuttons: false,
      canSeeCards: false,
      canSeeCheckboxesRadios: false,
      canSeeErrorNotes: false,
      canSeeIcons: false,
      canSeeModals: false,
      canSeeNothingToShow: false,
      canSeeTabs: false,
    },
    SamplePages: {
      defaultViewChat: false,
      canSeeUserProfile: false,
      canManageCalendarView: false,
      canManageKanbanView: false,
      canManageReport: false,
      canSeeBlankPage: false
    },
    errorPages: {
      canSeeError400: false,
      canSeeError401: false,
      canSeeError403: false,
      canSeeError404: false,
      defaultViewError405: false,
      canSeeError503: false,
    },
    userAndRoles: {
      canViewUserList: false,
      canInviteUser: false,
      canUpdateUser: false,
      canDeleteUser: false,
      canAttachRolesToUsers: false,
      canDeAttachRolesToUsers: false,
      canViewroleList: false,
      canCreateRole: false,
      canUpdateRole: false,
      canDeleteRole: false,
      canAttachUserToRole: false,
    },
    settings: {
      ViewSettingList: false,
      updateSetting: false,
      viewEmailSettings: false,
      updateEmailSettings: false,
      viewSmsSettings: false,
      updateSmsSettings: false,
      viewGoogleRecaptchaSettings: false,
      defaultViewPaymentMethodSettings: false,
      defaultUpdatePaymentMethodSettings: false,
      updateGoogleRecaptchaSettings: false,
      viewNotificationSettings: false,
      updateNotificationSettings: false,
      viewNotificationTemplates: false,
      updateNotificationTemplates: false,
      viewPaymentMethod: false,
      updatePaymentMethod: false,
      deletePaymentMethod: false
    }
  }
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
 
  
  userDataPromise: any;
  roleDataPromise: any;

  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder,
    private _authService: AuthService, private _userService: UserService, private _roleService: RolesService) { }

  displayedUserColumns: string[] = ['allUsers', 'name', 'action'];
  displayedRoleColumns: string[] = ['roleName', 'action'];
 


  ngOnInit(): void {
    this.getData();
    this.getRoles();
    this.getRoleData();

    this.userForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      roleType: ['', [Validators.required]]
    })
  }

  ngAfterViewInit() {
    
    //this.compileTable();

  }

  getRoles() {
    this._roleService.listRoles().subscribe((res: any) => {
      this.userRoles = res.Roles;
    })
  }

  getData() {
    this._userService.getUser({params: this.tablePaging}).subscribe((res: any) => {
      //console.log('getdata', res);
      this.loading = false;
      this.users = res.Users;
      console.log('this.users', this.users)
      this.users.length = res.total;
      this.userDataSource = new MatTableDataSource<any>(this.users);
      this.userDataSource.paginator = this.UserTablePaginator;
      //this.compileTable(res);
      //console.log(res);
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this._userService.getUser({ params: this.tablePaging })
      .subscribe((response: any) => {
        this.loading = false;
        console.log('this.users',response.Users)
        this.users.length = this.tablePaging['previousSize'];
        this.users.push(...response.Users);
        this.users.length = response.total;
        this.userDataSource = new MatTableDataSource<any>(this.users);
        this.userDataSource._updateChangeSubscription();
        this.userDataSource.paginator = this.UserTablePaginator;
      })
  }


  userPageChanged(event: any) {
    this.tablePaging['limit'] = event.pageSize;
    this.tablePaging['offset'] = event.pageIndex.toString();
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.tablePaging['previousSize'] = previousSize;
    this.getNextData();
    // this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

  applyUserFilter(filterValue: string) {
    console.log('this.tablePaging', this.tablePaging);
    var filterData = filterValue.trim().toLowerCase();
    this.userDataPromise = this._userService.filterUser(filterData).subscribe((res: any) => {
      this.loading = false;
      this.users = res.Users;
      console.log('this.users', this.users)
      this.users.length = res.total;
      this.userDataSource = new MatTableDataSource<any>(this.users);
      this.userDataSource.paginator = this.UserTablePaginator;
    })

  }

  openModal(id = null) {
    this.selectedUser = id;
    //console.log(data);
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.userForm.reset();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateModal(data: any) {
    console.log(data);
    this.openModal(data._id);
    this.userForm.patchValue(data);
  }

  postData() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      console.log('this.userForm', this.userForm.value)
      return false;
    }
    if (this.selectedUser) {
      this._userService.updateUser(this.selectedUser, this.userForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.userForm.reset();
          this.getNextData();
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      this._userService.addUser(this.userForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.modalService.dismissAll();
          this.userForm.reset();
          this.getNextData();
        },
        errors => {
          console.log(errors);
        }
      )
    }
  }

  deleteUser(deleteUser: any) {
    //console.log(delSubCategory);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this._userService.deleteUser(deleteUser).subscribe(
        (res: any) => {
          this.getNextData();
        }
      )
    }
  }


  //rolequeries
  getRoleData(): void {
    this._roleService.getRoles({params: this.  tablePaging }).subscribe((res: any) => {
      //console.log('getdata', res);
      //this.loading = false;
      this.roles = res.Roles;
      console.log('this.roles', this.roles)
      this.roles.length = res.total;
      console.log(res.total)
      this.roleDataSource = new MatTableDataSource<any>(this.roles);
      this.roleDataSource.paginator = this.RoleTablePaginator;
      //this.compileTable(res);
      //console.log(res);
    })
  }

  getNextRoleData() {
    //this.loading = true
    if(this.roleDataPromise){
      this.roleDataPromise.unsubscribe();
    }
    this.roleDataPromise = this._roleService.getRoles({ params: this.  tablePaging  }).subscribe((response: any) => {
        //this.loading = false;
        //console.log('Roles',response.Roles)
        this.roles.length = this.  tablePaging ['previousSize'];
        this.roles.push(...response.Roles);
        this.roles.length = response.total;
        console.log(this.roles)
        this.roleDataSource = new MatTableDataSource<any>(this.roles);
        this.roleDataSource._updateChangeSubscription();
        this.roleDataSource.paginator = this.RoleTablePaginator;
      })
  }


  rolePageChanged(e: any) {
    this.  tablePaging ['limit'] = e.pageSize;
    this.  tablePaging ['offset'] = e.pageIndex.toString();
    let pageIndex = e.pageIndex;
    let pageSize = e.pageSize;
    let previousIndex = e.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.  tablePaging ['previousSize'] = previousSize;
    this.getNextRoleData();
    // this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

  applyRoleFilter(filterValue: string) {
    //console.log('this.tablePaging', this.tablePaging);
    var filterRoleData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.roleDataPromise = this._roleService.filterRoles(filterRoleData).subscribe((res: any) => {
      //this.loading = false;
      this.roles = res.Roles;
      //console.log('this.roles', this.roles)
      this.roles.length = res.total;
      this.roleDataSource = new MatTableDataSource<any>(this.roles);
      this.roleDataSource.paginator = this.RoleTablePaginator;
    })

  }

  postRoleData() {
    const data = {
      roleName: this.roleName,
      permissions: this.permissions
    }
    if (this.selectedRole) {
      this._roleService.updateRoles(this.selectedRole, data).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.roleName = '';
          this.resetPermissions();
          this.getNextRoleData();
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      this._roleService.addRoles(data).subscribe(
        (res: any) => {
          console.log(res);
          this.modalService.dismissAll();
          this.roleName = '';
          this.resetPermissions();
          this.getNextRoleData();
        },
        errors => {
          console.log(errors);
        }
      )
    }
  }

  deleteRole(deleteRole: any) {
    //console.log(delSubCategory);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this._roleService.deleteRoles(deleteRole).subscribe(
        (res: any) => {
          //console.log(res);
          this.getNextRoleData();
        }
      )
    }
  }

  openRoleModal(id = null) {
    this.selectedRole = id;
    //console.log(data);
    this.modalService.open(this.rolesModal, { ariaLabelledBy: 'role-modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.roleName = '';
      this.resetPermissions();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  openRoleUpdateModal(data: any) {
    console.log(data);
    this.openModal(data._id);
    this.roleName = data.roleName;
    delete data.permissions._id;
    for (let key1 in data.permissions) {
      //console.log(data.permissions[key1])
      // data.permissions[key1] = true;
      delete data.permissions[key1]._id;

      for (let key2 in data.permissions[key1]) {
        console.log(data.permissions[key1][key2])
        if (data.permissions[key1][key2] == true) {
          console.log('check true')
        } else {
          console.log('check false')
        }
      }
    }

    this.permissions = data.permissions;
    //console.log(data.permissions)

  }

  changeAll(e: any, permission) {
    //console.log('chane all')
    //console.log(permission)
    for (let key in permission) {
      permission[key] = e.target.checked ? true : false;

    }
  }

  resetPermissions() {
    for (let key1 in this.permissions) {
      for (let key2 in this.permissions[key1]) {
        this.permissions[key1][key2] = false;
      }
    }
  }

  isParentChecked(permission): boolean {
    for (let key in permission) {
      if (!permission[key]) {
        return false;
      }
    }
    return true;
  }
  //originalOrder = () => 0

}

