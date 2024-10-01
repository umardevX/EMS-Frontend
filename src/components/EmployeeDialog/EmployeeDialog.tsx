import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Switch } from '@mui/material';

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth: string;
    hireDate: string;
    position?: string;
    department?: string;
    isActive: boolean;
}

interface EmployeeDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => void;
    employee?: Employee | null;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ open, onClose, onSave, employee }) => {
    const [formState, setFormState] = useState<Employee>({
        employeeId: employee?.employeeId || 0,
        firstName: employee?.firstName || '',
        lastName: employee?.lastName || '',
        email: employee?.email || '',
        phoneNumber: employee?.phoneNumber || '',
        dateOfBirth: employee?.dateOfBirth || '',
        hireDate: employee?.hireDate || '',
        position: employee?.position || '',
        department: employee?.department || '',
        isActive: employee?.isActive || true
    });

    useEffect(() => {
        if (employee) {
            setFormState({
                employeeId: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email || '',
                phoneNumber: employee.phoneNumber || '',
                dateOfBirth: employee.dateOfBirth,
                hireDate: employee.hireDate,
                position: employee.position || '',
                department: employee.department || '',
                isActive: employee.isActive
            });
        }
    }, [employee]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormState({
            ...formState,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = () => {
        onSave(formState);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{employee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formState.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formState.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    value={formState.phoneNumber}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formState.dateOfBirth}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="hireDate"
                    label="Hire Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formState.hireDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="position"
                    label="Position"
                    fullWidth
                    value={formState.position}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="department"
                    label="Department"
                    fullWidth
                    value={formState.department}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="isActive"
                            checked={formState.isActive}
                            onChange={handleChange}
                        />
                    }
                    label="Active"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
