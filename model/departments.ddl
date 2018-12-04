use dept_contacts;
create table departments(
  dept_number varchar(12),
  code varchar(12) not null default "",
  name varchar(64),
  CONSTRAINT pk_reqd_field PRIMARY KEY (dept_number, name)
);