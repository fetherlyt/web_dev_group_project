use dept_contacts;
create table contacts(
  department varchar(32),
  first_name varchar(32),
  middle_initial char,
  last_name varchar(32),
  primary_contact bool,
  phone varchar(12),
  email varchar(64),
  title varchar(32)
);