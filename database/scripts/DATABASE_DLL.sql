create table laravel.address
(
    id         bigint unsigned auto_increment
        primary key,
    zip_code   varchar(8)   not null,
    street     varchar(244) not null,
    city       varchar(100) not null,
    state      varchar(2)   not null,
    complement varchar(244) null,
    created_at timestamp    null,
    updated_at timestamp    null
)
    collate = utf8mb4_unicode_ci;

create table laravel.agents
(
    id         bigint unsigned auto_increment
        primary key,
    name       varchar(244)    not null,
    email      varchar(244)    not null,
    address_id bigint unsigned not null,
    created_at timestamp       null,
    updated_at timestamp       null,
    constraint agents_address_id_foreign
        foreign key (address_id) references laravel.address (id)
)
    collate = utf8mb4_unicode_ci;

create table laravel.customers
(
    id         bigint unsigned auto_increment
        primary key,
    name       varchar(244)    not null,
    document   varchar(11)     not null,
    gender     enum ('M', 'F') not null,
    date_birth date            not null,
    address_id bigint unsigned not null,
    created_at timestamp       null,
    updated_at timestamp       null,
    constraint customers_document_unique
        unique (document),
    constraint customers_address_id_foreign
        foreign key (address_id) references laravel.address (id)
)
    collate = utf8mb4_unicode_ci;

create table laravel.migrations
(
    id        int unsigned auto_increment
        primary key,
    migration varchar(255) not null,
    batch     int          not null
)
    collate = utf8mb4_unicode_ci;

create table laravel.sessions
(
    id            varchar(255)    not null
        primary key,
    user_id       bigint unsigned null,
    ip_address    varchar(45)     null,
    user_agent    text            null,
    payload       longtext        not null,
    last_activity int             not null
)
    collate = utf8mb4_unicode_ci;

create index sessions_last_activity_index
    on laravel.sessions (last_activity);

create index sessions_user_id_index
    on laravel.sessions (user_id);

