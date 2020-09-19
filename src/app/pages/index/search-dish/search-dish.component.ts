import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuDayProductService } from 'src/app/_service/menu-day-product.service';
import { MenuDayProductBean } from 'src/app/_model/MenuDayProductBean';
import { ProductService } from 'src/app/_service/product.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationService } from 'src/app/_service/organization.service';
import { CompanyBean } from 'src/app/_model/CompanyBean';
import { CompanyNameAndProductsDTO } from 'src/app/_DTO/CompanyNameAndProductsDTO';
import { ProductBean } from 'src/app/_model/ProductBean';

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {


listaPlatillos: MenuDayProductBean[] = [];
platilloBuscado:string;
listaPlatillosPorEmpresa: MenuDayProductBean[] = [];
empresas: CompanyBean[];
compañiaYproducto : CompanyNameAndProductsDTO[];
listaDTO : CompanyNameAndProductsDTO[] = [];   //////////////////////////////
xd : any;
dto: CompanyNameAndProductsDTO[];

ListaEmpresaConProductos: CompanyNameAndProductsDTO[];



  constructor(
    private _activatedRoute:ActivatedRoute, 
    private _menuDayProductService:MenuDayProductService, 
    private productService: ProductService,
    public sharedService: SharedService,
    private sanitization: DomSanitizer,
    private _organizationService: OrganizationService) { }

  ngOnInit(): void {
    //this.platilloBuscado = this._activatedRoute.snapshot.params['nameDish'];
    //this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
    //this.listaPlatillos = data;
  //})
    this._activatedRoute.params.subscribe(params=>{
      this.platilloBuscado=params['nameDish'];
      this._menuDayProductService.getSearchPlatillos(this.platilloBuscado).subscribe(data=>{
        this.activatedPhoto(data);
        this.listaPlatillos= data;
        //this.xd = this.hola(this.listaPlatillos);
        //console.log(this.xd);
        //this.mostrarProductosPorEmpresa();
        //this.adios();
        //this.listaPlatillosPorEmpresa= this.hola(this.listaPlatillos);
        //this.hola();
        //console.log(this.listaDTO);
        //console.log(this.listaPlatillosPorEmpresa);
        this.MostrarProductoxEmpresa(this.listaPlatillos);
        console.log(this.ListaEmpresaConProductos);
        //this.groupMenuProductDay(this.listaPlatillos);
        
        //console.log(this.listaDTO);
        
        //console.log(this.listaPlatillos);
        
        //this.listaPlatillosPorEmpresa = this.hola(this.listaPlatillos);
        
        //this.groupMenuProductDay(this.listaPlatillos);

        //this.groupMenuProductDay(this.listaPlatillos);
        //console.log(this.listaDTO);

        //this.asignarListaDeProductosAsignarEmpresas();

        //console.log(this.empresas);
        //console.log(this.listaPlatillosPorEmpresa);
        //console.log(this.compañiaYproducto._listOfProductsShowed);
        //console.log(this.compañiaYproducto._organization);
      })
    })
  }

  /*

  prueba8(listaPlatillos: MenuDayProductBean[]){
    this.ListaEmpresaConProductos = [];
    let DTOplatillosOrganizaciónX = [];
    listaPlatillos.forEach(platillo=>{
      let nuevoDTO = new CompanyNameAndProductsDTO(); 
      if(!DTOplatillosOrganizaciónX[platillo.organizationId-1]){
        DTOplatillosOrganizaciónX
      }
    })
  }
  */
  /*
  prueba10(listaPlatillos: MenuDayProductBean[]){
    this.ListaEmpresaConProductos = [];
    let index = 0;
    listaPlatillos.forEach(plat=>{
      
      if(plat.organizationId-1 != index){
        let nuevoDTO = new CompanyNameAndProductsDTO();
        nuevoDTO._listOfProductsShowed = [];
        nuevoDTO._listOfProductsShowed.push(plat);
        this._organizationService.getCompanyById(plat.organizationId).subscribe(data=>{
          nuevoDTO._organization = new CompanyBean();
          nuevoDTO._organization= data;
          this.ListaEmpresaConProductos[index] = nuevoDTO;
          index = plat.organizationId-1;
        })
      }
      else{
        this.ListaEmpresaConProductos[plat.organizationId-1]._listOfProductsShowed.push(plat);
      }
    })
    
    
  }

  */

  MostrarProductoxEmpresa(listaPlatillos: MenuDayProductBean[]){
    this.ListaEmpresaConProductos = [];
    listaPlatillos.forEach(plat=>{
      if(!this.ListaEmpresaConProductos[plat.organizationId-1]){
        this.ListaEmpresaConProductos[plat.organizationId-1] = new CompanyNameAndProductsDTO();
        this.ListaEmpresaConProductos[plat.organizationId-1]._listOfProductsShowed = [];
        this.ListaEmpresaConProductos[plat.organizationId-1]._listOfProductsShowed.push(plat);
        this._organizationService.getCompanyById(plat.organizationId).subscribe(data=>{
          this.ListaEmpresaConProductos[plat.organizationId-1]._organization = new CompanyBean();
          this.ListaEmpresaConProductos[plat.organizationId-1]._organization= data;
        })
      }
      else{
        this.ListaEmpresaConProductos[plat.organizationId-1]._listOfProductsShowed.push(plat);
      }
    })

  }

  /*
  prueba7(){
    let index = 0
    
    this.listaPlatillos.forEach(primerPlato=>{
      let nuevoDTO = new CompanyNameAndProductsDTO();
      nuevoDTO._listOfProductsShowed = [];
      if(primerPlato.organizationId-1 == index){
        
        this.listaDTO[index]._listOfProductsShowed.push(primerPlato);
      }else{
        
        nuevoDTO._listOfProductsShowed.push(primerPlato);
        this._organizationService.getCompanyById(primerPlato.organizationId).subscribe(company=>{
          nuevoDTO._organization = company;
          this.listaDTO.push(nuevoDTO);
          index = primerPlato.organizationId-1;
        })
      }
    })
  }
  */
  
  /*
  hola(){
    let porEmpresas = [];
    this.listaPlatillos.forEach(r =>{
      if(!porEmpresas[r.organizationId-1]){
        porEmpresas[r.organizationId-1] = [];
      }else{
        porEmpresas[r.organizationId-1].push(r);
        let nuevoDTO = new CompanyNameAndProductsDTO();
        nuevoDTO._listOfProductsShowed = [];
        nuevoDTO._listOfProductsShowed = porEmpresas[r.organizationId-1];
        this._organizationService.getCompanyById(r.organizationId).subscribe(company=>{
          nuevoDTO._organization = new CompanyBean();
          nuevoDTO._organization = company;
          this.listaDTO.push(nuevoDTO);
        })
      }
      

    })
    
    //return porEmpresas;
    
  }

  adios(){
    let nuevoDTO = new CompanyNameAndProductsDTO();
    this.listaDTO = [];
    nuevoDTO._listOfProductsShowed = [];
    nuevoDTO._organization = new CompanyBean();
    let platillosPorEmpresa = [];
    this.listaPlatillos.forEach(platillo=>{
      if(!nuevoDTO._listOfProductsShowed[platillo.organizationId]){
        nuevoDTO._listOfProductsShowed[platillo.organizationId] = undefined;
        //this.listaDTO.find(dto => dto._organization.id == platillo.organizationId)._listOfProductsShowed = platillosPorEmpresa;
      }
      nuevoDTO._listOfProductsShowed[platillo.organizationId] = platillo;
      this._organizationService.getCompanyById(platillo.organizationId).subscribe(company=>{
        nuevoDTO._organization = company;
        this.listaDTO.push(nuevoDTO);
      })
      //platillosPorEmpresa[platillo.organizationId].push(platillo);
      
      
    })
  }
  

  
  public mostrarProductosPorEmpresa(){
    this.listaDTO = [];
    
    this.listaPlatillos.forEach(platillo =>{
      let nuevoDTO = new CompanyNameAndProductsDTO();
      if(!nuevoDTO[platillo.organizationId]){
        nuevoDTO._listOfProductsShowed = [];
        //nuevoDTO._listOfProductsShowed.push(platillo);
      }
      nuevoDTO._listOfProductsShowed.push(platillo);
      nuevoDTO._listOfProductsShowed = [];
      this._organizationService.getCompanyById(platillo.organizationId).subscribe(data =>{
        nuevoDTO._organization = data;
        this.listaDTO.push(nuevoDTO);
      })
    })
  }
   //////////////////////////////////////////////////////////////////////////////////////////////
  public groupMenuProductDay(menuProductList: MenuDayProductBean[]){
    let index = 0;
    this.listaDTO = [];
    menuProductList.forEach(platillo=>{
      if(platillo.organizationId-1 == index){
        this.listaDTO.find(DTOseleccionado => DTOseleccionado._organization.id -1 == index)._listOfProductsShowed.push(platillo);
      }else{
        let nuevoDTO = new CompanyNameAndProductsDTO();
        nuevoDTO._listOfProductsShowed = [];
        nuevoDTO._listOfProductsShowed.push(platillo);
        this._organizationService.getCompanyById(platillo.organizationId).subscribe(data =>{
          nuevoDTO._organization = data;
          this.listaDTO.push(nuevoDTO);
          index = platillo.organizationId -1;
        })
        
      }
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
 
  /*

  asignarListaDeProductosAsignarEmpresas(){
    this.compañiaYproducto = [];
    let aux = []; // para organizar la matriz de productos por id de empresa
    let flag;   // se meterá las empresas
    this.listaPlatillos.forEach(platillo =>{
      if(!aux[platillo.organizationId]){
        //aux[platillo.organizationId] = [];
        aux[platillo.organizationId] = [];
      }
      aux[platillo.organizationId].push(platillo);
      this._organizationService.getCompanyById(platillo.organizationId).subscribe(data =>{
        flag = data; 
      })
    })
    this.empresas = flag;
    this.listaPlatillosPorEmpresa = aux;

    this.compañiaYproducto._listOfProductsShowed = aux;
    this.compañiaYproducto._organization = flag;
    
    a._organization = this.empresas;
    a._listOfProductsShowed = this.listaPlatillosPorEmpresa;
    
  }  

  */
  
  
  


activatedPhoto(data: any) {
  for ( const m of data) {
    this.productService.getPhotoById(m.product.id).subscribe(photo => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        const base64 = reader.result;
        m.product._foto = this.setterPhoto(base64);
        m.product._isFoto = true;
      };
      this.sharedService.loading = false;
    });
  }
}

setterPhoto(data: any) {
  return this.sanitization.bypassSecurityTrustResourceUrl(data);
}
    
}

