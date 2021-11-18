import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosData } from 'src/app/produto.model';
import { ApiService } from 'src/app/shared/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  MacBookPro2021: string = "/src/assets/img/MacBookPro2019.png";
  MacBookAir2020: string = "/src/assets/img/MacBookAir2020.png";
  MacBookAir2021: string = "/src/assets/img/MacBookAir2021.png";
  MacBookPro2019: string = "/src/assets/img/MacBookPro2016.png";

  formValue!: FormGroup
  produtoModel :ProdutosData = new ProdutosData;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  allProdutosData: any;

  constructor(private formBuilder: FormBuilder, private api:ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      preco: [''],
      data: [''],
      categorias: [''],
      imagem: [''],
      acao: [''],
      valor:['']
    })
    this.getAllData();
  }
addProduto(){
  this.produtoModel.nome = this.formValue.value.nome;
  this.produtoModel.descricao = this.formValue.value.descricao;
  this.produtoModel.data = this.formValue.value.data;
  this.produtoModel.categoria = this.formValue.value.categoria;
  this.produtoModel.imagem = this.formValue.value.imagem;
  this.produtoModel.acao = this.formValue.value.acao;
  this.produtoModel.valor = this.formValue.value.valor;

  this.api.postProduto(this.produtoModel).subscribe(res=>{
    console.log(res);
    alert("Produto adicionado com Sucesso!");

    let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData()
  },
  err=>{
    alert("Erro ao adicionar produto!");
  }
  )
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-md' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  getAllData(){
    this.api.getProdutos().subscribe(res=>{
      this.allProdutosData = res;
    })
  }
  deleteProd(prod:any){
  this.api.deleteProdutos(prod.id).subscribe(res=>{
    alert("Produto Deletado!")
    this.getAllData();
  })
  }
  editProd(prod:any){
    this.formValue.controls['nome'].setValue(prod.name);
    this.formValue.controls['descricao'].setValue(prod.descricao);
    this.formValue.controls['data'].setValue(prod.data);
    this.formValue.controls['categoria'].setValue(prod.categoria);
    this.formValue.controls['imagem'].setValue(prod.imagem);
    this.formValue.controls['valor'].setValue(prod.valor);
  }
}
