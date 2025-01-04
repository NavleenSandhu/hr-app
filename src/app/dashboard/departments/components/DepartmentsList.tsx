import { PrismaClient } from '@prisma/client'
import React from 'react'
import DepartmentsListItem from './DepartmentsListItem'

const DepartmentsList = async () => {
    const prisma = new PrismaClient()
    const departments = await prisma.department.findMany()
    return (
        <div className=' p-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {departments.map(department =>
                <DepartmentsListItem key={department.departmentId} department={department} />
            )}
        </div>
    )
}

export default DepartmentsList