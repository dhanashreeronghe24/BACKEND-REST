import Employee from '../../../src/types/employee';
import employee from '../../../src/models/employee';
import EmployeeService from '../../../src/services/employee';

const employeeService = new EmployeeService();

describe('unit tests', () => {
    beforeEach(()=>{
        jest.fn().mockClear();
    })
    it('add an employee', async () => {
        let expectedEmployee: Employee = new employee({
            empId: "e4",
            empName: "sarah",
            empContact: "test phn",
            empDOB: "test"
        })
        let mockAddEmp = jest.fn();
        employeeService.createEmp = mockAddEmp.mockReturnValue(new employee(
            {
                "empId": "e4",
                "empName": "sarah",
                "empContact": "test phn",
                "empDOB": "test"
            }))

        let response = await employeeService.createEmp(expectedEmployee);
        expect(response.empId).toEqual(expectedEmployee.empId);
        expect(response.empName).not.toHaveLength(0);//negative case 🤪
    })

    it("update an employee", async () => {
        let expectedEmployee: Employee = new employee({
            empId: "e4",
            empName: "sarah update",
            empContact: "test phn",
            empDOB: "test"
        })
        let mockUpdateEmp = jest.fn();
        employeeService.updateEmp = mockUpdateEmp.mockReturnValue({
            "n": 1,
            "nModified": 1
        })

        let response = await employeeService.updateEmp("rdftghvcb",expectedEmployee);
        expect(response.nModified).toEqual(1); 
    
    })

})