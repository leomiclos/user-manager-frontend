import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const api = environment.apiURI;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users (GET)', () => {
    const dummyUsers = [
      { id: 1, nome: 'John Doe', email: 'john@example.com', departamento: 'HR', dataNascimento: '1990-01-01' },
      { id: 2, nome: 'Jane Smith', email: 'jane@example.com', departamento: 'IT', dataNascimento: '1985-05-15' }
    ];

    service.getUser().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${api}/usuarios`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should create a new user (POST)', () => {
    const newUser = {
      nome: 'New User',
      email: 'newuser@example.com',
      departamento: 'Finance',
      dataNascimento: '1995-08-20'
    };

    service.newUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${api}/usuarios`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should delete a user (DELETE)', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${api}/usuarios/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should edit a user (PUT)', () => {
    const userId = 1;
    const updatedUser = {
      nome: 'Updated User',
      email: 'updateduser@example.com',
      departamento: 'IT',
      dataNascimento: '1990-02-15'
    };

    service.editUser(updatedUser, userId).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${api}/usuarios/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });
});
