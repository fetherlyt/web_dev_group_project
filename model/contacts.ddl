use dept_contacts;
create table contacts(
  department varchar(32),
  first_name varchar(32),
  middle_initial char not null default "",
  last_name varchar(32),
  primary_contact bool not null default 0,
  phone varchar(12),
  email varchar(64),
  title varchar(32) not null default "",
  CONSTRAINT pk_full_row PRIMARY KEY (department, first_name,
  last_name, phone, email)
);