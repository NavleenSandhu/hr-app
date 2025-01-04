import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PrismaClient } from '@prisma/client'
import React, { Suspense } from 'react'
import EmployeesListItem from './EmployeesListItem'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const EmployeesList = async () => {
    const prisma = new PrismaClient()
    const employees = await prisma.employee.findMany()
    const departments = await prisma.department.findMany()

    return (
        <Card className='m-4'>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Employees</CardTitle>
                    <CardDescription>List of all employees</CardDescription>
                </div>
                <Link href='/dashboard/employees/add' className={buttonVariants({
                    variant: 'default',
                })}>Add employee</Link>
            </CardHeader>
            <CardContent>
                <Accordion type='single' collapsible>
                    {
                        departments.map(department => {
                            const filteredEmployees = employees.filter(employee => employee.departmentId === department.departmentId)
                            return (< AccordionItem key={department.departmentId} value={department.departmentId}>
                                <AccordionTrigger>{department.departmentName}</AccordionTrigger>
                                <AccordionContent className='space-y-4'>
                                    <Suspense fallback={<p>Loading...</p>}>
                                        {
                                            filteredEmployees.length === 0 ?
                                                <p>No employees found</p> :
                                                filteredEmployees.map(employee =>
                                                    <EmployeesListItem key={employee.employeeId} employee={employee} />
                                                )
                                        }
                                    </Suspense>
                                </AccordionContent>
                            </AccordionItem>)
                        })
                    }
                </Accordion>
            </CardContent>
        </Card >
    )
}

export default EmployeesList