import Employee from '../../../src/types/employee';
import employee from '../../../src/models/employee';
import EmployeeService from '../../../src/services/employee';

const employeeService = new EmployeeService();

describe('unit tests',()=>{
    it('add an employee', async () => {
        let expectedEmployee: Employee = new employee({
            empId: "e4",
            empName: "sarah",
            empContact: "test phn",
            empDOB: "test"
        })
        let mockAddEmp = jest.fn();
        employee.prototype.save = mockAddEmp.mockReturnValue(new employee(
            {
                "empId": "e4",
                "empName": "sarah",
                "empContact":"test phn",
                "empDOB":"test"
        }))
        
        let response = await employeeService.createEmp(expectedEmployee);
        expect(response.empId).toEqual(expectedEmployee.empId);
        expect(response.empName).toHaveLength(2);//negative case 🤪
    })

})