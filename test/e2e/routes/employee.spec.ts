import { Express } from 'express';
import { createServer, Server } from 'http';
import faker from 'faker';
import supertest from 'supertest';
import init from '../../../src/app';
import { closeDBConnection } from '../../../src/db/dbConnection';


describe("e2eTESTS - Employee CRUD", () => {
  let app: Express;
  let server: Server;
  let generatedId: string;
  let fakeEmployeeRequest = {
    empId: faker.random.alphaNumeric(),
    empName: faker.name.findName(),
    empDOB: faker.date.past().toDateString(),
    empContact: faker.phone.phoneNumber()
  }

  beforeEach(async () => {
    app = await init();
    server = createServer(app);
  })

  it('Add an employee', async () => {
    const expectedEmployee = fakeEmployeeRequest;
    const req = supertest(server);
    let res = await req.post('/employee')
      .send(expectedEmployee);
    expect(res.status).toEqual(200);
    generatedId = res.body?._id;
    expect(res.body?.empId).toEqual(expectedEmployee.empId);
  })

  it('Fetch an employee by id', async () => {
    const req = supertest(server);
    let res = await req.get(`/employee/${generatedId}`);
    expect(res.status).toEqual(200);
    expect(res.body?.empId).toEqual(fakeEmployeeRequest.empId);
  })

  it('Update an employee', async () => {
    const req = supertest(server);
    fakeEmployeeRequest.empName = "This record has been updated using unit tests";
    let expectedEmployee = fakeEmployeeRequest;
    let res = await req.patch(`/employee/${generatedId}`).send(expectedEmployee);
    expect(res.status).toEqual(200);
    expect(res.body?.nModified).toEqual(1);
  })

  it('Delete an employee', async () => {
    const req = supertest(server);
    let res = await req.delete(`/employee/${generatedId}`);
    expect(res.status).toEqual(200);
    expect(res.body?.deletedCount).toEqual(1);
  })

  afterAll(async () => {
    await closeDBConnection();
  }) 

});