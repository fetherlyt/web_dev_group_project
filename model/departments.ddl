use dept_contacts;
create table departments(
  id int not null auto_increment,
  dept_number varchar(12) not null default "",
  code varchar(12) not null default "",
  name varchar(64) not null default "",
  CONSTRAINT pk_reqd_field PRIMARY KEY (id)
);