use dept_contacts;
create table contacts(
  id int not null auto_increment,
  department int not null,
  first_name varchar(32) not null default "",
  middle_initial char not null default "",
  last_name varchar(32) not null default "",
  primary_contact bool not null default 0,
  phone varchar(12) not null default "",
  email varchar(64) not null default "",
  title varchar(32) not null default "",
  CONSTRAINT pk_contact_id PRIMARY KEY (id),
  FOREIGN KEY (department) REFERENCES departments(ida)
);