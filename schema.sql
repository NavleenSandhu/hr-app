
CREATE TABLE jobs (
    job_id UUID DEFAULT gen_random_uuid() NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    min_salary DECIMAL(10, 2),
    max_salary DECIMAL(10, 2),
    PRIMARY KEY (job_id)
);

CREATE TABLE departments (
    department_id UUID DEFAULT gen_random_uuid() NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    manager_id UUID,
    PRIMARY KEY (department_id)
);

CREATE TABLE employees (
    employee_id UUID DEFAULT gen_random_uuid() NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    job_id UUID NOT NULL,
    salary DECIMAL(10, 2),
    manager_id UUID,
    department_id UUID,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE job_history (
    employee_id UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    job_id UUID NOT NULL,
    department_id UUID NOT NULL,
    PRIMARY KEY (employee_id, start_date),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);