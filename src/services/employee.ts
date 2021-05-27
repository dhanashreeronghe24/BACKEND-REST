import employee from "../models/employee";
import Employee from "../types/employee";

export default class EmployeeService {

    constructor() { }

    async getAllEmp() {
        console.log("Fetching all employees..")
        return await employee.find();
    }

    async getEmpById(_id: any) {
        console.log("Fetching an employee by id..")
        return await employee.findById(_id);
    }

    async createEmp(emp: Employee) {
        console.log("An Employee is being created..")
        return await emp.save();
    }

    async updateEmp(id: any, emp: Employee) {
        console.log("An Employee is being updated..")
        return await employee.updateOne({ _id: id},{$set: 
           { empId: emp.empId,
            empName: emp.empName,
            empDOB: emp.empDOB,
            empContact: emp.empContact
        }
    });
    }

    async deleteEmp(id: any) {
        console.log("An Employee has been deleted..")
        return await employee.deleteOne({ _id: id });
    }

}