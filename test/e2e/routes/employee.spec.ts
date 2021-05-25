import { Express } from 'express';
import { createServer, Server } from 'http';
import supertest from 'supertest';
import init from '../../../src/app';
import { closeDBConnection } from '../../../src/db/dbConnection';
import Employee from '../../../src/types/employee'


describe("e2eTESTS - Employee CRUD", ()=>{
    let app: Express;
    let server: Server;
    let generatedId: string;
    let fakeEmployeeRequest: Employee = {
      empId: "e3",
      empName: "Sarah",
      empDOB: "24-07-1995",
      empContact: "+1 234 56765 7"
    }

    beforeEach( async()=>{
      app = await init();
      server = createServer(app);
    })

    it('should create an employee', async () => {
        //arrange
        const expectedEmployee: Employee = fakeEmployeeRequest;
        const req = supertest(server);
    
        // act
        let res = await req.post('/employee')
          .send(expectedEmployee);
    
        // assert
        expect(res.status).toEqual(200);
        generatedId = res.body?._id;
        expect(res.body?.empId).toEqual(expectedEmployee.empId);
    
      })

      it('should delete an employee', async () => {
        //arrange
        const req = supertest(server);
    
        // act
        let res = await req.delete(`/employee/${generatedId}`);
    
        // assert
        expect(res.status).toEqual(200);
        expect(res.body?.deletedCount).toEqual(1);
    
      })

    afterAll(async ()=>{
        await closeDBConnection();
    })

});