import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesService } from '.././modules/services/categories.service';

@Pipe({
  name: 'getCategoryNameById'
})
export class GetCategoryNameByIdPipe implements PipeTransform {
  constructor(private http: HttpClient, private categoriesService: CategoriesService) {}

  transform(value: any, ...args: unknown[]): unknown{
    var result = '';
    this.categoriesService.listCategories().subscribe((res:any) => {
      console.log(res.Categories);
        for (let i = 0; i < res.Categories.length; i++) {
          const element = res.Categories[i]._id;
          if(element == value) {
            result = res.Categories[i].categoryName
            //console.log(result)
          }
        }
      }
    )
    return result;
    
  }

}
