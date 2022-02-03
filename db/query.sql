SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title,
    roles.department_id,
    roles.salary,
    employees.manager_id
FROM employees
INNER JOIN roles ON roles.id = employees.role_id
INNER JOIN departments ON departments.id = roles.department_id;