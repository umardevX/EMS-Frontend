import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled, tableCellClasses, TablePagination } from '@mui/material';
import EmployeeDialog from '../EmployeeDialog/EmployeeDialog';
import axiosInstance from '../../api/axiosInstance';

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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const EmployeeGrid: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        fetchEmployees();
    },[]);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get<Employee[]>('/employees');
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
              await axiosInstance.post('/employees', employee);
            } else if (dialogType === 'edit' && selectedEmployee) {
              await axiosInstance.put(`/employees/${selectedEmployee.employeeId}`, employee);
            }
            fetchEmployees();
            handleCloseDialog();
          } catch (error) {
            console.error('Error saving employee', error);
          }
    };

    const handleDelete = async (employeeId: number) => {
        try {
            await axiosInstance.delete(`/employees/${employeeId}`);
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
        rowsPerPageOptions={[5, 25, 50]}
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

export default EmployeeGrid;
