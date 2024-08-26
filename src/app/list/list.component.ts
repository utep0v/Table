import { Component, OnInit } from '@angular/core';
import { data } from "../shared/data/data";
import { DataInterface } from "../shared/interfaces/data.interface";
import { FormsModule } from "@angular/forms";
import { NzTableComponent, NzThAddOnComponent } from "ng-zorro-antd/table";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NgForOf, NgIf } from "@angular/common";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { customColumn } from "../shared/data/custom-column";
import { NzPopoverDirective } from "ng-zorro-antd/popover";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NzTableComponent,
    NzThAddOnComponent,
    NzButtonComponent,
    CdkDrag,
    CdkDropList,
    NzColDirective,
    NzIconDirective,
    NzRowDirective,
    NgForOf,
    NgIf,
    FormsModule,
    NzInputDirective,
    NzPaginationComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzPopoverDirective
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data = data;
  customColumn = customColumn;

  filteredData: DataInterface[] = [...this.data];
  paginatedData: DataInterface[] = [];

  filtersVisible = false;

  filterCriteria: Record<string, string> = {};

  pageIndex = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.updatePaginatedData();
  }

  get scrollX(): string {
    const visibleColumnCount = this.customColumn.filter(col => col.default).length;
    const defaultWidthPerColumn = 250;
    const minWidth = 600;
    const totalWidth = visibleColumnCount * defaultWidthPerColumn;
    return totalWidth > minWidth ? `${totalWidth}px` : `${minWidth}px`;
  }

  getColumnValue(item: DataInterface, columnKey: string): any {
    switch (columnKey) {
      case 'name':
        return `${item.name?.first || ''} ${item.name?.last || ''}`;
      case 'isActive':
        return item.isActive ? 'Active' : 'Inactive';
      case 'tags':
        return item.tags ? item.tags.join(', ') : '';
      default:
        return (item as any)[columnKey];
    }
  }

  applyFilters(): void {
    this.filteredData = this.data.filter((item: any) =>
      Object.keys(this.filterCriteria).every(key => {
        const criteria = this.filterCriteria[key];
        if (criteria !== undefined && criteria !== '') {
          if (key === 'isActive') {
            return item[key].toString() === criteria;
          }
          return item[key]?.toString().toLowerCase().includes(criteria.toLowerCase());
        }
        return true;
      })
    );
    this.pageIndex = 1;
    this.updatePaginatedData();
  }

  onSort(sortOrder: string | null, column: any): void {
    this.customColumn.forEach((col: any) => col.sortOrder = col === column ? sortOrder : null);

    if (sortOrder) {
      const multiplier = sortOrder === 'ascend' ? 1 : -1;
      this.filteredData.sort((a, b) => multiplier * column.sortFn(a, b));
    } else {
      this.filteredData = [...this.data];
    }
    this.pageIndex = 1;
    this.updatePaginatedData();
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updatePaginatedData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }
}
