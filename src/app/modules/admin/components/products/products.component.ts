import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosData } from 'src/app/produto.model';
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
  MacBookPro2021: string = '/src/assets/img/MacBookPro2019.png';
  MacBookAir2020: string = '/src/assets/img/MacBookAir2020.png';
  MacBookAir2021: string = '/src/assets/img/MacBookAir2021.png';
  MacBookPro2019: string = '/src/assets/img/MacBookPro2016.png';

  formValue!: FormGroup;
  produtosModel: ProdutosData = new ProdutosData();
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  allProdutosData: any;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      preco: [''],
      data: [''],
      categorias: [''],
      imagem: [''],
      valor: [''],
    });
    this.getAllData();
  }
  addProduto() {
    this.produtosModel.nome = this.formValue.value.nome;
    this.produtosModel.descricao = this.formValue.value.descricao;
    this.produtosModel.data = this.formValue.value.data;
    this.produtosModel.imagem = this.formValue.value.imagem;
    this.produtosModel.valor = this.formValue.value.valor;
    this.produtosModel.categoria = this.formValue.value.categorias;
    this.api.postProduto(this.produtosModel).subscribe(
      (res) => {
        console.log(res);
        alert('Produto adicionado com Sucesso!');

        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Erro ao adicionar produto!');
      }
    );
  }
  getAllData() {
    this.api.getProdutos().subscribe((res) => {
      this.allProdutosData = res;
    });
  }
  deleteProd(prod: any) {
    this.api.deleteProdutos(prod.id).subscribe((res) => {
      alert('Produto Deletado!');
      this.getAllData();
    });
  }
  editProd(prod: any) {
    this.formValue.controls['nome'].setValue(prod.name);
    this.formValue.controls['descricao'].setValue(prod.descricao);
    this.formValue.controls['data'].setValue(prod.data);
    this.formValue.controls['categoria'].setValue(prod.categoria);
    this.formValue.controls['imagem'].setValue(prod.imagem);
    this.formValue.controls['valor'].setValue(prod.valor);
  }

  updateProd() {
    this.produtosModel.nome = this.formValue.value.nome;
    this.produtosModel.descricao = this.formValue.value.descricao;
    this.produtosModel.data = this.formValue.value.data;
    this.produtosModel.imagem = this.formValue.value.imagem;
    this.produtosModel.valor = this.formValue.value.valor;
    this.produtosModel.categoria = this.formValue.value.categorias;

    this.api
      .updateProdutos(this.produtosModel, this.produtosModel.id)
      .subscribe((res) => {
        alert('Produto atualizado!');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModall(templatee: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatee);
  }
  openModaleditar(templateeditar: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateeditar);
  }
  openModaldeletar(templatedeletar: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatedeletar);
  }
}

export class MenuIconsExample {}
