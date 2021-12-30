import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Produto } from 'src/app/produto.model';
import { ApiService } from 'src/app/shared/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class ProductsComponent implements OnInit {
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  excluirClicked = false;
  editeClicked = false;
  image = 'assets/img/menu.png';

  proDetail!: FormGroup;
  proObjt : Produto = new Produto();
  proList : Produto[] = [];
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  allProdutosData: any;
  data: any;
  showAdd!: boolean;
  showbtn!: boolean;
  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modalService: BsModalService
  ) {}


  ngOnInit(): void {
    this.proDetail = this.formBuilder.group({
      id : [''],
      name : [''],
      descricao: [''],
      data: [''],
      categoria:[''],
      image:[''],
      preco:[''],
      service:[''],
    });

    this.getAllProduto();
  }
  addProduto() {
    console.log(this.proDetail);
    this.proObjt.id = this.proDetail.value.id;
    this.proObjt.name = this.proDetail.value.name;
    this.proObjt.descricao = this.proDetail.value.descricao;
    this.proObjt.categoria = this.proDetail.value.categoria;
    this.proObjt.data = this.proDetail.value.data;
    this.proObjt.image = this.proDetail.value.image;
    this.proObjt.preco = this.proDetail.value.preco;
    this.proObjt.service = this.proDetail.value.service;

    this.api.addProduto(this.proObjt).subscribe(res=>{
        console.log(res);


        let ref = document.getElementById('clear');
        ref?.click();

        this.proDetail.reset();
        this.getAllProduto();
    },err=>{

    });

  }

  getAllProduto() {
    this.api.getAllProduto().subscribe(res=>{
        this.proList = res;
    },err=>{
      console.log("error while fetching data.")

    });
  }

  editeProduto(pro : Produto) {
    this.showAdd = false;
    this.showbtn = true;
    this.proDetail.controls['id'].setValue(pro.id);
    this.proDetail.controls['name'].setValue(pro.name);
    this.proDetail.controls['categoria'].setValue(pro.categoria);
    this.proDetail.controls['data'].setValue(pro.data);
    this.proDetail.controls['descricao'].setValue(pro.descricao);
    this.proDetail.controls['image'].setValue(pro.image);
    this.proDetail.controls['preco'].setValue(pro.preco);
    this.proDetail.controls['service'].setValue(pro.service);
  }

  updateProduto() {

    this.proObjt.id = this.proDetail.value.id;
    this.proObjt.name = this.proDetail.value.name;
    this.proObjt.descricao = this.proDetail.value.descricao;
    this.proObjt.categoria = this.proDetail.value.categoria;
    this.proObjt.data = this.proDetail.value.data;
    this.proObjt.image = this.proDetail.value.image;
    this.proObjt.preco = this.proDetail.value.preco;
    this.proObjt.service = this.proDetail.value.service;

    this.api.updateProduto(this.proObjt).subscribe(res=>{


      let ref = document.getElementById('clear');
      ref?.click();

      this.getAllProduto();
    },err=>{

    })

  }
  deleteProduto(pro : Produto) {

    this.api.deleteProduto(pro).subscribe(res=>{

      this.getAllProduto();
    },err => {
      console.log(err);
    });

  }

// Pegar todos os dados da Api e dar um refresh atualizando os dados da tela

//trocar formulario adicionar por editar
  clickAddprodutos() {
    this.proDetail.reset();
  }

// notificacao de sucesso ou erro
  showSucesso() {

  }
  showErro() {

  }


}

