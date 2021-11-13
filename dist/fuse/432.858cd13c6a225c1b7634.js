"use strict";(self.webpackChunk_fuse_starter=self.webpackChunk_fuse_starter||[]).push([[432],{2432:(pt,m,l)=>{l.r(m),l.d(m,{ShippingModule:()=>ot});var h=l(8583),r=l(3679),c=l(1494),g=l(2789),t=l(7716),u=l(1841),x=l(9517),d=l(7001);let C=(()=>{class i{constructor(e){this._http=e,this.api_url="http://localhost:3000/shippings"}getShipping(e){return this._http.get(this.api_url+"?offset="+e.params.offset+"&limit="+e.params.limit+"&previousSize="+e.params.previousSize)}addShipping(e){return this._http.post(this.api_url,e)}updateShipping(e,o){return this._http.put(this.api_url+"/"+e,o)}filterShipping(e){return this._http.get(this.api_url+"?filter="+e)}deleteShipping(e){return this._http.get(this.api_url+"/"+e._id,e)}bulkDelete(e){return this._http.post(this.api_url+"/bulkDelete",e)}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(u.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var _=l(1095),f=l(6627),Z=l(9692),T=l(4885);const v=["content"],A=["Paginator"];function k(i,p){1&i&&(t.TgZ(0,"div",23),t._UZ(1,"mat-spinner",24),t.qZA())}function b(i,p){1&i&&(t.TgZ(0,"div",25),t._uU(1," No Records Found! "),t.qZA())}function y(i,p){if(1&i){const e=t.EpF();t.TgZ(0,"th",40),t.TgZ(1,"div",41),t.TgZ(2,"input",42),t.NdJ("click",function(n){return t.CHM(e),t.oxw(2).checkAllDeleteItems(n)}),t.qZA(),t.qZA(),t.qZA()}}function q(i,p){if(1&i){const e=t.EpF();t.TgZ(0,"td",43),t.TgZ(1,"div",44),t.TgZ(2,"input",45),t.NdJ("click",function(){const n=t.CHM(e),s=n.$implicit,a=n.index;return t.oxw(2).getDeleteItems(s,a)}),t.qZA(),t.qZA(),t.qZA()}if(2&i){const e=p.$implicit;t.xp6(2),t.s9C("id",e._id)}}function N(i,p){1&i&&(t.TgZ(0,"th",40),t._uU(1," Cost"),t.qZA())}function D(i,p){if(1&i&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&i){const e=p.$implicit;t.xp6(1),t.Oqu(e.shippingCost)}}function I(i,p){1&i&&(t.TgZ(0,"th",40),t._uU(1," From"),t.qZA())}function U(i,p){if(1&i&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&i){const e=p.$implicit;t.xp6(1),t.Oqu(e.shippingFrom)}}function F(i,p){1&i&&(t.TgZ(0,"th",40),t._uU(1," To"),t.qZA())}function P(i,p){if(1&i&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&i){const e=p.$implicit;t.xp6(1),t.Oqu(e.shippingTo)}}function B(i,p){1&i&&(t.TgZ(0,"th",40),t._uU(1," Time"),t.qZA())}function Y(i,p){if(1&i&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&i){const e=p.$implicit;t.xp6(1),t.Oqu(e.shippingTime)}}function J(i,p){1&i&&(t.TgZ(0,"th",40),t._uU(1," Minumum Order"),t.qZA())}function M(i,p){if(1&i&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&i){const e=p.$implicit;t.xp6(1),t.Oqu(e.minimumOrder)}}function O(i,p){1&i&&(t.TgZ(0,"th",46),t._uU(1," Action "),t.qZA())}function w(i,p){if(1&i){const e=t.EpF();t.TgZ(0,"td",47),t.TgZ(1,"button",48),t.NdJ("click",function(){const n=t.CHM(e),s=n.$implicit,a=n.index;return t.oxw(2).openUpdateModal(s,a)}),t.TgZ(2,"mat-icon"),t._uU(3,"edit"),t.qZA(),t.qZA(),t.TgZ(4,"button",49),t.NdJ("click",function(){const n=t.CHM(e),s=n.$implicit,a=n.index;return t.oxw(2).deleteCategory(s,a)}),t.TgZ(5,"mat-icon"),t._uU(6,"delete"),t.qZA(),t.qZA(),t.qZA()}}function Q(i,p){1&i&&t._UZ(0,"tr",50)}function H(i,p){1&i&&t._UZ(0,"tr",51)}function z(i,p){if(1&i&&(t.TgZ(0,"table",26),t.ynx(1,27),t.YNc(2,y,3,0,"th",28),t.YNc(3,q,3,1,"td",29),t.BQk(),t.ynx(4,30),t.YNc(5,N,2,0,"th",28),t.YNc(6,D,2,1,"td",29),t.BQk(),t.ynx(7,31),t.YNc(8,I,2,0,"th",28),t.YNc(9,U,2,1,"td",29),t.BQk(),t.ynx(10,32),t.YNc(11,F,2,0,"th",28),t.YNc(12,P,2,1,"td",29),t.BQk(),t.ynx(13,33),t.YNc(14,B,2,0,"th",28),t.YNc(15,Y,2,1,"td",29),t.BQk(),t.ynx(16,34),t.YNc(17,J,2,0,"th",28),t.YNc(18,M,2,1,"td",29),t.BQk(),t.ynx(19,35),t.YNc(20,O,2,0,"th",36),t.YNc(21,w,7,0,"td",37),t.BQk(),t.YNc(22,Q,1,0,"tr",38),t.YNc(23,H,1,0,"tr",39),t.qZA()),2&i){const e=t.oxw();t.Q6J("dataSource",e.dataSource),t.xp6(22),t.Q6J("matHeaderRowDef",e.displayedColumnsOne),t.xp6(1),t.Q6J("matRowDefColumns",e.displayedColumnsOne)}}function $(i,p){1&i&&(t.TgZ(0,"div"),t.TgZ(1,"small",75),t._uU(2," Pincode must be at least 6 characters long."),t.qZA(),t.qZA())}function E(i,p){1&i&&(t.TgZ(0,"div"),t.TgZ(1,"small",75),t._uU(2,"Pincode must be at 6 characters max."),t.qZA(),t.qZA())}function G(i,p){1&i&&(t.TgZ(0,"div"),t.TgZ(1,"small",75),t._uU(2," Pincode must be at least 6 characters long."),t.qZA(),t.qZA())}function L(i,p){1&i&&(t.TgZ(0,"div"),t.TgZ(1,"small",75),t._uU(2,"Pincode must be at 6 characters max."),t.qZA(),t.qZA())}function j(i,p){if(1&i){const e=t.EpF();t.TgZ(0,"div",52),t.TgZ(1,"h4",53),t._uU(2),t.qZA(),t.TgZ(3,"button",54),t.NdJ("click",function(){return t.CHM(e).$implicit.dismiss("Cross click")}),t.TgZ(4,"span",55),t._uU(5,"\xd7"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(6,"div",56),t.TgZ(7,"form",57),t.NdJ("ngSubmit",function(){return t.CHM(e),t.oxw().postData()}),t.TgZ(8,"div",7),t.TgZ(9,"div",58),t.TgZ(10,"label",59),t._uU(11," Cost"),t.qZA(),t.TgZ(12,"input",60),t.NdJ("keypress",function(n){return t.CHM(e),t.oxw().numberOnly(n)}),t.qZA(),t.qZA(),t.TgZ(13,"div",58),t.TgZ(14,"label",59),t._uU(15," From"),t.qZA(),t.TgZ(16,"input",61,62),t.NdJ("keypress",function(n){return t.CHM(e),t.oxw().numberOnly(n)}),t.qZA(),t.YNc(18,$,3,0,"div",63),t.YNc(19,E,3,0,"div",63),t.qZA(),t.TgZ(20,"div",58),t.TgZ(21,"label",59),t._uU(22," To"),t.qZA(),t.TgZ(23,"input",64),t.NdJ("keypress",function(n){return t.CHM(e),t.oxw().numberOnly(n)}),t.qZA(),t.YNc(24,G,3,0,"div",63),t.YNc(25,L,3,0,"div",63),t.qZA(),t.TgZ(26,"div",58),t.TgZ(27,"label",59),t._uU(28," Time"),t.qZA(),t._UZ(29,"input",65),t.qZA(),t.TgZ(30,"div",58),t.TgZ(31,"label",59),t._uU(32," Minimum Order"),t.qZA(),t.TgZ(33,"input",66),t.NdJ("keypress",function(n){return t.CHM(e),t.oxw().numberOnly(n)}),t.qZA(),t.qZA(),t.TgZ(34,"div",58),t.TgZ(35,"div",44),t._UZ(36,"input",67),t.TgZ(37,"label",68),t._uU(38," Prepaid "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(39,"div",58),t.TgZ(40,"div",44),t._UZ(41,"input",69),t.TgZ(42,"label",70),t._uU(43," Postpaid "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(44,"div",71),t.TgZ(45,"button",72),t._uU(46),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(47,"div",73),t.TgZ(48,"button",74),t.NdJ("click",function(){return t.CHM(e).$implicit.close("Save click")}),t._uU(49,"Close"),t.qZA(),t.qZA()}if(2&i){const e=t.oxw();t.xp6(2),t.hij("",e.selectedShipping?"Update":"Add"," Shipping"),t.xp6(5),t.Q6J("formGroup",e.shippingForm),t.xp6(11),t.Q6J("ngIf",null==e.shippingFrom.errors?null:e.shippingFrom.errors.minlength),t.xp6(1),t.Q6J("ngIf",null==e.shippingFrom.errors?null:e.shippingFrom.errors.maxlength),t.xp6(5),t.Q6J("ngIf",null==e.shippingTo.errors?null:e.shippingTo.errors.minlength),t.xp6(1),t.Q6J("ngIf",null==e.shippingTo.errors?null:e.shippingTo.errors.maxlength),t.xp6(21),t.hij("",e.selectedShipping?"Update":"Add"," Shipping")}}const R=function(){return[5,10,20,30,50,100]};let W=(()=>{class i{constructor(e,o,n,s,a){this.http=e,this.modalService=o,this._formBuilder=n,this._snackBar=s,this.shippingservice=a,this.dataSource=new g.by,this.loading=!1,this.setBulkDeleteItems=[],this.tablePaging={offset:0,limit:20,previousSize:0},this.displayedColumnsOne=["check","shippingCost","shippingFrom","shippingTo","shippingTime","minimumOrder","action"]}ngOnInit(){this.getData()}ngAfterViewInit(){this.getData(),this.shippingForm=this._formBuilder.group({shippingCost:["",[r.kI.required]],shippingFrom:["",[r.kI.required,r.kI.minLength(6),r.kI.maxLength(6)]],shippingTo:["",[r.kI.required,r.kI.minLength(6),r.kI.maxLength(6)]],shippingTime:["",[r.kI.required]],minimumOrder:["",[r.kI.required]],prePaid:[!1],postPaid:[!1]})}get shippingFrom(){return this.shippingForm.get("shippingFrom")}get shippingTo(){return this.shippingForm.get("shippingTo")}getData(){this.shippingservice.getShipping({params:this.tablePaging}).subscribe(e=>{console.log("getdata",e),this.loading=!1,this.Shippings=e.Shippings,console.log("this.Shippings",this.Shippings),this.Shippings.length=e.total,this.dataSource=new g.by(this.Shippings),this.dataSource.paginator=this.Paginator})}getNextData(){this.loading=!0,this.userDataPromise&&this.userDataPromise.unsubscribe(),this.userDataPromise=this.shippingservice.getShipping({params:this.tablePaging}).subscribe(e=>{this.loading=!1,console.log(e.Shippings),this.Shippings.length=this.tablePaging.previousSize,this.Shippings.push(...e.Shippings),this.Shippings.length=e.total,this.dataSource=new g.by(this.Shippings),this.dataSource._updateChangeSubscription(),this.dataSource.paginator=this.Paginator})}pageChanged(e){this.tablePaging.limit=e.pageSize,this.tablePaging.offset=e.pageIndex.toString(),this.tablePaging.previousSize=e.pageSize*e.pageIndex,this.getNextData()}applyFilter(e){console.log("this.tablePaging",this.tablePaging);var o=e.trim().toLowerCase();this.userDataPromise=this.shippingservice.filterShipping(o).subscribe(n=>{this.loading=!1,this.Shippings=n.Shippings,console.log("this.StockLogs",this.Shippings),this.Shippings.length=n.total,this.dataSource=new g.by(this.Shippings),this.dataSource.paginator=this.Paginator})}openModal(e=null){this.selectedShipping=e,this.modalService.open(this.content,{ariaLabelledBy:"modal-basic-title"}).result.then(o=>{},o=>{this.shippingForm.reset()})}openUpdateModal(e){console.log(e),this.openModal(e._id),this.shippingForm.patchValue(e)}postData(){if(console.log("this.vendors",this.shippingForm.value),this.shippingForm.markAllAsTouched(),this.shippingForm.invalid)return console.log("this.shippings",this.shippingForm.value),!1;this.selectedShipping?this.shippingservice.updateShipping(this.selectedShipping,this.shippingForm.value).subscribe(e=>{this.modalService.dismissAll(),this.shippingForm.reset(),console.log(this.Shippings.length),this.getNextData()},e=>{console.log(e)}):this.shippingservice.addShipping(this.shippingForm.value).subscribe(e=>{console.log(e),this.modalService.dismissAll(),this.shippingForm.reset(),console.log(this.Shippings.length),this.getNextData()},e=>{console.log(e)})}deleteStockLog(e){confirm("Are you sure to delete ?")&&this.shippingservice.deleteShipping(e).subscribe(o=>{this.getNextData()})}checkAllDeleteItems(e){var o=document.getElementsByClassName("deleteChecks");if(e.target.checked)for(let n=0;n<o.length;n++){let s=o[n];s.checked=!0;let a=s.getAttribute("id");console.log(s),this.setBulkDeleteItems.push(a)}else for(let n=0;n<o.length;n++){let s=o[n];s.checked=!1,console.log(s),this.setBulkDeleteItems=[]}}getDeleteItems(e,o){document.getElementById("deleteAll").checked=!1;var a=document.getElementById(e._id).checked;console.log("index",this.setBulkDeleteItems),a?this.setBulkDeleteItems.push(e._id):this.setBulkDeleteItems.splice(o,1),console.log(this.setBulkDeleteItems)}BulkDelete(){void 0!==typeof this.setBulkDeleteItems&&this.setBulkDeleteItems.length>0?confirm("Are you sure to delete ?")&&this.shippingservice.bulkDelete(this.setBulkDeleteItems).subscribe(e=>{console.log("response",e),document.getElementById("deleteAll").checked=!1,this._snackBar.open(e.message,"",{duration:2e3,verticalPosition:"top"}),this.getNextData()},e=>{console.log(e)}):this._snackBar.open("No product selected","",{duration:2e3,verticalPosition:"top"})}numberOnly(e){const o=e.which?e.which:e.keyCode;return!(o>31&&(o<48||o>57))}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(u.eN),t.Y36(x.FF),t.Y36(r.qu),t.Y36(d.ux),t.Y36(C))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-shipping"]],viewQuery:function(e,o){if(1&e&&(t.Gf(v,5),t.Gf(c.YE,5),t.Gf(A,5)),2&e){let n;t.iGM(n=t.CRH())&&(o.content=n.first),t.iGM(n=t.CRH())&&(o.sort=n.first),t.iGM(n=t.CRH())&&(o.Paginator=n.first)}},decls:29,vars:7,consts:[[1,"flex","flex-col","flex-auto","min-w-0",2,"max-height","90vh","overflow-y","scroll"],[1,"flex-auto","p-6","sm:p-10"],[1,"row","mb-3"],[1,"col-md-6"],[1,"col-md-6","text-end"],["mat-raised-button","","color","primary",3,"click"],[1,"me-2"],[1,"row"],[1,"mat-elevation-z8","shadow-sm","p-3","w-100","bg-white"],[1,"d-flex","px-3","py-4"],[1,"col-6"],[2,"cursor","pointer",3,"click"],[1,"form-group","d-flex"],["mat-raised-button","","color","warn",1,"ms-auto","me-2",3,"click"],["type","text","placeholder","Search",1,"form-control","bg-light","sortInput","rounded-pill",2,"max-width","268px",3,"keyup"],["filterInput",""],["class","d-flex justify-content-center",4,"ngIf","ngIfElse"],["class","text-center",4,"ngIf"],["table",""],["aria-label","Select page",3,"pageIndex","pageSize","pageSizeOptions","page"],["Paginator",""],["class","bd-example-modal-lg"],["content",""],[1,"d-flex","justify-content-center"],[1,"progress-spinner"],[1,"text-center"],["mat-table","","matSort","",1,"",2,"width","100%",3,"dataSource"],["matColumnDef","check"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","shippingCost"],["matColumnDef","shippingFrom"],["matColumnDef","shippingTo"],["matColumnDef","shippingTime"],["matColumnDef","minimumOrder"],["matColumnDef","action"],["mat-header-cell","","class","text-right",4,"matHeaderCellDef"],["mat-cell","","class","text-right",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],[1,"form-group"],["type","checkbox","id","deleteAll","value","",1,"form-check-input",3,"click"],["mat-cell",""],[1,"form-check"],["type","checkbox","value","",1,"form-check-input","deleteChecks",3,"id","click"],["mat-header-cell","",1,"text-right"],["mat-cell","",1,"text-right"],["mat-icon-button","",3,"click"],["mat-icon-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row",""],[1,"modal-header"],["id","modal-basic-title",1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"px-4",3,"formGroup","ngSubmit"],[1,"form-group","mb-3","col-12"],["for","",1,"mb-1"],["type","text","id","shippingCost","name","shippingCost","formControlName","shippingCost","placeholder","$50",1,"form-control",3,"keypress"],["type","text","id","shippingFrom","name","shippingFrom","formControlName","shippingFrom","placeholder","$50",1,"form-control",3,"keypress"],["pincodeInput",""],[4,"ngIf"],["type","text","id","shippingTo","name","shippingTo","formControlName","shippingTo","placeholder","$50",1,"form-control",3,"keypress"],["type","text","id","shippingTime","name","shippingTime","formControlName","shippingTime","placeholder","$50",1,"form-control"],["type","text","id","minimumOrder","name","minimumOrder","formControlName","minimumOrder","placeholder","$50",1,"form-control",3,"keypress"],["type","checkbox","value","","id","prePaid","formControlName","prePaid",1,"form-check-input"],["for","prePaid",1,"form-check-label"],["type","checkbox","value","","id","postPaid","formControlName","postPaid",1,"form-check-input"],["for","postPaid",1,"form-check-label"],[1,"form-group","mb-3"],["type","submit",1,"btn","btn-primary"],[1,"modal-footer"],["type","button",1,"btn","btn-outline-dark",3,"click"],[1,"text-danger"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"button",5),t.NdJ("click",function(){return o.openModal()}),t.TgZ(6,"mat-icon",6),t._uU(7,"add"),t.qZA(),t._uU(8," Add Shipping"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(9,"div",7),t.TgZ(10,"div",8),t.TgZ(11,"div",9),t.TgZ(12,"div",10),t.TgZ(13,"mat-icon",11),t.NdJ("click",function(){return o.getNextData()}),t._uU(14,"autorenew"),t.qZA(),t.qZA(),t.TgZ(15,"div",10),t.TgZ(16,"div",12),t.TgZ(17,"button",13),t.NdJ("click",function(){return o.BulkDelete()}),t._uU(18,"Bulk Delete"),t.qZA(),t.TgZ(19,"input",14,15),t.NdJ("keyup",function(){t.CHM(n);const a=t.MAs(20);return o.applyFilter(a.value)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(21,k,2,0,"div",16),t.YNc(22,b,2,0,"div",17),t.YNc(23,z,24,3,"ng-template",null,18,t.W1O),t.TgZ(25,"mat-paginator",19,20),t.NdJ("page",function(a){return o.pageChanged(a)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(27,j,50,7,"ng-template",21,22,t.W1O),t.qZA()}if(2&e){const n=t.MAs(24);t.xp6(21),t.Q6J("ngIf",o.loading)("ngIfElse",n),t.xp6(1),t.Q6J("ngIf",0===o.dataSource.data.length),t.xp6(3),t.Q6J("pageIndex",0)("pageSize",o.tablePaging.limit)("pageSizeOptions",t.DdM(6,R))}},directives:[_.lW,f.Hw,h.O5,Z.NW,T.$g,g.BZ,c.YE,g.w1,g.fO,g.Dz,g.as,g.nj,g.ge,g.ev,g.XQ,g.Gk,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,r.Wl],styles:[".ng-invalid.ng-touched[_ngcontent-%COMP%]{border-color:#dc3545!important}  .mat-simple-snackbar{justify-content:center!important}"]}),i})();var X=l(171),V=l(8295),K=l(9983),tt=l(3423),et=l(8550),it=l(3771),nt=l(4466);let ot=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[h.ez,tt.Bz.forChild([{path:"",component:W}]),nt.m,g.p0,_.ot,f.Ps,Z.TU,c.JX,r.u5,r.UX,X.To,V.lN,K.c,it.T,et.xD,T.Cq,d.ZX]]}),i})()}}]);