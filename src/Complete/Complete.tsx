import React, { useEffect, useState } from 'react';
import './Complete.css'; // Use the new CSS file for Complete component
import TableContainer from '@mui/material/TableContainer';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CompleteProps {
    value: string[]; // Expect an array of strings
}

export const Complete = ({ value }: CompleteProps) => {
    const [reciveval, setReciveval] = useState<string[]>([]);

    useEffect(() => {
        setReciveval((prevValues) => {
            if (Array.isArray(value)) {
                const newValues = value.filter((item) => !prevValues.includes(item));
                return [...prevValues, ...newValues];
            }
            return prevValues;
        });
    }, [value]);

    const handleDelete = (task: string) => {
        setReciveval((prevValues) => prevValues.filter((item) => item !== task));
    };

    return (
        <TableContainer className='complete-sec' component={Paper} sx={{ width: '100%', marginTop: 2 }}>
            <Table className="Tablee">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} align="left">
                            <h2>Complete Task</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reciveval.map((task, index) => (
                        <TableRow key={index}>
                            <TableCell>{task}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDelete(task)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
