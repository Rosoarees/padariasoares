

PROJETO: Prática 11 Padaria Soares - Website Interativo da Padaria Soares

PADARIA SOARES - SISTEMA WEB

PROJETO DA PADARIA SOARES

ESTRUTURA DO PROJETO

padaria-soares/
│
├── index.html                
├── contato.html              
├── pedidos.html              
├── feedback.html             
├── cadastro.html            
│
├── css/
│   ├── style.css            
│         
│
├── js/
│   └── script.js -          
│
├── imagens/
   ├── Logo/
   │   └── Padaria-Soares.png
   ├── RedesSociais/
   │   └── WhatsApp.png
   ├── Cliente
   |   └── Foto    
   ├── Ambiente/
   │   └── Interior-da-Padaria.png
   |── Teste.html
   |     └── teste.html
   |
   └── Produtos/
       ├── pao-frances-crocante.png
       ├── Pão-de-leite-macio.png
       ├── Pão-Integral-Graos.png
       ├── Ciabatta-com-Alecrim.png
       ├── Focaccia-de-Tomate-Seco.png
       ├── Bolo-de-Fuba-com-Goiabada.png
       ├── Bolo-de-cenoura-com-chocolate.png
       ├── Torta-Holandesa.png
       ├── Brigadeiro-Gourmet.png
       ├── Sonho-de-Creme.png
       ├── coxinha-frango-requeijao.png
       ├── Bolinha-de-Queijo.png
       ├── Empada-de-palmito.png
       ├── Esfiha-de-carne.png
       ├── Quiche-lorraine.png
       ├── Fatia-de-bolo-de-chocolate.png
       └── Croissants-dourados-e-folhados-em-um-prato-branco.png




Este projeto consiste na criação de uma página web completa e interativa para a "Padaria Soares". O objetivo foi desenvolver uma aplicação front-end robusta, utilizando apenas HTML, CSS e JavaScript puros, para simular uma experiência de e-commerce real, desde a visualização de produtos até a finalização de um pedido.

Foi aplicado a manipulação de eventos em JavaScript

Funcionalidades Implementadas

Sistema de Carrinho de Compras
Adição de Itens: Usuários podem adicionar produtos ao carrinho diretamente das tabelas do cardápio ou da galeria de produtos.
Sidebar Interativa: O carrinho é exibido em uma barra lateral (sidebar) que pode ser aberta e fechada, mostrando todos os itens, quantidades e o subtotal.
Gerenciamento de Itens: É possível aumentar, diminuir ou remover a quantidade de cada item diretamente no carrinho.
Cálculos em Tempo Real: O subtotal, descontos por volume, impostos e o total do pedido são recalculados automaticamente a cada alteração.
Persistência de Dados: O conteúdo do carrinho é salvo no `localStorage` do navegador, permitindo que o usuário feche a página e não perca seus itens selecionados.
Eventos Otimizados: A manipulação dos eventos do carrinho (aumentar, diminuir, remover) foi implementada com a técnica de Delegação de Eventos Event Delegation, resultando em um código mais limpo e performático, sem a necessidade de múltiplos onclick no HTML.

Interatividade com Eventos de Mouse e Teclado
Eventos de Mouse mouseover mouseout:
Feedback Visual: Ao passar o mouse sobre os cards de produtos, uma leve animação de zoom e uma sombra são aplicadas para destacar o item.
Informações Adicionais: Uma sobreposição com informações extras (ex: "Feito com fermentação natural") aparece sobre a imagem do produto durante o hover.
Eventos de Teclado keyup keydown:
Contador de Caracteres: Na seção de feedback, um contador é atualizado em tempo real keyup para mostrar ao usuário quantos caracteres ele já digitou.
Validação de Formulário: O formulário de cadastro valida o formato do e-mail e a força da senha em tempo real keyup, fornecendo feedback imediato.
Navegação Acessível: É possível navegar entre os produtos da galeria utilizando as teclas de seta (esquerda e direita).
Busca Dinâmica: A barra de busca filtra os produtos à medida que o usuário digita keyup.

Formulários com Validação Avançada
Modal de Cadastro: Um modal foi criado para o formulário de cadastro de novos clientes.
Validação em Tempo Real: O JavaScript valida os campos de e-mail e senha sem a necessidade de submeter o formulário, melhorando a experiência do usuário.
Feedback de Senha: Um indicador visual mostra a força da senha (fraca, média ou forte) conforme o usuário digita.

Recursos Adicionais
Calculadora de Pedidos: Uma seção dedicada permite que o usuário simule o custo de um pedido, calculando descontos, impostos e até mesmo o troco.
Busca de Produtos: Uma barra de busca funcional permite encontrar produtos por nome, categoria ou descrição.
Sistema de Favoritos: O usuário pode marcar produtos como favoritos, e essa lista é salva no localStorage e pode ser visualizada em um menu flutuante.
Notificações: Alertas do tipo toast são exibidos no canto da tela para fornecer feedback sobre ações, como Produto adicionado ao carrinho.
Design Responsivo: A interface se adapta a diferentes tamanhos de tela desktop, tablets e smartphones usando CSS Media Queries.

HTML5: Utilizado para estruturar todo o conteúdo da página de forma semântica (`<header>`, `<nav>`, `<main>`, `<section>`, `<table>`, `<article>`, etc.).
CSS3: Responsável por toda a estilização, layout (Flexbox e Grid), responsividade e animações.
JavaScript: Utilizado para toda a lógica e interatividade da aplicação, incluindo:
Manipulação do DOM (Document Object Model).
Gerenciamento de eventos (clicks, hovers, digitação).
Programação Orientada a Objetos (uso de Classes para organizar o código).
Manipulação de `localStorage` para persistência de dados.


Ronaldo Soares Pinto
Pratica11_Ronaldo_Soares_Pinto_Turma03377.zip
Entrega: 06/11/2024
