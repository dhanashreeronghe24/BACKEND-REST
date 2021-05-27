import { Document }  from 'mongoose';
export default interface Employee extends Document
{
    empId: string;
    empName: string;
    empDOB?: string;
    empContact?: string;

}