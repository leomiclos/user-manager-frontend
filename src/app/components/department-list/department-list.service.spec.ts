import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentListService } from './department-list.service';
import { environment } from '../../environments/environment';

describe('DepartmentListService', () => {
  let service: DepartmentListService;
  let httpMock: HttpTestingController;
  const api = environment.apiURI;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentListService]
    });
    service = TestBed.inject(DepartmentListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch departments (GET)', () => {
    const dummyDepartments = [
      { id: 1, departamento: 'HR' },
      { id: 2, departamento: 'IT' }
    ];

    service.getDepartments().subscribe(departments => {
      expect(departments).toEqual(dummyDepartments);
    });

    const req = httpMock.expectOne(`${api}/departamentos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDepartments);
  });

  it('should fetch department by ID (GET)', () => {
    const dummyDepartment = { id: 1, departamento: 'HR' };

    service.getDepartmentsById(1).subscribe(department => {
      expect(department).toEqual(dummyDepartment);
    });

    const req = httpMock.expectOne(`${api}/departamentos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDepartment);
  });

  it('should create a new department (POST)', () => {
    const newDepartment = { id: 3, departamento: 'Finance' };

    service.newDepartment(newDepartment).subscribe(department => {
      expect(department).toEqual(newDepartment);
    });

    const req = httpMock.expectOne(`${api}/departamentos`);
    expect(req.request.method).toBe('POST');
    req.flush(newDepartment);
  });

  it('should delete a department (DELETE)', () => {
    service.deleteDepartment(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${api}/departamentos/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
