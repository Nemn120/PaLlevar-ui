import { Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { CategoryProductBean } from "../../../../_model/CategoryProductBean";
import { CategoryProductService } from "../../../../_service/category-product.service";
import { CategoryFormComponent } from "../category-form/category-form.component";

import Swal from "sweetalert2";
import "animate.css";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["name", "description", "actions"];
  dataSource: MatTableDataSource<CategoryProductBean>;
  titleCategoryProductList: string;
  constructor(
    private categoryProductService: CategoryProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.titleCategoryProductList = "Listar Categorias";
    this.categoryProductService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, "INFO", {
        duration: 2000,
      });
    });

    this.categoryProductService.ompanyCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.categoryProductService
      .getListCategoryProductByOrganization()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  public openDialog(categoryProduct?: CategoryProductBean) {
    let productSelect =
      categoryProduct != null ? categoryProduct : new CategoryProductBean();
    this.dialog.open(CategoryFormComponent, {
      panelClass: "app-full-bleed-dialog",
      minWidth: "900",
      data: productSelect,
    });
  }
  public delete(categoryProduct: CategoryProductBean) {
    Swal.fire({
      title: "¿Está seguro de borrar la categoría?",
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryProductService
          .deleteCategoryProduct(categoryProduct.id)
          .subscribe((data) => {
            this.categoryProductService
              .getListCategoryProductByOrganization()
              .subscribe((data) => {
                this.categoryProductService.ompanyCambio.next(data);
                this.categoryProductService.mensajeCambio.next(
                  "Se elimino con éxito"
                );
              });
          });
      }
    });
  }
}
