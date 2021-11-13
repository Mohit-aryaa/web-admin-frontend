"use strict";(self.webpackChunk_fuse_starter=self.webpackChunk_fuse_starter||[]).push([[856],{4856:(z,p,n)=>{n.r(p),n.d(p,{EditBundleProductModule:()=>j});var c=n(8583),g=n(6461),s=n(3679),t=n(7716),T=n(4980),b=n(2082),A=n(6618),h=n(7001),m=n(3423),P=n(2490),q=n(5494),y=n(1466),f=n(8295),Z=n(7441),u=n(611),x=n(2458),v=n(1095),C=n(6627);function B(r,l){if(1&r&&(t.TgZ(0,"mat-option",51),t._uU(1),t.qZA()),2&r){const e=l.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.productName)}}function I(r,l){if(1&r&&(t.TgZ(0,"div",52),t.TgZ(1,"div",53),t._UZ(2,"img",54),t.qZA(),t.qZA()),2&r){const e=l.$implicit;t.xp6(2),t.Q6J("src",e,t.LSH)}}function N(r,l){if(1&r){const e=t.EpF();t.TgZ(0,"div",55),t.TgZ(1,"button",56),t.NdJ("click",function(){const i=t.CHM(e).index,a=t.oxw();return a.removeImage(a.getProductImages[i])}),t.TgZ(2,"mat-icon"),t._uU(3,"remove_circle_outline"),t.qZA(),t.qZA(),t.TgZ(4,"div",53),t._UZ(5,"img",54),t.qZA(),t.qZA()}if(2&r){const e=l.$implicit;t.xp6(5),t.MGl("src","http://localhost:3000/",e,"",t.LSH)}}function _(r,l){if(1&r&&(t.TgZ(0,"option",51),t._uU(1),t.qZA()),2&r){const e=l.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.categoryName)}}function F(r,l){if(1&r&&(t.TgZ(0,"option",51),t._uU(1),t.qZA()),2&r){const e=l.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.subCategoryName)}}function U(r,l){if(1&r&&(t.TgZ(0,"option",51),t._uU(1),t.qZA()),2&r){const e=l.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.brandName)}}function J(r,l){if(1&r&&(t.TgZ(0,"option",51),t._uU(1),t.qZA()),2&r){const e=l.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.name)}}function S(r,l){1&r&&(t.TgZ(0,"button",59),t.TgZ(1,"mat-icon"),t._uU(2,"cancel"),t.qZA(),t.qZA())}function E(r,l){if(1&r){const e=t.EpF();t.TgZ(0,"mat-chip",57),t.NdJ("removed",function(){const i=t.CHM(e).$implicit;return t.oxw().remove(i)}),t._uU(1),t.YNc(2,S,3,0,"button",58),t.qZA()}if(2&r){const e=l.$implicit,o=t.oxw();t.Q6J("selectable",o.selectable)("removable",o.removable),t.xp6(1),t.hij(" ",e.name," "),t.xp6(1),t.Q6J("ngIf",o.removable)}}let O=(()=>{class r{constructor(e,o,d,i,a,H,K,R,G,X){this.productsService=e,this.categoriesService=o,this.subCategoriesService=d,this._formBuilder=i,this._snackBar=a,this.router=H,this.brandsService=K,this.vendorsService=R,this.bundleproductsService=G,this.route=X,this.storeImg=FileList,this.imgUploading=!1,this.getProductImages=[],this.showPreview=!1,this.urls=[],this.selectable=!0,this.removable=!0,this.addOnBlur=!0,this.separatorKeysCodes=[g.K5,g.OC],this.tags=[]}ngOnInit(){this.getCategories(),this.getVendors(),this.getBrands(),this.getProducts(),this.editBundleProductsForm=this._formBuilder.group({productName:["",[s.kI.required]],products:["",[s.kI.required]],productDescription:[""],productImagepicture:[""],productImages:[""],productCode:["",[s.kI.required]],productModel:["",[s.kI.required]],productCategory:["",[s.kI.required]],productSubCategory:["",[s.kI.required]],productBrand:["",[s.kI.required]],vendor:["",[s.kI.required]],tags:["",[s.kI.required]],stock:["",[s.kI.required]],todaysDeal:[!1],publish:[!1],featured:[!1],price:["",[s.kI.required]]}),this.getId=this.route.snapshot.paramMap.get("id"),this.getData(this.getId)}getBrands(){this.brandsService.listBrands().subscribe(e=>{this.getBrandsList=e.Brands},e=>{console.log(e)})}getCategories(){this.categoriesService.listCategories().subscribe(e=>{this.getCategoriesList=e.Categories,console.log("subcat",this.getCategoriesList)},e=>{console.log(e)})}getCategoryValue(e){console.log(e.target.value),this.getSubCategories(e.target.value),this.editBundleProductsForm.patchValue({productSubCategory:""})}getSubCategories(e){this.subCategoriesService.getDataByCategoryId(e).subscribe(o=>{this.getSubCategoriesList=o.SubCategory,console.log("getSubCategoriesList",this.getSubCategoriesList)},o=>{console.log(o)})}getVendors(){this.vendorsService.listVendors().subscribe(e=>{this.getVendorsList=e.Vendors},e=>{console.log(e)})}getProducts(){this.productsService.listProduct().subscribe(e=>{console.log(e),this.getProductList=e.Products},e=>{console.log(e)})}getData(e){this.bundleproductsService.showProduct(e).subscribe(o=>{console.log(o),this.getRes=o,console.log("getdata",this.getRes.tags),this.tags=o.tags,this.getProductImages=o.productImages,this.editBundleProductsForm.patchValue({products:o.products}),this.getSubCategories(o.productCategory),delete o.productImages,this.editBundleProductsForm.patchValue(o)})}add(e){const o=(e.value||"").trim();o&&(this.tags.push({name:o}),this.editBundleProductsForm.patchValue({tags:this.tags})),e.chipInput.clear()}remove(e){const o=this.tags.indexOf(e);o>=0&&(this.tags.splice(o,1),this.editBundleProductsForm.patchValue({tags:this.tags}))}uploadProductImage(e){this.showPreview=!0;let o=e.target.files;if(o)for(let d of o){let i=new FileReader;i.onload=a=>{this.urls.push(a.target.result)},i.readAsDataURL(d)}this.storeImg=e.target.files}postFormInput(){if(this.editBundleProductsForm.invalid||this.imgUploading)return console.log(this.editBundleProductsForm.value),!1;this.bundleproductsService.updateBundleProducts(this.getId,this.editBundleProductsForm.value).subscribe(e=>{console.log(e),this.tags=void 0,this.editBundleProductsForm.reset(),this.previewImg=void 0,this._snackBar.open(e.message,"",{duration:2e3,verticalPosition:"top"}),setTimeout(()=>{},2e3)},e=>{console.log(e),this._snackBar.open(e.message,"",{duration:2e3,verticalPosition:"top"})})}postData(){this.editBundleProductsForm.markAllAsTouched(),console.log(this.editBundleProductsForm.value);const e=new FormData;var o=[];if(console.log(this.getProductImages.length),0==this.showPreview&&0==this.getProductImages.length)return this._snackBar.open("At least one image is required","",{duration:2e3,verticalPosition:"top"}),!1;for(let i=0;i<this.storeImg.length;i++)e.append("images[]",this.storeImg[i]),o.push(this.storeImg[i].name.split(".").pop());const d=o.toString();if(this.imgUploading=!0,this.editBundleProductsForm.invalid)return this._snackBar.open("All fields are required","",{duration:2e3,verticalPosition:"top"}),!1;if(""!==this.editBundleProductsForm.value.productImagepicture){if(!(d.match(/png/g)||d.match(/jpeg/g)||d.match(/jpg/g)))return this._snackBar.open("Only jpg, png and jpeg formats are allowed","",{duration:2e3,verticalPosition:"top"}),console.log("Only jpg, png and jpeg formats are allowed"),console.log(d),!1;this.productsService.uploadProductImage(e).subscribe(i=>{console.log(i),this.editBundleProductsForm.patchValue({productImages:i.imagePath}),this.imgUploading=!1,this.postFormInput(),console.log(this.editBundleProductsForm.value)},i=>{console.log(i)})}else this.imgUploading=!1,this.postFormInput()}removeImage(e,o){console.log(e,this.getId);const d={id:this.getId,image:e};confirm("Are you sure to delete ?")&&this.bundleproductsService.removeImage(d).subscribe(i=>{console.log(i.images),this.getProductImages=i.images},i=>{console.log(i)})}applyProductFilter(e){var o=e.trim().toLowerCase();this.productsService.filterProduct(o).subscribe(d=>{this.getProductList=d.Products,console.log("this.Products",this.getProductList)})}numberOnly(e){const o=e.which?e.which:e.keyCode;return!(o>31&&(o<48||o>57))}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(T.s),t.Y36(b.G),t.Y36(A.F),t.Y36(s.qu),t.Y36(h.ux),t.Y36(m.F0),t.Y36(P.c),t.Y36(q.n),t.Y36(y.Q),t.Y36(m.gz))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-edit-bundle-product"]],decls:116,vars:24,consts:[[1,"flex","flex-col","flex-auto","min-w-0",2,"max-height","90vh","overflow-y","scroll"],[1,"flex-auto","p-6","sm:p-10"],[1,"row"],[1,"mx-auto","col-12"],[1,"p-4","shadow","bg-white","products-form-wrapper","position-relative"],["id","productsForm",3,"formGroup"],[1,"col-md-12","mb-4","d-flex","align-items-end"],[1,"me-3"],["src","assets/images/logo/logo.svg","alt","",1,"",2,"width","35px","top","40px"],[2,"width","fit-content"],[1,"mt-3","mb-2","fw-bold","h4","text-center"],[1,"mx-auto","bg-primary",2,"height","2px","width","200px"],[1,"form-group","mb-3","col-md-6","col-12"],["for","",1,"mb-1"],["type","text","id","productName","name","productName","placeholder","John doe",1,"form-control",3,"formControlName"],["appearance","fill"],["formControlName","products","multiple",""],[1,"my-2","p-2"],["type","text","placeholder","search",1,"form-control","w-75","rounded-pill",3,"keyup"],["filterProduct",""],[3,"value",4,"ngFor","ngForOf"],["id","productDescription","name","productDescription","placeholder","John doe",1,"form-control",2,"height","20px",3,"formControlName"],["type","file","multiple","",1,"form-control",3,"formControlName","change"],["type","text","placeholder","John doe",1,"form-control","d-none",3,"formControlName"],[1,"my-3","col-12","form-group",3,"ngClass"],["class","col-lg-4  col-md-6 my-2",4,"ngFor","ngForOf"],[1,"form-group","col-12"],[1,"mt-3","mb-1","h5"],["class","col-lg-3 col-md-6 my-3 position-relative",4,"ngFor","ngForOf"],["type","text","id","productCode","name","productCode","placeholder","John doe",1,"form-control",3,"formControlName"],["type","text","id","productModel","name","productModel","placeholder","John doe",1,"form-control",3,"formControlName"],["aria-label","Default select example","formControlName","productCategory",1,"form-select",3,"change"],["value","","selected","","hidden","","disabled",""],["aria-label","Default select example","formControlName","productSubCategory",1,"form-select"],["aria-label","Default select example","formControlName","productBrand",1,"form-select"],[1,"form-group","mb-3","col-12"],["aria-label","Default select example","formControlName","vendor",1,"form-select"],["appearance","fill",1,"example-chip-list"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","New tags...",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["type","text","id","proce","name","price","placeholder","$50",1,"form-control",3,"formControlName","keypress"],["type","text","id","stock","name","stock","placeholder","$50",1,"form-control",3,"formControlName","keypress"],[1,"form-check"],["type","checkbox","value","","id","flexCheckDefault",1,"form-check-input",3,"formControlName"],["for","flexCheckDefault",1,"form-check-label"],["type","checkbox","value","","id","flexCheckDefault1",1,"form-check-input",3,"formControlName"],["for","flexCheckDefault1",1,"form-check-label"],[1,"form-group","mb-3"],["type","submit",1,"btn","btn-primary","py-2",3,"click"],[3,"value"],[1,"col-lg-4","col-md-6","my-2"],[1,"col-12","rounded-lg","shadow-lg","p-2","border-4","border-blue-200","border-opacity-100"],["alt","",1,"w-100",3,"src"],[1,"col-lg-3","col-md-6","my-3","position-relative"],["mat-mini-fab","","color","warn","aria-label","Example icon button with a home icon",1,"remove-images",3,"click"],[3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""]],template:function(e,o){if(1&e){const d=t.EpF();t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"form",5),t.TgZ(6,"div",2),t.TgZ(7,"div",6),t.TgZ(8,"div",7),t._UZ(9,"img",8),t.qZA(),t.TgZ(10,"div",9),t.TgZ(11,"div",10),t._uU(12,"Edit Bundle Product"),t.qZA(),t._UZ(13,"div",11),t.qZA(),t.qZA(),t.TgZ(14,"div",12),t.TgZ(15,"label",13),t._uU(16," Name"),t.qZA(),t._UZ(17,"input",14),t.qZA(),t.TgZ(18,"div",12),t.TgZ(19,"label",13),t._uU(20," Product"),t.qZA(),t.TgZ(21,"mat-form-field",15),t.TgZ(22,"mat-select",16),t.TgZ(23,"div",17),t.TgZ(24,"input",18,19),t.NdJ("keyup",function(){t.CHM(d);const a=t.MAs(25);return o.applyProductFilter(a.value)}),t.qZA(),t.qZA(),t.YNc(26,B,2,2,"mat-option",20),t.qZA(),t.qZA(),t.qZA(),t.TgZ(27,"div",12),t.TgZ(28,"label",13),t._uU(29," Description"),t.qZA(),t.TgZ(30,"textarea",21),t._uU(31,"                                    "),t.qZA(),t.qZA(),t.TgZ(32,"div",12),t.TgZ(33,"label",13),t._uU(34," Image"),t.qZA(),t.TgZ(35,"input",22),t.NdJ("change",function(a){return o.uploadProductImage(a)}),t.qZA(),t._UZ(36,"input",23),t.qZA(),t.TgZ(37,"div",24),t.TgZ(38,"div",2),t.YNc(39,I,3,1,"div",25),t.qZA(),t.qZA(),t.TgZ(40,"div",26),t.TgZ(41,"div",27),t._uU(42,"Product Images"),t.qZA(),t.TgZ(43,"div",2),t.YNc(44,N,6,1,"div",28),t.qZA(),t.qZA(),t.TgZ(45,"div",12),t.TgZ(46,"label",13),t._uU(47," Product Code"),t.qZA(),t._UZ(48,"input",29),t.qZA(),t.TgZ(49,"div",12),t.TgZ(50,"label",13),t._uU(51," Product Model"),t.qZA(),t._UZ(52,"input",30),t.qZA(),t.TgZ(53,"div",12),t.TgZ(54,"label",13),t._uU(55," Category"),t.qZA(),t.TgZ(56,"select",31),t.NdJ("change",function(a){return o.getCategoryValue(a)}),t.TgZ(57,"option",32),t._uU(58,"Select"),t.qZA(),t.YNc(59,_,2,2,"option",20),t.qZA(),t.qZA(),t.TgZ(60,"div",12),t.TgZ(61,"label",13),t._uU(62," Sub Category"),t.qZA(),t.TgZ(63,"select",33),t.TgZ(64,"option",32),t._uU(65,"Select"),t.qZA(),t.YNc(66,F,2,2,"option",20),t.qZA(),t.qZA(),t.TgZ(67,"div",12),t.TgZ(68,"label",13),t._uU(69," Brand"),t.qZA(),t.TgZ(70,"select",34),t.TgZ(71,"option",32),t._uU(72,"Select"),t.qZA(),t.YNc(73,U,2,2,"option",20),t.qZA(),t.qZA(),t.TgZ(74,"div",12),t.TgZ(75,"div",35),t.TgZ(76,"label",13),t._uU(77," Vendor"),t.qZA(),t.TgZ(78,"select",36),t.TgZ(79,"option",32),t._uU(80,"Select"),t.qZA(),t.YNc(81,J,2,2,"option",20),t.qZA(),t.qZA(),t.qZA(),t.TgZ(82,"div",12),t.TgZ(83,"label",13),t._uU(84," Tags"),t.qZA(),t.TgZ(85,"mat-form-field",37),t.TgZ(86,"mat-chip-list",38,39),t.YNc(88,E,3,4,"mat-chip",40),t.TgZ(89,"input",41),t.NdJ("matChipInputTokenEnd",function(a){return o.add(a)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(90,"div",12),t.TgZ(91,"label",13),t._uU(92," Price"),t.qZA(),t.TgZ(93,"input",42),t.NdJ("keypress",function(a){return o.numberOnly(a)}),t.qZA(),t.qZA(),t.TgZ(94,"div",12),t.TgZ(95,"label",13),t._uU(96," Stock"),t.qZA(),t.TgZ(97,"input",43),t.NdJ("keypress",function(a){return o.numberOnly(a)}),t.qZA(),t.qZA(),t.TgZ(98,"div",35),t.TgZ(99,"div",44),t._UZ(100,"input",45),t.TgZ(101,"label",46),t._uU(102," Today's Deal "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(103,"div",35),t.TgZ(104,"div",44),t._UZ(105,"input",47),t.TgZ(106,"label",48),t._uU(107," Publish "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(108,"div",35),t.TgZ(109,"div",44),t._UZ(110,"input",47),t.TgZ(111,"label",48),t._uU(112," feature "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(113,"div",49),t.TgZ(114,"button",50),t.NdJ("click",function(){return o.postData()}),t._uU(115,"Edit Product"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&e){const d=t.MAs(87);t.xp6(5),t.Q6J("formGroup",o.editBundleProductsForm),t.xp6(12),t.Q6J("formControlName","productName"),t.xp6(9),t.Q6J("ngForOf",o.getProductList),t.xp6(4),t.Q6J("formControlName","productDescription"),t.xp6(5),t.Q6J("formControlName","productImagepicture"),t.xp6(1),t.Q6J("formControlName","productImages"),t.xp6(1),t.Q6J("ngClass",o.showPreview?"d-block":"d-none"),t.xp6(2),t.Q6J("ngForOf",o.urls),t.xp6(5),t.Q6J("ngForOf",o.getProductImages),t.xp6(4),t.Q6J("formControlName","productCode"),t.xp6(4),t.Q6J("formControlName","productModel"),t.xp6(7),t.Q6J("ngForOf",o.getCategoriesList),t.xp6(7),t.Q6J("ngForOf",o.getSubCategoriesList),t.xp6(7),t.Q6J("ngForOf",o.getBrandsList),t.xp6(8),t.Q6J("ngForOf",o.getVendorsList),t.xp6(7),t.Q6J("ngForOf",o.tags),t.xp6(1),t.Q6J("matChipInputFor",d)("matChipInputSeparatorKeyCodes",o.separatorKeysCodes)("matChipInputAddOnBlur",o.addOnBlur),t.xp6(4),t.Q6J("formControlName","price"),t.xp6(4),t.Q6J("formControlName","stock"),t.xp6(3),t.Q6J("formControlName","todaysDeal"),t.xp6(5),t.Q6J("formControlName","publish"),t.xp6(5),t.Q6J("formControlName","featured")}},directives:[s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,f.KE,Z.gD,c.sg,c.mk,s.EJ,s.YN,s.Kr,u.qn,u.oH,s.Wl,x.ey,v.lW,C.Hw,u.HS,c.O5,u.qH],styles:[".products-form-wrapper[_ngcontent-%COMP%]{border-radius:10px}  .mat-simple-snackbar{justify-content:center!important}.ng-invalid.ng-touched[_ngcontent-%COMP%]{border-color:#dc3545!important}#productsForm[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#817777!important}.example-chip-list[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{width:100%!important}.remove-images[_ngcontent-%COMP%]{position:absolute;right:-10px;top:-17px}"]}),r})();var k=n(171),Q=n(9983),D=n(9692),L=n(4885),M=n(1494),Y=n(2789),w=n(8550),V=n(3771),$=n(4466);let j=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[c.ez,m.Bz.forChild([{path:"",component:O}]),$.m,Y.p0,v.ot,C.Ps,D.TU,M.JX,s.u5,s.UX,k.To,f.lN,Q.c,V.T,w.xD,L.Cq,h.ZX,u.Hi,Z.LD]]}),r})()}}]);