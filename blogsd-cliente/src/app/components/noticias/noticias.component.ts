import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/service/noticia.service';
import { Noticia } from 'src/app/models/noticia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  constructor(private noticiaService: NoticiaService,
    private router: Router) { }



  noticias: Noticia[] = [];
  noticia: Noticia = new Noticia();

  disableUpdate: boolean = true;
  disableAdd: boolean = false;

  ngOnInit() {
    this.getAll();
  }


  getAll() {
    this.noticiaService.getAll().subscribe(
      noticias => this.noticias = noticias
    );
  }

  add() {
    this.noticiaService.add(this.noticia).subscribe(() =>
      this.getAll());

    this.clear();
  }

  update() {

    this.noticiaService.update(this.noticia).subscribe(() => this.getAll());
    this.clear();

  }

  remove(id: number) {
    this.noticiaService.delete(id).subscribe(() => this.getAll());


  }

  edit(noticia: Noticia) {

    this.noticia.id = noticia.id;
    this.noticia.autor = noticia.autor;
    this.noticia.titulo = noticia.titulo;
    this.noticia.data = noticia.data;
    this.noticia.conteudo = noticia.conteudo;
    this.disableUpdate = false;
    this.disableAdd = true;

  }

  clear() {
    this.noticia = new Noticia();
    this.disableUpdate = true;
    this.disableAdd = false;
  }

}