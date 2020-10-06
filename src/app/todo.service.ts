import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get(this.url).pipe(
      
      catchError((error: HttpErrorResponse) => {
        
        if (error.status === 500) {
          return of([]);
        }
        
      })

    )
  }

  getSingleTodo(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      retry(3),
      catchError(error => {
        return throwError(`Failed to fetch item with id ${id}`)
      })
    )
  }

  createTodo(item: Todo) {
    return this.http.post(this.url, item);
  }

  updateTodo(updatedItem: Todo) {
    return this.http.put(`${this.url}/${updatedItem.id}`, updatedItem).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.displayError(error.statusText);
          return of(null);
        }
      })
    )
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  displayError(message: string) {
    console.log(message);
  }

}
