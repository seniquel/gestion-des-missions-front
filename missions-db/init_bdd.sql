create table collegue (
    id serial not null,
    nom char(100) not null,
    prenom char(100) not null,
    email char(100) not null,
    motDePasse char(100) not null
);

insert into collegue (nom, prenom, email, motDePasse) values ('Admin', 'DEV', 'admin@dev.fr', 'superpass');
insert into collegue (nom, prenom, email, motDePasse) values ('User', 'DEV', 'user@dev.fr', 'superpass');