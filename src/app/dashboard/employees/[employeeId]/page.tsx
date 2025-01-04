import { Separator } from '@/components/ui/separator'
import { PrismaClient } from '@prisma/client'
import React from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
const page = async ({ params }: { params: Promise<{ employeeId: string }> }) => {
    const prisma = new PrismaClient()
    const { employeeId } = await params
    const employee = await prisma.employee.findUnique({
        where: {
            employeeId: employeeId
        }
    })
    if (!employee) {
        notFound()
    }
    const employeeDepartment = await prisma.department.findUnique({
        where: {
            departmentId: employee?.departmentId
        }
    })
    const employeeManager = await prisma.employee.findUnique({
        where: {
            employeeId: employee?.managerId || ''
        }
    })
    const employeePosition = await prisma.job.findUnique({
        where: {
            jobId: employee?.jobId
        }
    })
    return (
        <div className='px-6 py-4 space-y-2'>
            <div className='flex justify-between items-center'>
                <div />
                <h1 className='text-lg font-bold'>Employee Details</h1>
                <Button>Edit</Button>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Employee Name</h2>
                <p>{employee?.firstName} {employee?.lastName}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Email</h2>
                <p>{employee?.email}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Phone Number</h2>
                <p>{employee?.phoneNumber}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Hire Date</h2>
                <p>{format(employee!.hireDate!, 'do MMMM, yyyy')}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Salary</h2>
                <p>${employee?.salary?.toFixed(2)}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Manager</h2>
                <p>{employeeManager?.firstName ?? ''} {employeeManager?.lastName ?? ''}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Job Title</h2>
                <p>{employeePosition?.jobTitle}</p>
            </div>
            <Separator />
            <div>
                <h2 className='font-semibold'>Department</h2>
                <p>{employeeDepartment?.departmentName}</p>
            </div>
        </div>
    )
}

export default page