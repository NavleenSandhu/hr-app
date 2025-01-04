import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Department, PrismaClient } from '@prisma/client'
import { Pen } from 'lucide-react'
import React from 'react'

const DepartmentsListItem = async ({ department }: { department: Department }) => {
    const prisma = new PrismaClient()
    let departmentManager = null
    if (department.managerId) {
        departmentManager = await prisma.employee.findUnique({
            where: {
                employeeId: department.managerId.toString()
            }
        })
    }
    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <CardTitle>{department.departmentName}</CardTitle>
                <Button variant='outline'>
                    <Pen />
                </Button>
            </CardHeader>
            <CardContent>
                <p>Managed by:</p>
                <p>{departmentManager ? `${departmentManager.firstName} ${departmentManager.lastName}` : (<span className='text-destructive'>No manager assigned</span>)}</p>
            </CardContent>
        </Card>
    )
}

export default DepartmentsListItem