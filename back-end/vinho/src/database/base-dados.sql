/* SCRIPTS DE INSERÇÃO DE DADOS */

/* TABELA PAIS */
INSERT INTO pais (pais, sigla) VALUES ("Brasil", "BRA");

INSERT INTO pais (pais, sigla) VALUES ("Argentina", "ARG");

INSERT INTO pais (pais, sigla) VALUES ("França", "FRA");

/* TABELA VINICOLA */
INSERT INTO
    vinicola (vinicola, rotulo)
VALUES ("vinicola1", "rotulo1");

INSERT INTO
    vinicola (vinicola, rotulo)
VALUES ("vinicola2", "rotulo2");

/* TABELA ESTOQUE */
INSERT INTO
    estoque (
        vinho_fk,
        quantidade,
        status_estoque
    )
VALUES (1, 10, 'normal');

INSERT INTO
    estoque (
        vinho_fk,
        quantidade,
        status_estoque
    )
VALUES (2, 2, 'Baixo');

INSERT INTO
    estoque (
        vinho_fk,
        quantidade,
        status_estoque
    )
VALUES (3, 30, 'cheio');

/* TABELA VINHO Obs: Agora é necessário passar as informações da imagem */
CALL cadastro_vinho (
    'Teste',
    'Cabernet',
    '13%',
    'Suave',
    '750ml',
    2020,
    '16°C',
    89.99,
    'Um vinho delicioso!',
    1,
    2
);