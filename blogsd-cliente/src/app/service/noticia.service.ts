import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';


const URL: string = 'http://localhost:5000/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Noticia[]> {
    return this.httpClient.get<Noticia[]>(URL);
  }

  get(id: number): Observable<Noticia> {
    return this.httpClient.get<Noticia>(URL + '/' + id);
  }

  add(noticia: Noticia): Observable<Noticia> {
    return this.httpClient.post<Noticia>(URL, noticia);
  }

  update(noticia: Noticia): Observable<Noticia> {
    return this.httpClient.put<Noticia>(URL + '/' + noticia.id, noticia);
  }

  delete(id: number): Observable<Noticia> {
    return this.httpClient.delete<Noticia>(URL + '/' + id);
  }

}
