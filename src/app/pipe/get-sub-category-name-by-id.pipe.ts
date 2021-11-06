import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesService } from 'app/modules/admin/categories.service';
import { SubCategoriesService } from 'app/modules/admin/sub-Categories.service';

@Pipe({
  name: 'getSubCategoryNameById'
})
export class GetSubCategoryNameByIdPipe implements PipeTransform {
  constructor(private http: HttpClient, private subCategoriesService: SubCategoriesService) {}

  transform(value: any, ...args: unknown[]): unknown{
    var result = '';
    this.subCategoriesService.listSubCategories().subscribe((res:any) => {
      console.log('subb', res.SubCategories);
        for (let i = 0; i < res.SubCategories.length; i++) {
          const element = res.SubCategories[i]._id;
          if(element == value) {
            result = res.SubCategories[i].subCategoryName
            //console.log(result)
          }
        }
      }
    )
    return result;
    
  }

}
