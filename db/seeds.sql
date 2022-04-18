USE company_db;

INSERT INTO department(department_name)
VALUES  ('Technology'),
        ('Operations'),
        ('Product');

INSERT INTO role(title, salary, department_id)
VALUES  ('Software Engineer', 90000, 1),
        ('Tech Lead', 125000, 1),
        ('Project Manager', 110000, 2),
        ('Product Manager', 115000, 3),
        ('Senior PM', 120000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Greg', 'Fish', 1, 2),
        ('Horton', 'Who', 2, NULL),
        ('Wilbur', 'Walace', 3, 4),
        ('Grace', 'Stevens', 5, NULL);