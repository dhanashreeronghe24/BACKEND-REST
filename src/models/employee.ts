import { Schema, model } from 'mongoose';
import Employee from '../types/employee';

const addEmployee = new Schema({
    empId: {
        type: String,
        required: true
    },
    empName: {
        type: String,
        required: true
    },
    empDOB: {
        type: String
    },
    empContact: {
        type: String
    }
}
)
export default model<Employee>("employee", addEmployee);