import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Employee, PrismaClient } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmployeesListItem = async ({ employee }: { employee: Employee }) => {
    const prisma = new PrismaClient()
    const employeePosition = await prisma.job.findUnique({
        where: {
            jobId: employee.jobId
        }
    })
    const employeeManager = await prisma.employee.findUnique({
        where: {
            employeeId: employee.managerId || undefined
        }
    })
    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>{employee.firstName} {employee.lastName}</CardTitle>
                    <CardDescription>{employeePosition?.jobTitle}</CardDescription>
                </div>
                <Link href={`/dashboard/employees/${employee.employeeId}`} className={buttonVariants({ variant: 'default', })}><ArrowRight /></Link >
            </CardHeader>
            <CardContent>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='font-semibold'>Email</p>
                        <p className='text-muted-foreground text-sm'>{employee.email}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Phone</p>
                        <p className='text-muted-foreground text-sm'>{employee.phoneNumber}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Salary</p>
                        <p className='text-muted-foreground text-sm'>${employee.salary?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-right'>Manager</p>
                        <p className='text-muted-foreground text-sm'>{employeeManager?.firstName ?? ''} {employeeManager?.lastName ?? ''}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EmployeesListItem