const CONFIG = {
    whatsappNumber: "5511987654321",
    telefoneFixo: "5511970707070",
    emailContato: "contato@padariasoares.com.br",
    taxaEntrega: 5.00,
    taxaImposto: 0.05,
    pontosPorReal: 1,
    descontosPorQuantidade: {
        5: 0.05,
        10: 0.10,
        20: 0.15
    },
    taxasDeCambio: {
        "USD": 5.20,
        "EUR": 5.80,
        "GBP": 6.50
    }
};
let estadoPadaria = {
    nomePadaria: "Padaria Soares",
    enderecoPadaria: "Rua dos Sabores, 123 - Bairro Crocância, Cidade Feliz",
    telefonePadaria: "(11) 97070-7070",
    emailPadaria: "contato@padariasoares.com.br",
    estoque: {
        "Pão Francês Tradicional": 1000,
        "Pão de Leite": 500,
        "Pão Integral com Grãos": 300,
        "Bolo de Fubá com Goiabada": 50,
        "Bolo de Cenoura com Chocolate": 70,
        "Coxinha de Frango": 200,
        "Bolinha de Queijo": 150
    },
    produtosDisponiveis: [
        { 
            codigo: "PAO001", 
            nome: "Pão Francês Tradicional", 
            preco: 0.80, 
            imagem: "imagens/Produtos/pao-frances-crocante.png", 
            categoria: "Pães Tradicionais", 
            descricao: "Nosso clássico pão francês, crocante por fora e macio por dentro." 
        },
        { 
            codigo: "PAO002", 
            nome: "Pão de Leite", 
            preco: 6.50, 
            imagem: "imagens/Produtos/Pão-de-leite-macio.png", 
            categoria: "Pães Tradicionais", 
            descricao: "Massa super macia e saborosa, perfeito para o café da manhã." 
        },
        { 
            codigo: "PAO003", 
            nome: "Pão Integral com Grãos", 
            preco: 12.90, 
            imagem: "imagens/Produtos/Pao-Integral-Graos.png", 
            categoria: "Pães Especiais", 
            descricao: "Pão integral nutritivo com mix de grãos, linhaça e chia." 
        },
        { 
            codigo: "BOL001", 
            nome: "Bolo de Fubá com Goiabada", 
            preco: 7.90, 
            imagem: "imagens/Produtos/Bolo-de-Fuba-com-Goiabada.png", 
            categoria: "Bolos", 
            descricao: "Bolo de fubá cremoso com recheio de goiabada cascão." 
        },
        { 
            codigo: "BOL002", 
            nome: "Bolo de Cenoura com Chocolate", 
            preco: 8.50, 
            imagem: "imagens/Produtos/Bolo-de-cenoura-com-chocolate.png", 
            categoria: "Bolos", 
            descricao: "Clássico bolo de cenoura com cobertura de chocolate." 
        },
        { 
            codigo: "SAL001", 
            nome: "Coxinha de Frango", 
            preco: 5.90, 
            imagem: "imagens/Produtos/coxinha-frango-requeijao.png", 
            categoria: "Salgados Fritos", 
            descricao: "Massa crocante recheada com frango desfiado temperado." 
        },
        { 
            codigo: "SAL002", 
            nome: "Bolinha de Queijo", 
            preco: 4.50, 
            imagem: "imagens/Produtos/Bolinha-de-Queijo.png", 
            categoria: "Salgados Fritos", 
            descricao: "Clássica bolinha de queijo crocante por fora e macia por dentro." 
        }
    ],
    carrinho: JSON.parse(localStorage.getItem('carrinhoPadaria')) || [],
    clientes: JSON.parse(localStorage.getItem('clientesFrequentes')) || [],
    pontosFidelidade: parseInt(localStorage.getItem('pontosFidelidade')) || 0,
    historicoVendas: JSON.parse(localStorage.getItem('historicoVendas')) || [],
    produtosMaisVendidos: JSON.parse(localStorage.getItem('produtosMaisVendidos')) || {},
    produtosFavoritos: JSON.parse(localStorage.getItem('produtosFavoritos')) || [],
    alertas: JSON.parse(localStorage.getItem('alertasPadaria')) || [], 
    historicoBusca: JSON.parse(localStorage.getItem('historicoBusca')) || []
};
const padaria = {
    nome: estadoPadaria.nomePadaria,
    contato: {
        endereco: estadoPadaria.enderecoPadaria,
        telefone: estadoPadaria.telefonePadaria,
        email: estadoPadaria.emailPadaria,
        whatsapp: CONFIG.whatsappNumber
    },
    estoque: estadoPadaria.estoque,
    produtos: estadoPadaria.produtosDisponiveis,
    clientesFrequentes: estadoPadaria.clientes,
    configuracoes: {
        moedas: CONFIG.taxasDeCambio,
        descontos: CONFIG.descontosPorQuantidade,
        pontos: CONFIG.pontosPorReal
    }
};
class FormatadorDados {
    static formatarTelefone(telefone) {
        if (!telefone) return "";
        let limpo = telefone.replace(/\D/g, "");
        if (limpo.length === 11) {
            return `(${limpo.substring(0, 2)}) ${limpo.substring(2, 7)}-${limpo.substring(7)}`;
        }
        return telefone;
    }
    static formatarMoeda(valor, moeda = "BRL", locale = "pt-BR") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: moeda
        }).format(valor);
    }
    static formatarNomeProprio(texto) {
        if (!texto) return "";
        return texto.toLowerCase().split(' ').map(word => {
            if (word.length === 0) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
    static gerarCodigoProduto(nome, id) {
        const prefixo = nome.substring(0, 3).toUpperCase();
        return `${prefixo}${id.toString().padStart(3, '0')}`;
    }
    static mensagemBoasVindas(nomeCliente) {
        const hora = new Date().getHours();
        let saudacao = "Boa noite";
        
        if (hora < 12) saudacao = "Bom dia";
        else if (hora < 18) saudacao = "Boa tarde";
        
        return `${saudacao}, ${this.formatarNomeProprio(nomeCliente)}! Bem-vindo à Padaria Soares.`;
    }

    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static validarTelefone(telefone) {
        const regex = /^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/;
        return regex.test(telefone);
    }

    static isNumero(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }

    static validarNaoVazio(texto) {
        return texto && texto.toString().trim().length > 0;
    }
    static formatarDataHora(data = new Date()) {
        return data.toLocaleDateString('pt-BR') + ' ' + 
               data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    }

    static buscarProdutos(termo, produtos) {
        if (!termo || termo.trim() === '') return [];
        const termoLower = termo.toLowerCase().trim();
        estadoPadaria.historicoBusca.unshift({
            termo: termoLower,
            data: new Date().toISOString(),
            resultados: 0
        });
        if (estadoPadaria.historicoBusca.length > 10) {
            estadoPadaria.historicoBusca.pop();
        }
        
        localStorage.setItem('historicoBusca', JSON.stringify(estadoPadaria.historicoBusca));
        
        return produtos.filter(produto => 
            produto.nome.toLowerCase().includes(termoLower) ||
            produto.descricao.toLowerCase().includes(termoLower) ||
            produto.categoria.toLowerCase().includes(termoLower) ||
            produto.codigo.toLowerCase().includes(termoLower)
        );
    }
}


class CalculadoraPedidos {
    constructor() {
        this.precoUnitario = 0;
        this.quantidade = 1;
        this.comEntrega = false;
        this.inicializarCalculadoraUI();
    }

    inicializarCalculadoraUI() {
        const precoInput = document.getElementById('calc-preco');
        const quantidadeInput = document.getElementById('calc-quantidade');
        const entregaCheckbox = document.getElementById('calc-entrega');
        const valorPagoInput = document.getElementById('calc-valor-pago');
        const btnAumentar = document.getElementById('calc-aumentar');
        const btnDiminuir = document.getElementById('calc-diminuir');
        const selectMoeda = document.getElementById('calc-moeda-destino');
        if (precoInput) {
            precoInput.addEventListener('input', (e) => {
                this.precoUnitario = parseFloat(e.target.value) || 0;
                this.atualizarCalculoEmTempoReal();
            });
        }

        if (quantidadeInput) {
            // O evento 'change' é ótimo para campos de formulário quando o valor é alterado.
            quantidadeInput.addEventListener('change', (e) => {
                this.quantidade = parseInt(e.target.value) || 1;
                this.atualizarCalculoEmTempoReal();
            });
        }

        if (entregaCheckbox) {
            entregaCheckbox.addEventListener('change', (e) => {
                this.comEntrega = e.target.checked;
                this.atualizarCalculoEmTempoReal();
            });
        }

        if (valorPagoInput) {
            valorPagoInput.addEventListener('input', () => {
                this.atualizarCalculoEmTempoReal();
            });
        }

        if (btnAumentar) {
            btnAumentar.addEventListener('click', () => {
                this.quantidade++;
                if (quantidadeInput) quantidadeInput.value = this.quantidade;
                this.atualizarCalculoEmTempoReal();
            });
        }

        if (btnDiminuir) {
            btnDiminuir.addEventListener('click', () => {
                if (this.quantidade > 1) {
                    this.quantidade--;
                    if (quantidadeInput) quantidadeInput.value = this.quantidade;
                    this.atualizarCalculoEmTempoReal();
                }
            });
        }
        if (selectMoeda) {
            selectMoeda.addEventListener('change', () => {
                this.atualizarCalculoEmTempoReal();
            });
        }

        this.vincularBotaoComprarACalculadora();
    }
    vincularBotaoComprarACalculadora() {
        document.addEventListener('click', (e) => {
            const botaoComprar = e.target.closest('.btn-comprar');
            if (botaoComprar) {
                const produtoCodigo = botaoComprar.dataset.produtoCodigo;
                const produto = estadoPadaria.produtosDisponiveis.find(p => p.codigo === produtoCodigo);
                if (produto) {
                    const precoInput = document.getElementById('calc-preco');
                    const quantidadeInput = document.getElementById('calc-quantidade'); 
                    if (precoInput) precoInput.value = produto.preco;
                    if (quantidadeInput) quantidadeInput.value = 1;
                    this.precoUnitario = produto.preco;
                    this.quantidade = 1;
                    this.atualizarCalculoEmTempoReal();
                    document.getElementById('calculadora-pedidos')?.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    }
    calcularSubtotal() {
        return this.precoUnitario * this.quantidade;
    }
    aplicarDescontoVolume() {
        let descontoPercentual = 0;
        
        for (const minQuantidade in CONFIG.descontosPorQuantidade) {
            if (this.quantidade >= parseInt(minQuantidade)) {
                descontoPercentual = Math.max(descontoPercentual, CONFIG.descontosPorQuantidade[minQuantidade]);
            }
        }
        
        return this.calcularSubtotal() * descontoPercentual;
    }
    calcularImpostos(subtotalComDesconto) {
        return subtotalComDesconto * CONFIG.taxaImposto;
    }
    calcularTaxaEntrega() {
        return this.comEntrega ? CONFIG.taxaEntrega : 0;
    }
    calcularTroco(totalPedido, valorPago) {
        const valorPagoCalculadora = valorPago !== undefined ? valorPago : (parseFloat(document.getElementById('calc-valor-pago')?.value) || 0);
        return Math.max(0, valorPagoCalculadora - totalPedido);
    }
    calcularPontosFidelidade(totalPedido) {
        return Math.floor(totalPedido * CONFIG.pontosPorReal);
    }
    converterMoeda(valorBRL, moedaAlvo) {
        if (moedaAlvo === "BRL") {
            return valorBRL;
        }
        const taxa = CONFIG.taxasDeCambio[moedaAlvo];
        if (taxa) {
            return valorBRL / taxa;
        }
        return valorBRL;
    }

    formatarMoedaConvertida(valor, moeda) {
        const simbolos = {
            'USD': 'US$',
            'EUR': '€',
            'GBP': '£'
        };
        
        return `${simbolos[moeda] || moeda} ${valor.toFixed(2)}`;
    }
    calcularTotalCompleto() {
        const subtotal = this.calcularSubtotal();
        const desconto = this.aplicarDescontoVolume();
        const subtotalComDesconto = subtotal - desconto;
        const impostos = this.calcularImpostos(subtotalComDesconto);
        const entrega = this.calcularTaxaEntrega();
        const total = subtotalComDesconto + impostos + entrega;
        const troco = this.calcularTroco(total);
        const pontos = this.calcularPontosFidelidade(total);
        return {
            subtotal,
            desconto,
            impostos,
            entrega,
            total,
            troco,
            pontos
        };
    }
    atualizarCalculoEmTempoReal() {
        const resultados = this.calcularTotalCompleto();
        this.atualizarInterfaceCalculadora(resultados);
    }
    atualizarInterfaceCalculadora(resultados) {
        const elementos = {
            'calc-subtotal': resultados.subtotal,
            'calc-desconto': resultados.desconto,
            'calc-impostos': resultados.impostos,
            'calc-entrega-valor': resultados.entrega,
            'calc-total': resultados.total,
            'calc-troco': resultados.troco
        };

        Object.entries(elementos).forEach(([id, valor]) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = FormatadorDados.formatarMoeda(valor);
            }
        });
        const pontosElement = document.getElementById('calc-pontos');
        if (pontosElement) {
            pontosElement.textContent = `${resultados.pontos} pontos`;
        }
        this.atualizarConversaoMoeda(resultados.total);
    }
    atualizarConversaoMoeda(totalBRL) {
        const selectMoeda = document.getElementById('calc-moeda-destino');
        const moeda = selectMoeda?.value || 'USD';
        const valorConvertido = this.converterMoeda(totalBRL, moeda);
        const moedaNomeElement = document.getElementById('calc-moeda-nome');
        const totalConvertidoElement = document.getElementById('calc-total-convertido');
        if (moedaNomeElement && totalConvertidoElement) {
            moedaNomeElement.textContent = moeda;
            totalConvertidoElement.textContent = this.formatarMoedaConvertida(valorConvertido, moeda);
        }
    }
}
class GerenciadorArrays {
    constructor() {
        this.produtos = estadoPadaria.produtosDisponiveis;
        this.carrinho = estadoPadaria.carrinho;
        this.clientes = estadoPadaria.clientes;
        this.historico = estadoPadaria.historicoVendas;
        this.favoritos = estadoPadaria.produtosFavoritos;
        this.ranking = estadoPadaria.produtosMaisVendidos;
        this.alertas = estadoPadaria.alertas;
    }

    adicionarAoCarrinho(produto, quantidade = 1) {
        if (estadoPadaria.estoque[produto.nome] < quantidade) {
            this.adicionarAlerta(`Estoque insuficiente para ${produto.nome}. Disponível: ${estadoPadaria.estoque[produto.nome]}`, 'erro');
            return false;
        }
        const itemExistente = this.carrinho.find(item => item.codigo === produto.codigo);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.carrinho.push({
                ...produto,
                quantidade: quantidade
            });
        }
        estadoPadaria.estoque[produto.nome] -= quantidade;
        this.adicionarAlerta(`${quantidade}x ${produto.nome} adicionado ao carrinho!`, 'sucesso');
        this.salvarEstado();
        return true;
    }
    removerDoCarrinho(codigoProduto) {
        const index = this.carrinho.findIndex(item => item.codigo === codigoProduto);
        if (index !== -1) {
            const itemRemovido = this.carrinho[index];
            estadoPadaria.estoque[itemRemovido.nome] += itemRemovido.quantidade;
            this.carrinho.splice(index, 1);
            this.adicionarAlerta(`${itemRemovido.nome} removido do carrinho.`, 'sucesso');
            this.salvarEstado();
            return true;
        }
        return false;
    }
    atualizarQuantidadeCarrinho(codigoProduto, novaQuantidade) {
        if (novaQuantidade <= 0) {
            return this.removerDoCarrinho(codigoProduto);
        }
        const item = this.carrinho.find(item => item.codigo === codigoProduto);
        if (item) {
            const diferenca = novaQuantidade - item.quantidade;
            
            if (estadoPadaria.estoque[item.nome] < diferenca) {
                this.adicionarAlerta(`Estoque insuficiente para ${item.nome}. Disponível: ${estadoPadaria.estoque[item.nome]}`, 'erro');
                return false;
            }   
            estadoPadaria.estoque[item.nome] -= diferenca;
            item.quantidade = novaQuantidade;
            this.salvarEstado();
            return true;
        }
        return false;
    }
    limparCarrinho() {
        if (confirm("Você tem certeza que deseja limpar todos os itens do carrinho?")) {
            this.carrinho.forEach(item => {
                estadoPadaria.estoque[item.nome] += item.quantidade;
            });
            this.carrinho.length = 0;
            this.adicionarAlerta("Carrinho limpo com sucesso!", 'sucesso');
            this.salvarEstado();
        } else {
            this.adicionarAlerta("A limpeza do carrinho foi cancelada.", 'info');
        }
    }
    adicionarAosFavoritos(produto) {
        const jaFavoritado = this.favoritos.find(fav => fav.codigo === produto.codigo);
        
        if (!jaFavoritado) {
            this.favoritos.push(produto);
            this.adicionarAlerta(`${produto.nome} adicionado aos favoritos! ❤️`, 'sucesso');
            this.salvarEstado();
            return true;
        } else {
            this.adicionarAlerta(`${produto.nome} já está nos favoritos!`, 'info');
            return false;
        }
    }
    removerDosFavoritos(codigoProduto) {
        const index = this.favoritos.findIndex(fav => fav.codigo === codigoProduto);
        if (index !== -1) {
            const produtoRemovido = this.favoritos[index];
            this.favoritos.splice(index, 1);
            this.adicionarAlerta(`${produtoRemovido.nome} removido dos favoritos.`, 'sucesso');
            this.salvarEstado();
            return true;
        }
        return false;
    }

    isFavorito(codigoProduto) {
        return this.favoritos.some(fav => fav.codigo === codigoProduto);
    }
    adicionarCliente(cliente) {
        if (!FormatadorDados.validarNaoVazio(cliente.nome)) {
            this.adicionarAlerta("Nome é obrigatório!", 'erro');
            return false;
        }
        if (!FormatadorDados.validarTelefone(cliente.telefone)) {
            this.adicionarAlerta("Telefone inválido!", 'erro');
            return false;
        }
        if (cliente.email && !FormatadorDados.validarEmail(cliente.email)) {
            this.adicionarAlerta("E-mail inválido!", 'erro');
            return false;
        }
        const clienteExistente = this.clientes.find(c => c.telefone === cliente.telefone);
        if (!clienteExistente) {
            this.clientes.push({
                id: Date.now(),
                nome: FormatadorDados.formatarNomeProprio(cliente.nome),
                telefone: FormatadorDados.formatarTelefone(cliente.telefone),
                email: cliente.email || '',
                pontos: 0,
                totalCompras: 0,
                dataCadastro: new Date().toISOString()
            });
            this.salvarEstado();
            this.adicionarAlerta(`Cliente ${cliente.nome} cadastrado com sucesso!`, 'sucesso');
            return true;
        }
        this.adicionarAlerta(`Cliente com telefone ${cliente.telefone} já cadastrado.`, 'aviso');
        return false;
    }
    registrarPedido(pedido) {
        const novoPedido = {
            id: `PED-${Date.now()}`,
            data: new Date().toISOString(),
            itens: [...pedido.itens],
            subtotal: pedido.subtotal,
            desconto: pedido.desconto,
            impostos: pedido.impostos,
            entrega: pedido.entrega,
            total: pedido.total,
            valorPago: pedido.valorPago,
            troco: pedido.troco,
            pontosGanhos: pedido.pontosGanhos,
            clienteId: pedido.clienteId || null
        };
        this.historico.unshift(novoPedido);
        pedido.itens.forEach(item => {
            this.ranking[item.nome] = (this.ranking[item.nome] || 0) + item.quantidade;
        });

        if (pedido.clienteId) {
            const cliente = this.clientes.find(c => c.id === pedido.clienteId);
            if (cliente) {
                cliente.pontos += pedido.pontosGanhos;
                cliente.totalCompras += pedido.total;
            }
        }
        estadoPadaria.pontosFidelidade += pedido.pontosGanhos;
        this.salvarEstado();
        this.adicionarAlerta(`Pedido ${novoPedido.id} registrado com sucesso!`, 'sucesso');
        return novoPedido.id;
    }

    getRankingVendas(limite = 10) {
        return Object.entries(this.ranking)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limite)
            .map(([nome, quantidade]) => ({ nome, quantidade }));
    }

    adicionarAlerta(mensagem, tipo = 'info') {
        this.alertas.unshift({
            id: Date.now(),
            mensagem,
            tipo,
            data: new Date().toISOString(),
            lida: false
        });
        
        if (this.alertas.length > 20) {
            this.alertas.pop();
        }
        
        this.salvarEstado();
        this.mostrarAlertaUI(mensagem, tipo);
    }

    mostrarAlertaUI(mensagem, tipo) {
        const alertasAntigos = document.querySelectorAll('.alerta-flutuante');
        alertasAntigos.forEach(alerta => alerta.remove());
        const container = document.createElement("div");
        container.className = `alerta-flutuante ${tipo}`;
        container.innerHTML = `
            <span>${mensagem}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(container);

        setTimeout(() => {
            if (container.parentElement) {
                container.style.animation = "slideOutRight 0.3s ease-in forwards";
                setTimeout(() => {
                    if (container.parentElement) {
                        container.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    salvarEstado() {
        localStorage.setItem('clientesFrequentes', JSON.stringify(this.clientes));
        localStorage.setItem('carrinhoPadaria', JSON.stringify(this.carrinho));
        localStorage.setItem('pontosFidelidade', estadoPadaria.pontosFidelidade.toString());
        localStorage.setItem('historicoVendas', JSON.stringify(this.historico));
        localStorage.setItem('produtosMaisVendidos', JSON.stringify(this.ranking));
        localStorage.setItem('produtosFavoritos', JSON.stringify(this.favoritos));
        localStorage.setItem('alertasPadaria', JSON.stringify(this.alertas));
        localStorage.setItem('historicoBusca', JSON.stringify(estadoPadaria.historicoBusca));
    }
}


class SistemaBusca {
    constructor() {
        this.resultados = [];
        this.inicializarBusca();
    }

    inicializarBusca() {
        const campoBusca = document.getElementById('campo-busca');
        const btnBuscar = document.getElementById('btn-buscar');
        const resultadosContainer = document.getElementById('resultados-busca');
        if (campoBusca && btnBuscar) {
            campoBusca.addEventListener('keyup', (e) => {
                this.realizarBusca(e.target.value);
            });
            btnBuscar.addEventListener('click', () => {
                this.realizarBusca(campoBusca.value);
            });
            document.addEventListener('click', (e) => {
                if (!campoBusca.contains(e.target) && !resultadosContainer.contains(e.target)) {
                    resultadosContainer.style.display = 'none';
                }
            });
        }
    }

    realizarBusca(termo) {
        const resultadosContainer = document.getElementById('resultados-busca');
        
        if (!termo || termo.trim() === '') {
            resultadosContainer.style.display = 'none';
            return;
        }

        this.resultados = FormatadorDados.buscarProdutos(termo, estadoPadaria.produtosDisponiveis);
        this.exibirResultados(this.resultados);
        if (estadoPadaria.historicoBusca.length > 0) {
            estadoPadaria.historicoBusca[0].resultados = this.resultados.length;
            localStorage.setItem('historicoBusca', JSON.stringify(estadoPadaria.historicoBusca));
        }
    }

    exibirResultados(resultados) {
        const container = document.getElementById('resultados-busca');
        
        if (!container) return;

        if (resultados.length === 0) {
            container.innerHTML = '<div class="sem-resultados">Nenhum produto encontrado. Tente outros termos.</div>';
            container.style.display = 'block';
            return;
        }
        container.innerHTML = resultados.map(produto => `
            <div class="resultado-item" data-produto-codigo="${produto.codigo}">
                <img src="${produto.imagem}" alt="${produto.nome}" width="50" height="50">
                <div class="resultado-info">
                    <h4>${produto.nome}</h4>
                    <p>${produto.descricao}</p>
                </div>
                <div class="resultado-preco">${FormatadorDados.formatarMoeda(produto.preco)}</div>
            </div>
        `).join('');
        container.querySelectorAll('.resultado-item').forEach(item => {
            item.addEventListener('click', () => {
                const codigo = item.dataset.produtoCodigo;
                const produto = estadoPadaria.produtosDisponiveis.find(p => p.codigo === codigo);
                if (produto) {
                    sistema.adicionarAoCarrinho(produto, 1);
                    container.style.display = 'none';
                    document.getElementById('campo-busca').value = '';
                }
            });
        });

        container.style.display = 'block';
    }
}
class SistemaPadaria {
    constructor() {
        this.calculadora = new CalculadoraPedidos();
        this.gerenciador = new GerenciadorArrays();
        this.sistemaBusca = new SistemaBusca();
        this.produtoFocadoIndex = -1; // Para navegação por teclado
        this.init();
    }

    init() {
        this.inicializarEventos();
        this.inicializarFavoritos();
        this.atualizarInterface();
        this.inicializarContadorFeedback();
        this.inicializarValidacaoCadastro();
        console.log("🚀 Sistema Padaria Soares inicializado com todas as funcionalidades!");
    }

    inicializarEventos() {
        window.addEventListener('load', () => {
            console.log("Página completamente carregada! Bem-vindo à Padaria Soares.");
            this.gerenciador.adicionarAlerta('Bem-vindo à Padaria Soares!', 'info');
        });
        
        document.addEventListener('click', (e) => {
            const botaoComprar = e.target.closest('.btn-comprar');
            if (botaoComprar) this.handleComprarClick(botaoComprar);

            const btnDetalhes = e.target.closest('.btn-detalhes');
            if (btnDetalhes) {
                const produto = estadoPadaria.produtosDisponiveis.find(p => p.codigo === btnDetalhes.dataset.produtoCodigo);
                if(produto) this.abrirModalProduto(produto);
            }
        });
        document.getElementById('btn-abrir-carrinho')?.addEventListener('click', () => this.abrirCarrinho());
        document.getElementById('btn-fechar-carrinho')?.addEventListener('click', () => this.fecharCarrinho());
        document.getElementById('btn-limpar-carrinho')?.addEventListener('click', () => this.limparCarrinho());
        document.getElementById('btn-finalizar-compra')?.addEventListener('click', () => this.finalizarCompra());
        document.getElementById('valor-pago')?.addEventListener('input', () => this.calcularTroco());
        document.getElementById('moeda-destino')?.addEventListener('change', () => this.atualizarConversaoMoeda());
        window.addEventListener('scroll', () => this.controlarBotaoTopo());
        document.querySelector('.btn-topo')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        this.inicializarEventosDeMouse();
        this.inicializarEventosDeTeclado();
        this.inicializarModals();
        this.inicializarBotoesAcao();
        this.inicializarCarrinhoEventDelegation();
    }

    handleComprarClick(botaoComprar) {
        const produtoCodigo = botaoComprar.dataset.produtoCodigo;
        let produto = estadoPadaria.produtosDisponiveis.find(p => p.codigo === produtoCodigo);
        if (produto) {
            this.adicionarAoCarrinho(produto, 1);
        } else {
            console.error("Produto não encontrado para o código:", produtoCodigo);
            this.gerenciador.adicionarAlerta("Erro: Produto não encontrado.", 'erro');
        }
    }
    
    inicializarBotoesAcao() {
        document.querySelectorAll('.btn-comprar').forEach(botao => {
            const produtoCodigo = botao.dataset.produtoCodigo;
            if(!produtoCodigo) return;

            const btnDetalhes = document.createElement('button');
            btnDetalhes.innerText = 'Ver Detalhes';
            btnDetalhes.className = 'btn btn-info btn-detalhes';
            btnDetalhes.style.marginLeft = '8px';
            btnDetalhes.dataset.produtoCodigo = produtoCodigo;
            botao.parentNode.insertBefore(btnDetalhes, botao.nextSibling);
        });
    }
    
    inicializarCarrinhoEventDelegation() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;

                const action = target.dataset.action;
                const codigo = target.dataset.codigo;
                const item = this.gerenciador.carrinho.find(i => i.codigo === codigo);

                if (!item) return;

                if (action === 'increase') {
                    this.atualizarQuantidadeCarrinho(codigo, item.quantidade + 1);
                } else if (action === 'decrease') {
                    this.atualizarQuantidadeCarrinho(codigo, item.quantidade - 1);
                } else if (action === 'remove') {
                    this.removerDoCarrinho(codigo);
                }
            });
        }
    }

    inicializarEventosDeMouse() {
        const produtosCards = document.querySelectorAll('.produto-card, .galeria-item');

        produtosCards.forEach(card => {
            const img = card.querySelector('img');
            card.addEventListener('mouseover', () => {
                card.style.transition = 'transform 0.3s, box-shadow 0.3s';
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                if (img) img.style.filter = 'brightness(1.1)';
            });
            card.addEventListener('mouseout', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                if (img) img.style.filter = 'brightness(1)';
            });
        });
    }

    inicializarEventosDeTeclado() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                const primeiroProduto = document.querySelector('.galeria-item .btn-comprar');
                if (primeiroProduto) {
                    this.handleComprarClick(primeiroProduto);
                    this.gerenciador.adicionarAlerta('Atalho! Produto adicionado ao carrinho.', 'info');
                }
            }

            if (['ArrowRight', 'ArrowLeft'].includes(e.key) && document.querySelector('.galeria-item:focus-within')) {
                 e.preventDefault();
                const galeriaItens = Array.from(document.querySelectorAll('.galeria-item'));
                const currentIndex = galeriaItens.findIndex(item => item === document.activeElement);
                let proximoIndex = currentIndex;

                if (e.key === 'ArrowRight') {
                    proximoIndex = (currentIndex + 1) % galeriaItens.length;
                } else {
                    proximoIndex = (currentIndex - 1 + galeriaItens.length) % galeriaItens.length;
                }
                
                galeriaItens[proximoIndex]?.focus();
            }
        });
    }
    
    inicializarModals() {
        document.getElementById('btn-abrir-cadastro')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.abrirModal('modal-cadastro');
        });

        document.querySelectorAll('.btn-fechar-modal').forEach(btn => {
            btn.addEventListener('click', () => this.fecharModal(btn.dataset.modal));
        });
    }
    
    abrirModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('ativo');
    }

    fecharModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('ativo');
    }

    abrirModalProduto(produto) {
        const modal = document.getElementById('modal-produto');
        if (!modal) return;

        modal.querySelector('.modal-produto-img').src = produto.imagem;
        modal.querySelector('.modal-produto-img').alt = produto.nome;
        modal.querySelector('.modal-produto-nome').textContent = produto.nome;
        modal.querySelector('.modal-produto-descricao').textContent = produto.descricao;
        modal.querySelector('.modal-produto-preco').textContent = FormatadorDados.formatarMoeda(produto.preco);
        
        const quantidadeSpan = modal.querySelector('.quantidade');
        const btnComprarModal = modal.querySelector('.btn-comprar-modal');
        let quantidade = 1;
        quantidadeSpan.textContent = quantidade;

        modal.querySelectorAll('.btn-quantidade').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                const acao = newBtn.dataset.acao;
                if (acao === 'aumentar') {
                    quantidade++;
                } else if (acao === 'diminuir' && quantidade > 1) {
                    quantidade--;
                }
                quantidadeSpan.textContent = quantidade;
            });
        });

        const newBtnComprar = btnComprarModal.cloneNode(true);
        btnComprarModal.parentNode.replaceChild(newBtnComprar, btnComprarModal);
        newBtnComprar.addEventListener('click', () => {
            this.adicionarAoCarrinho(produto, quantidade);
            this.fecharModal('modal-produto');
        });

        this.abrirModal('modal-produto');
    }

    inicializarFavoritos() {
        const btnFavoritos = document.getElementById('btn-favoritos');
        const listaFavoritos = document.getElementById('lista-favoritos');
        if (btnFavoritos && listaFavoritos) {
            btnFavoritos.addEventListener('click', (e) => {
                e.stopPropagation();
                listaFavoritos.style.display = listaFavoritos.style.display === 'none' ? 'block' : 'none';
                this.atualizarListaFavoritos();
            });
            document.addEventListener('click', () => {
                listaFavoritos.style.display = 'none';
            });
            listaFavoritos.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        this.adicionarBotoesFavorito();
    }

    adicionarBotoesFavorito() {
        document.querySelectorAll('.btn-comprar').forEach(botao => {
            const produtoCodigo = botao.dataset.produtoCodigo;
            const produto = estadoPadaria.produtosDisponiveis.find(p => p.codigo === produtoCodigo);
            
            if (produto && !botao.parentNode.querySelector('.btn-favorito')) {
                const btnFavorito = document.createElement('button');
                btnFavorito.className = 'btn-favorito';
                btnFavorito.innerHTML = this.gerenciador.isFavorito(produto.codigo) ? '❤️' : '🤍';
                btnFavorito.title = this.gerenciador.isFavorito(produto.codigo) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
                btnFavorito.style.background = 'none';
                btnFavorito.style.border = 'none';
                btnFavorito.style.fontSize = '1.2rem';
                btnFavorito.style.cursor = 'pointer';
                btnFavorito.style.marginLeft = '0.5rem';
                btnFavorito.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFavorito(produto, btnFavorito);
                });

                botao.parentNode.insertBefore(btnFavorito, botao.nextSibling);
            }
        });
    }
    
    toggleFavorito(produto, botao) {
        if (this.gerenciador.isFavorito(produto.codigo)) {
            this.gerenciador.removerDosFavoritos(produto.codigo);
            botao.innerHTML = '🤍';
            botao.title = 'Adicionar aos favoritos';
        } else {
            this.gerenciador.adicionarAosFavoritos(produto);
            botao.innerHTML = '❤️';
            botao.title = 'Remover dos favoritos';
        }
        this.atualizarContadorFavoritos();
    }

    atualizarContadorFavoritos() {
        const contador = document.getElementById('contador-favoritos');
        if (contador) {
            contador.textContent = estadoPadaria.produtosFavoritos.length;
        }
    }

    atualizarListaFavoritos() {
        const lista = document.getElementById('lista-favoritos');
        if (!lista) return;

        if (estadoPadaria.produtosFavoritos.length === 0) {
            lista.innerHTML = '<div class="favoritos-vazios">Nenhum produto favoritado</div>';
            return;
        }

        lista.innerHTML = estadoPadaria.produtosFavoritos.map(produto => `
            <div class="favorito-item">
                <img src="${produto.imagem}" alt="${produto.nome}" width="40" height="40">
                <div class="favorito-info">
                    <h5>${produto.nome}</h5>
                    <p>${FormatadorDados.formatarMoeda(produto.preco)}</p>
                </div>
                <button class="btn-remover-favorito" data-codigo="${produto.codigo}" title="Remover dos favoritos">×</button>
            </div>
        `).join('');
        lista.querySelectorAll('.btn-remover-favorito').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const codigo = btn.dataset.codigo;
                this.gerenciador.removerDosFavoritos(codigo);
                this.atualizarListaFavoritos();
                this.atualizarContadorFavoritos();
                document.querySelectorAll('.btn-favorito').forEach(bf => bf.remove());
                this.adicionarBotoesFavorito(); 
            });
        });
    }
    
    inicializarContadorFeedback() {
        const input = document.getElementById('feedback-texto');
        const display = document.getElementById('feedback-contador');
        const maxLength = 150;

        if (input && display) {
            input.addEventListener('keyup', () => {
                const contagemAtual = input.value.length;
                display.textContent = `${contagemAtual}/${maxLength}`;
                if (contagemAtual > maxLength) {
                    display.style.color = 'red';
                } else {
                    display.style.color = 'inherit';
                }
            });
        }
    }

    inicializarValidacaoCadastro() {
        const form = document.getElementById('form-cadastro'); 
        const emailInput = document.getElementById('email-cadastro');
        const senhaInput = document.getElementById('senha-cadastro');
        const erroEmail = document.getElementById('erro-email');
        const forcaSenha = document.getElementById('forca-senha');

        if (!form || !emailInput || !senhaInput) return;

        emailInput.addEventListener('keyup', () => {
            const emailValido = FormatadorDados.validarEmail(emailInput.value);
            erroEmail.style.display = emailValido ? 'none' : 'block';
            emailInput.classList.toggle('invalido', !emailValido);
        });

        senhaInput.addEventListener('keyup', () => {
            const senha = senhaInput.value;
            let forca = 0;
            if (senha.length >= 8) forca++;
            if (senha.match(/[a-z]/)) forca++;
            if (senha.match(/[A-Z]/)) forca++;
            if (senha.match(/[0-9]/)) forca++;
            if (senha.match(/[^a-zA-Z0-9]/)) forca++;

            forcaSenha.style.display = 'block';
            switch (forca) {
                case 0:
                case 1:
                case 2:
                    forcaSenha.textContent = 'Força: Fraca';
                    forcaSenha.style.color = 'red';
                    break;
                case 3:
                    forcaSenha.textContent = 'Força: Média';
                    forcaSenha.style.color = 'orange';
                    break;
                case 4:
                case 5:
                    forcaSenha.textContent = 'Força: Forte';
                    forcaSenha.style.color = 'green';
                    break;
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            const emailValido = FormatadorDados.validarEmail(emailInput.value);
            const senhaForte = senhaInput.value.length >= 8;

            if (emailValido && senhaForte) {
                this.gerenciador.adicionarAlerta('Cadastro realizado com sucesso!', 'sucesso');
                this.fecharModal('modal-cadastro');
                form.reset();
            } else {
                this.gerenciador.adicionarAlerta('Por favor, corrija os erros no formulário.', 'erro');
            }
        });
    }

    adicionarAoCarrinho(produto, quantidade) {
        if (this.gerenciador.adicionarAoCarrinho(produto, quantidade)) {
            this.atualizarInterface();
        }
    }

    removerDoCarrinho(codigoProduto) {
        if (this.gerenciador.removerDoCarrinho(codigoProduto)) {
            this.atualizarInterface();
        }
    }

    atualizarQuantidadeCarrinho(codigoProduto, novaQuantidade) {
        if (this.gerenciador.atualizarQuantidadeCarrinho(codigoProduto, novaQuantidade)) {
            this.atualizarInterface();
        }
    }

    limparCarrinho() {
        this.gerenciador.limparCarrinho();
        this.atualizarInterface();
    }

    abrirCarrinho() {
        document.getElementById('cart-sidebar')?.classList.add('ativo');
    }

    fecharCarrinho() {
        document.getElementById('cart-sidebar')?.classList.remove('ativo');
    }

    finalizarCompra() {
        if (estadoPadaria.carrinho.length === 0) {
            this.gerenciador.adicionarAlerta("Carrinho vazio! Adicione produtos antes de finalizar.", 'erro');
            return;
        }

        const calculoTotal = this.calcularTotalCarrinho();
        const valorPago = parseFloat(document.getElementById("valor-pago").value) || 0;
        if (valorPago < calculoTotal.total) {
            this.gerenciador.adicionarAlerta(`Valor pago insuficiente. Total: ${FormatadorDados.formatarMoeda(calculoTotal.total)}`, 'erro');
            return;
        }
        const pedido = {
            itens: [...estadoPadaria.carrinho],
            ...calculoTotal,
            valorPago: valorPago,
            troco: this.calcularTrocoCarrinho(),
            pontosGanhos: this.calcularPontosCarrinho()
        };
        this.gerenciador.registrarPedido(pedido);
        this.limparCarrinho();
        this.fecharCarrinho();
        document.getElementById("valor-pago").value = "0";
    }

    calcularTotalCarrinho() {
        let subtotal = 0;
        let totalItens = 0;
        estadoPadaria.carrinho.forEach(item => {
            subtotal += item.preco * item.quantidade;
            totalItens += item.quantidade;
        });
        const calculadora = new CalculadoraPedidos();
        calculadora.quantidade = totalItens;
        const subtotalParaCalculo = estadoPadaria.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        calculadora.precoUnitario = totalItens > 0 ? subtotalParaCalculo / totalItens : 0;
        const desconto = calculadora.aplicarDescontoVolume();
        const impostos = calculadora.calcularImpostos(subtotal - desconto);
        const total = (subtotal - desconto) + impostos;
        return { subtotal, desconto, impostos, entrega: 0, total };
    }

    calcularTrocoCarrinho() {
        const total = this.calcularTotalCarrinho().total;
        const valorPago = parseFloat(document.getElementById("valor-pago").value) || 0;
        return Math.max(0, valorPago - total);
    }

    calcularPontosCarrinho() {
        const total = this.calcularTotalCarrinho().total;
        return Math.floor(total * CONFIG.pontosPorReal);
    }

    calcularTroco() {
        const troco = this.calcularTrocoCarrinho();
        document.getElementById("valor-troco").textContent = FormatadorDados.formatarMoeda(troco);
    }

    atualizarConversaoMoeda() {
        const selectMoeda = document.getElementById("moeda-destino");
        const total = this.calcularTotalCarrinho().total;
        const moeda = selectMoeda.value;
        const valorConvertido = this.calculadora.converterMoeda(total, moeda);
        const simboloMoeda = { 'USD': 'US$', 'EUR': '€', 'GBP': '£' }[moeda] || 'R$';
        document.getElementById("moeda-display").textContent = moeda;
        document.getElementById("total-convertido").textContent = `${simboloMoeda} ${valorConvertido.toFixed(2)}`;
    }

    atualizarCarrinhoUI() {
        const cartItems = document.getElementById("cart-items");
        const cartCount = document.getElementById("cart-count");
        const cartSubtotal = document.getElementById("cart-subtotal");
        const cartDiscount = document.getElementById("cart-discount");
        const cartTotal = document.getElementById("cart-total");
        const loyaltyPoints = document.getElementById("loyalty-points");
        const carrinhoFlutuanteContador = document.getElementById("carrinho-flutuante-contador");
        if (!cartItems) return;

        const totalItens = estadoPadaria.carrinho.reduce((total, item) => total + item.quantidade, 0);
        if (cartCount) cartCount.textContent = `(${totalItens} ${totalItens === 1 ? 'item' : 'itens'})`;
        if (carrinhoFlutuanteContador) carrinhoFlutuanteContador.textContent = totalItens;
        
        const calculoTotal = this.calcularTotalCarrinho();
        if (cartSubtotal) cartSubtotal.textContent = FormatadorDados.formatarMoeda(calculoTotal.subtotal);
        if (cartDiscount) cartDiscount.textContent = FormatadorDados.formatarMoeda(calculoTotal.desconto);
        if (cartTotal) cartTotal.textContent = FormatadorDados.formatarMoeda(calculoTotal.total);
        if (loyaltyPoints) loyaltyPoints.textContent = `${this.calcularPontosCarrinho()} pontos`;

        if (estadoPadaria.carrinho.length === 0) {
            cartItems.innerHTML = '<p class="cart-vazio">Seu carrinho está vazio.</p>';
        } else {
            cartItems.innerHTML = estadoPadaria.carrinho.map(item => `
                <div class="cart-item">
                    <img class="cart-item-img" src="${item.imagem}" alt="${item.nome}">
                    <div class="cart-item-info">
                        <h4>${item.nome}</h4>
                        <p>${FormatadorDados.formatarMoeda(item.preco)} cada</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-quantidade" data-action="decrease" data-codigo="${item.codigo}">-</button>
                        <span class="quantidade">${item.quantidade}</span>
                        <button class="btn-quantidade" data-action="increase" data-codigo="${item.codigo}">+</button>
                        <button class="btn-remover-item" data-action="remove" data-codigo="${item.codigo}">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        this.atualizarConversaoMoeda();
        this.calcularTroco();
    }

    controlarBotaoTopo() {
        const btnTopo = document.querySelector(".btn-topo");
        if (btnTopo) {
            btnTopo.classList.toggle("visivel", window.pageYOffset > 300);
        }
    }

    atualizarInterface() {
        this.atualizarCarrinhoUI();
        this.atualizarContadorFavoritos();
    }
}

let sistema;
document.addEventListener("DOMContentLoaded", () => {
    sistema = new SistemaPadaria();
    window.sistema = sistema;
});
