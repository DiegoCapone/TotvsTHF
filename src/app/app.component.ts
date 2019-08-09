import { Component } from '@angular/core';



import { ThfMenuItem } from '@totvs/thf-ui';
import { ThfKendoGridColumn } from '@totvs/thf-kendo';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private appService: AppService) {
  }

  retorn: any;
  selectedItem: any;
  dataItems = [];
  save = true;

  columns: Array<ThfKendoGridColumn> = [
    {column: 'Ordem',
      /** Nome da coluna a ser exibido na tabela. */
      label: 'Ordem',
      /** Tamanho da coluna em pixels. */
      width: 100,
      editable: false,
    },

    {column: 'Descricao',
      /** Nome da coluna a ser exibido na tabela. */
      label: 'Descricao',
      /** Tamanho da coluna em pixels. */
      width: 300,
      editable: false,
    },

    {column: 'Decisao',
      /** Nome da coluna a ser exibido na tabela. */
      label: 'Decisao',
      /** Tamanho da coluna em pixels. */
      width: 200,
      editable: true
    },

    {column: 'Validacao',
      /** Nome da coluna a ser exibido na tabela. */
      label: 'Validacao',
      /** Tamanho da coluna em pixels. */
      editable: false,
      width: 100
    },

  ];

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];

  // tslint:disable-next-line: use-lifecycle-interface
   ngOnInit() {
    this.onGet();
  }

  onGet() {
    this.appService.getToken().subscribe((res: any) => {
      // tslint:disable-next-line: no-shadowed-variable
      return this.appService.getPedidos().subscribe((res: any) => {
        console.log(res.items);
        this.dataItems = res.items;
      });
    });
    // tslint:disable-next-line: deprecation
  }

  onSelectionChange(event) {
    this.selectedItem = event.data ? event.data.ProductName : '' ;
  }


  onEditable(event) {
    this.selectedItem = event.data ? event.data : '' ;
    const ordem = this.selectedItem.Ordem.toString();
    const decisao = this.selectedItem.Decisao.toString();
    console.log(this.selectedItem.Ordem);
    console.log(this.selectedItem.Decisao);


    if ( decisao === '' ) {
      alert('Número de desição não pode ser em branco');
      return this.selectedItem.Validacao = 'X';
    }

    if ( decisao.length !== 10 ) {
      alert('Número de desição invalido');
      return this.selectedItem.Validacao = 'X';
    }

    const resp = this.appService.postPedidos(ordem, decisao).subscribe((res: any) => {
      console.log(res);
      res.Status === 'OK' ?  this.selectedItem.Validacao = 'V' : this.selectedItem.Validacao = 'X';
    }, error => {
      // this.save = false ;
      // console.log(this.save);
    });

  }

  // onSave(event) {
  //   return this.save;
  // }

  onSubmit() {
    console.log('teste');
  }

  private onClick() {
    alert('Clicked in menu item');
  }

}
