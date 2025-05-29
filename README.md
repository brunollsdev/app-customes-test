# Sumário

O projeto foi desenvolvido utilizando o laravel sail que é uma lib do laravel para subir utilizando docker, evitando assim
a necessidade da instalação e configuração da linguagem na máquina, sendo necessário apenas ter o docker.

### Scripts requisitados

Os scripts e o DLL da base requisitados no teste estão na pasta ./database/scripts

### Collection

A collection da API está na pasta ./setup/dev

# Subindo o projeto

Para subir o projeto pela primeira faça os seguintes passos.

1. crie um arquivo .env na raiz do projeto
2. copie os dados do arquivo .env.example para o .env
3. execute o comando `make install` isso vai instalar os pacotes do php e também do nodejs, subir os containers necessários para funcionar
4. execute o comando `make db` para executar as migrations e as seeds

# Executando migrations e seeds separado

Caso queira executar as migrations e as seeds separados base executar o comando `make run-migrate` para migrations e `make run-seed` para as seeds
