import React from 'react'
import AddEmployee from './components/AddEmployee'
import { PrismaClient } from '@prisma/client'

const page = async () => {
    const prisma = new PrismaClient()
    const departments = await prisma.department.findMany()
    const jobs = await prisma.job.findMany()
    return (
        <AddEmployee departments={departments} jobs={jobs} />
    )
}

export default page