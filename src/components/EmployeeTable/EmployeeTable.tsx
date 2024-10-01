/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled, tableCellClasses, TablePagination } from '@mui/material';
import axios from 'axios';
import EmployeeDialog from '../EmployeeDialog/EmployeeDialog';

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

const API_URL = 'http://localhost:5173/api/employees';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const EmployeeTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchEmployees();
    },[]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>(API_URL, config);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees', error);
        }
    };

    const handleOpenDialog = (type: 'add' | 'edit', employee?: Employee) => {
        setDialogType(type);
        setSelectedEmployee(employee || null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEmployee(null);
    };

    const handleSave = async (employee: Employee) => {
        try {
            if (dialogType === 'add') {
                await axios.post(API_URL, employee, config);
            } else if (dialogType === 'edit' && selectedEmployee) {
                await axios.put(`${API_URL}/${selectedEmployee.employeeId}`, employee, config);
            }
            fetchEmployees();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving employee', error);
        }
    };

    const handleDelete = async (employeeId: number) => {
        try {
            await axios.delete(`${API_URL}/${employeeId}`, config);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };
  
    const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <div>
            <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={() => handleOpenDialog('add')}>Add Employee</Button>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >First Name</StyledTableCell >
                            <StyledTableCell >Last Name</StyledTableCell >
                            <StyledTableCell >Email</StyledTableCell >
                            <StyledTableCell >Phone Number</StyledTableCell >
                            <StyledTableCell >Date of Birth</StyledTableCell >
                            <StyledTableCell >Hire Date</StyledTableCell >
                            <StyledTableCell >Position</StyledTableCell >
                            <StyledTableCell >Department</StyledTableCell >
                            <StyledTableCell >Active</StyledTableCell >
                            <StyledTableCell >Actions</StyledTableCell >
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                            <StyledTableRow  key={employee.employeeId}>
                                <StyledTableCell >{employee.firstName}</StyledTableCell >
                                <StyledTableCell >{employee.lastName}</StyledTableCell >
                                <StyledTableCell >{employee.email}</StyledTableCell >
                                <StyledTableCell >{employee.phoneNumber}</StyledTableCell >
                                <StyledTableCell >{employee.dateOfBirth}</StyledTableCell >
                                <StyledTableCell >{employee.hireDate}</StyledTableCell >
                                <StyledTableCell >{employee.position}</StyledTableCell >
                                <StyledTableCell >{employee.department}</StyledTableCell >
                                <StyledTableCell >{employee.isActive ? 'Yes' : 'No'}</StyledTableCell >
                                <StyledTableCell >
                                    <Button sx={{ mr: 2 }} variant="contained" color="primary" onClick={() => handleOpenDialog('edit', employee)}>Edit</Button>
                                    <Button variant="contained" color="primary" onClick={() => handleDelete(employee.employeeId)}>Delete</Button>
                                </StyledTableCell >
                            </StyledTableRow >
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            </Paper>
            {openDialog && (
                <EmployeeDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onSave={handleSave}
                    employee={selectedEmployee}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
