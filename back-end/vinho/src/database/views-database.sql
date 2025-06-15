/* VIEWS */

use db_projeto_vinho;

/* VIEW PARA A LISTAGEM DOS ENDEREÇOS DOS CLIENTES */
CREATE VIEW view_listagem_enderecos AS 
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo_cliente', c.cpf, c.email, e.id_endereco,
		   e.logradouro, e.bairro, e.localidade 'cidade', e.uf, e.cep, ec.apelido_endereco, ec.numero, ec.complemento
	FROM endereco e
		INNER JOIN endereco_cliente ec ON ec.endereco_id = e.id_endereco
        INNER JOIN cliente c ON c.id_cliente = ec.cliente_id
	ORDER BY 'cidade';
    
    
/* VIEW PARA A LISTAGEM DOS VINHO */
CREATE VIEW view_listagem_vinho AS
	SELECT v.id_vinho, v.imagem_vinho, v.mimetype , v.nome_imagem, v.extensao, v.nome 'nome_vinho', v.classificacao 'classificacao_vinho', 
		   vi.vinicola, v.uva 'uva_vinho', v.teor_alcolico, volume 'volume_vinho', temperatura_servir, p.pais, safra 'safra_vinho',
           v.preco 'preco_vinho', v.descricao, e.quantidade 'quantidade_disponivel', e.status_estoque
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
	ORDER BY v.id_vinho;


/* VIEW PARA A LISTAGEM DOS VINHO MAIS VENDIDOS */
CREATE VIEW view_listagem_vinhos_mais_vendidos AS
	SELECT v.id_vinho, v.imagem_vinho, v.mimetype , v.nome_imagem, v.extensao, v.nome 'nome_vinho', v.classificacao 'classificacao_vinho', 
		   vi.vinicola, v.uva 'uva_vinho', v.teor_alcolico, volume 'volume_vinho', temperatura_servir, p.pais, safra 'safra_vinho',
           v.preco 'preco_vinho', v.descricao, e.quantidade 'quantidade_disponivel', e.status_estoque, qtd_vendida.quantidade 'qtd_vendas'
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
        INNER JOIN quantidade_venda_vinhos qtd_vendida ON qtd_vendida.vinho_fk = v.id_vinho
	ORDER BY qtd_vendida.quantidade DESC;


/* VIEW PARA A LISTAGEM DO ESTOQUE */
CREATE VIEW view_listagem_estoque AS
	SELECT e.id_estoque, v.id_vinho, v.imagem_vinho, v.extensao, v.nome 'vinho', v.descricao, vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.safra 'safra_vinho', p.pais 'pais_vinho', v.preco 'preco_vinho', e.quantidade 'quantidade_estoque', e.status_estoque 
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
	ORDER BY v.id_vinho;


/* VIEW PARA A LISTAGEM DOS CLIENTES COM SEUS ENDEREÇOS */
CREATE VIEW view_listagem_cliente AS
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo', c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular, COALESCE(e.logradouro, 'Sem informação de endereço') 'endereco', 
           COALESCE(ec.numero, 'Sem informação do número') 'numero', COALESCE(ec.complemento, 'Sem informação de complemento') 'complemento',
           COALESCE(e.bairro, 'Sem informação de bairro') 'bairro', COALESCE(e.localidade, 'Sem informação de localidade') 'localidade',
           COALESCE(e.uf, 'Sem informação de uf') 'uf', COALESCE(e.cep, 'Sem informação de cep') 'cep'
    FROM cliente c
		INNER JOIN endereco_cliente ec ON ec.cliente_id = c.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY 'nome_completo';


/* VIEW PARA A LISTAGEM DOS CLIENTES */
CREATE VIEW view_cliente AS
	SELECT c.id_cliente, c.nome 'primeiro_nome', c.sobrenome, c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular, c.administrador as 'acesso'
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
	SELECT ic.id_itens_carrinho, c.id_carrinho, v.id_vinho , v.imagem_vinho, v.extensao, v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.descricao, p.pais 'pais_vinho', v.preco 'preco_vinho', cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo',
           ic.quantidade
	FROM itens_carrinho ic
		INNER JOIN carrinho c ON c.id_carrinho = ic.carrinho_fk
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = c.cliente_fk
	WHERE ic.item_esta_no_pedido = 0
    ORDER BY vinho;


/* VIEW PARA A LISTAGEM DOS ITENS DO PEDIDO */
CREATE VIEW view_listagem_itens_pedido AS
	SELECT ip.id_itens_pedido, pe.id_pedido, v.id_vinho , v.imagem_vinho, v.extensao, v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.descricao, p.pais 'pais_vinho', v.preco 'preco_vinho', cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo', ip.quantidade
	FROM itens_pedido ip
		INNER JOIN pedido pe ON pe.id_pedido = ip.pedido_fk
        INNER JOIN vinho v ON v.id_vinho = ip.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = pe.cliente_fk
    ORDER BY vinho;

 
/* VIEW PARA A LISTAGEM DOS PEDIDOS*/
CREATE VIEW view_listagem_pedidos AS
	SELECT pe.id_pedido, v.id_vinho, v.imagem_vinho, v.mimetype, v.extensao, v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   p.pais 'pais_vinho', v.preco 'preco_vinho', ic.quantidade, cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo', cl.celular,
           e.logradouro 'endereco', ec.numero, ec.complemento, e.bairro, e.localidade, e.uf, e.cep, pe.valor_total 'preco_total_pedido',
           DATE_FORMAT(pe.data_pedido, "%d/%m%/%Y") as 'data_pedido', pe.status_pedido
	FROM pedido pe
        INNER JOIN itens_pedido ic ON ic.pedido_fk = pe.id_pedido
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = pe.cliente_fk
        INNER JOIN endereco_cliente ec ON ec.cliente_id = cl.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY pe.id_pedido;
