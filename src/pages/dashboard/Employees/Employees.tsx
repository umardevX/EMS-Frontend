import { useEffect } from "react";
import EmployeeGrid from "../../../components/EmployeeGrid/EmployeeGrid";

interface EmployeesProps {
    setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
    link: string;
}

export const Employees = ({ setSelectedPage, link }: EmployeesProps) => {

    useEffect(() => {
        setSelectedPage(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <EmployeeGrid />
    )
}
