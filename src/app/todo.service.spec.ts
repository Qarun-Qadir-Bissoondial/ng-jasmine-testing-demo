import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todo, TodoService } from './todo.service';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSingleTodo should send a GET request and return a single item', (done) => {

    service.getSingleTodo(1).subscribe(
      (item: Todo) => { expect(item).toBeDefined(); done(); },
      (error) => { fail(error.message) }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({ id: 1, userId: 1, title: 'Test Todo', completed: false });
   
  });

  fit('getSingleTodo should throw an error if 3 request attempts fail', (done) => {
    const id = 1;
    const errMessage = `Failed to fetch item with id ${id}`;
    service.getSingleTodo(id).subscribe(
      data => { fail('The request is supposed to throw an error') },
      (error: string) => { expect(error).toEqual(errMessage); done(); },
    );

    const retryCount = 3;
    for (let i = 0; i <= retryCount; i++) {
      httpMock
        .expectOne({url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET'})
        .flush({}, { status: 404, statusText: errMessage });
    }
  });

  it('createTodo should send a POST request and return the newly created item', (done) => {

    const item: Todo = {
      id: 2,
      userId: 2,
      title: 'Walk dog',
      completed: false
    };

    service.createTodo(item).subscribe(
      (data: Todo) => { expect(data).toBeDefined(); expect(data).toEqual(item); done() },
      (error) => { fail(error.message) } 
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(item);

  });

  describe('getAllTodos', () => {
    it('should send a GET request and return an array of items', (done) => {
      service.getAllTodos().subscribe(
        (data: Todo[]) => {
          expect(data).toBeDefined();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          done();
        },
        (error: HttpErrorResponse) => { fail('The request was supposed to return data') }
      );

      const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush([{ id: 1, userId: 1, title: 'Test Todo', completed: false }]);
    });

    it('should return an empty array if an Interal Server Error occurs', (done) => {
      
      service.getAllTodos().subscribe(
        (data: Todo[]) => {
          expect(data).toBeDefined();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(0);
          done()
        },
        (error: HttpErrorResponse) => { fail('The request was supposed to return an empty array') } 
      );

      const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush({}, { status: 500, statusText: 'Internal Server Error' });

    })
  });

  describe('updateTodos', () => {
    let displayErrorSpy: jasmine.Spy;

    beforeEach(() => {
      displayErrorSpy = spyOn(service, 'displayError');
    })

    it('should display an error message if the request is unauthorized', (done) => {
      service
        .updateTodo({ id: 1, userId: 1, title: 'Walk dog', completed: true })
        .subscribe(
          (data => {
            expect(data).toBeNull();
            expect(displayErrorSpy).toHaveBeenCalledWith('Unauthorized request');
            done();
          }),
          (error: HttpErrorResponse) => { fail('The Observable is not supposed to fail') }
        
      );

      const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
      expect(testRequest.request.method).toBe('PUT');
      testRequest.flush(null, { status: 401, statusText: 'Unauthorized request'});

    });
  });

});
