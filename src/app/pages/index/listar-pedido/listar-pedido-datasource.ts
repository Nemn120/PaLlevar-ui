import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListarPedidoItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ListarPedidoItem[] = [
  {id: 1, name: 'Ceviche'},
  {id: 2, name: 'Pollo a la Brasa'},
  {id: 3, name: 'Arroz con pollo'},
  {id: 4, name: 'Jale Mixta'},
  {id: 5, name: 'Carapulcra'},
  {id: 6, name: 'Chicharron de pescado'},
  {id: 7, name: 'Aji de gallina'},
  {id: 8, name: 'Causa'},
  {id: 9, name: 'Tallarin verde'},
  {id: 10, name: 'Chuleta'},
  {id: 11, name: 'Churrasco'},
  {id: 12, name: 'Escabeche de Pollo'},
  {id: 13, name: 'Pescado frito'},
  {id: 14, name: 'Escabeche de pescado'},
  {id: 15, name: 'Tallarin rojo'},
  {id: 16, name: 'Caldo de gallina'},
  {id: 17, name: 'Pollo broaster'},
  {id: 18, name: 'Seco a la norteña'},
  {id: 19, name: 'Arroz chaufa'},
  {id: 20, name: 'Arroz con mariscos'},
];

/**
 * Data source for the ListarPedido view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListarPedidoDataSource extends DataSource<ListarPedidoItem> {
  data: ListarPedidoItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  
  
  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListarPedidoItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListarPedidoItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListarPedidoItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
