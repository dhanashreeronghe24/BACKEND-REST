import express, { Request, Response } from 'express';
import employee from '../models/employee';
const empRouter = express.Router();

empRouter.get('/', getAllEmployees);
empRouter.get('/:_id', getEmployeeById)
empRouter.post('/', addEmployee);
empRouter.patch('/:_id', updateEmployee)
empRouter.delete('/:_id', deleteEmployee)


export async function getAllEmployees(req: Request, res: Response) {
    try {
        const emp = await employee.find();
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function addEmployee(req: Request, res: Response) {
    try {
        const emp = await employee.create({
            empId: req.body.empId,
            empName: req.body.empName,
            empDOB: req.body.empDOB,
            empContact: req.body.empContact
        })
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function getEmployeeById(req: Request, res: Response) {
    try {
        const emp = await employee.findById(req.params._id);
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function updateEmployee(req: Request, res: Response) {
    try {
        const emp = await employee.updateOne({ _id: req.params._id }, {
            $set: {
                empId: req.body.empId,
                empName: req.body.empName,
                empDOB:req.body.empDOB,
                empContact: req.body.empContact
            }
        })
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export async function deleteEmployee(req: Request, res: Response) {
    try {
        const emp = await employee.deleteOne({ _id: req.params._id });
        res.json(emp);
    } catch (error) {
        res.json({ message: error });
    }
}

export default empRouter;