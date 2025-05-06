/* VIEWS */

use db_projeto_vinho;

/* VIEW PARA A LISTAGEM DOS ENDEREÇOS DOS CLIENTES */
CREATE VIEW view_listagem_enderecos AS 
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo_cliente', c.cpf, c.email, e.id_endereco,
		   e.logradouro, e.bairro, e.localidade 'cidade', e.uf, e.cep, ec.numero, ec.complemento
	FROM endereco e
		INNER JOIN endereco_cliente ec ON ec.endereco_id = e.id_endereco
        INNER JOIN cliente c ON c.id_cliente = ec.cliente_id
	ORDER BY 'cidade';
    
    
/* VIEW PARA A LISTAGEM DOS VINHO */
CREATE VIEW view_listagem_vinho AS
	SELECT v.id_vinho, v.imagem_vinho, v.mimetype, v.nome_imagem, v.extensao, v.nome 'nome_vinho', v.classificacao 'classificacao_vinho', 
		   vi.vinicola, v.uva 'uva_vinho', v.teor_alcolico, volume 'volume_vinho', temperatura_servir, p.pais, safra 'safra_vinho',
           v.preco 'preco_vinho', v.descricao
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
	ORDER BY 'nome_vinho';


/* VIEW PARA A LISTAGEM DO ESTOQUE */
CREATE VIEW view_listagem_estoque AS
	SELECT e.id_estoque, v.id_vinho, v.nome 'vinho', v.descricao, vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.safra 'safra_vinho', p.pais 'pais_vinho', v.preco 'preco_vinho', e.quantidade 'quantidade_estoque',
           e.status_estoque 
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
	ORDER BY v.nome;
    

/* VIEW PARA A LISTAGEM DOS CLIENTES COM SEUS ENDEREÇOS */
CREATE VIEW view_listagem_cliente AS
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo', c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular, e.logradouro 'endereco', ec.numero,
		   ec.complemento, e.bairro, e.localidade, e.uf, e.cep
    FROM cliente c
		INNER JOIN endereco_cliente ec ON ec.cliente_id = c.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY 'nome_completo';


/* VIEW PARA A LISTAGEM DOS CLIENTES */
CREATE VIEW view_cliente AS
	SELECT c.id_cliente, c.nome 'primeiro_nome', c.sobrenome, c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular
    FROM cliente c
	ORDER BY 'nome_completo';
    
    
/* VIEW PARA A LISTAGEM DOS ITENS DO CARRINHO */
CREATE VIEW view_listagem_carrinho AS
	SELECT ca.id_carrinho, c.id_cliente, c.cpf, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo'
	FROM carrinho ca
        INNER JOIN cliente c ON c.id_cliente = ca.cliente_fk
	ORDER BY ca.id_carrinho;
    

/* VIEW PARA A LISTAGEM DOS ITENS DO CARRINHO */
CREATE VIEW view_listagem_itens_carrinho AS
	SELECT ic.id_itens_carrinho, v.id_vinho , v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.descricao, p.pais 'pais_vinho', v.preco 'preco_vinho', cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo',
           ic.quantidade
	FROM itens_carrinho ic
		INNER JOIN carrinho c ON c.id_carrinho = ic.carrinho_fk
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = c.cliente_fk
	ORDER BY 'vinho';
    
 
/* VIEW PARA A LISTAGEM DOS PEDIDOS*/
CREATE VIEW view_listagem_pedidos AS
	SELECT pe.id_pedido, v.id_vinho , v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   p.pais 'pais_vinho', v.preco 'preco_vinho', v.descricao, ic.quantidade, cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo', 
           cl.celular, e.logradouro 'endereco', ec.numero, ec.complemento, e.bairro, e.localidade, e.uf, e.cep, 
		   pe.valor_total 'preco_total_pedido', pe.data_pedido, pe.status_pedido
	FROM pedido pe
		INNER JOIN carrinho c ON c.id_carrinho = pe.carrinho_fk
        INNER JOIN itens_carrinho ic ON ic.carrinho_fk = c.id_carrinho
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = c.cliente_fk
        INNER JOIN endereco_cliente ec ON ec.cliente_id = cl.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY pe.data_pedido;
