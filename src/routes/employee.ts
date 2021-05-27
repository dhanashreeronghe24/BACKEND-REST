import express, { Request, Response } from 'express';
import employee from '../models/employee';
import Employee from '../types/employee';
import EmployeeService from '../services/employee';
const empRouter = express.Router();
let employeeService = new EmployeeService()

empRouter.get('/', getAllEmployees);
empRouter.get('/:_id', getEmployeeById)
empRouter.post('/', addEmployee);
empRouter.patch('/:_id', updateEmployee)
empRouter.delete('/:_id', deleteEmployee)


export async function getAllEmployees(req: Request, res: Response) {
    try {
        const response = await employeeService.getAllEmp();
        res.json(response);
    } catch (error) {
        res.json({ message: error });
    }
}


export async function addEmployee(req: any, res: Response): Promise<void> {
    try {

        const emp: Employee = new employee({
            empId: req.body.empId,
            empName: req.body.empName,
            empDOB: req.body.empDOB,
            empContact: req.body.empContact
        })
        const response = await employeeService.createEmp(emp);
        res.json(response);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function getEmployeeById(req: Request, res: Response) {
    try {
        const response = await employeeService.getEmpById(req.params._id);
        res.json(response);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function updateEmployee(req: Request, res: Response) {
    try {
        const response = await employeeService.updateEmp(req.params._id,req.body);
        res.json(response);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function deleteEmployee(req: Request, res: Response) {
    try {
        const emp = await employeeService.deleteEmp(req.params._id);
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export default empRouter;