<h3><b>Sobre o projeto</b></h3>

A aplicação Free Wallet conta com um projeto de Back-End (api em que estamos) e um projeto de Front-End em React, que se encontra na sessão "Links" desse Readme. Essa aplicação tem como objetivo permitir ao usuário tem um controle simples e objetivo sobre créditos e débitos realizados diariamente.

<h3><b>Build</b></h3>
<ol>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>
<p>A inicialização do projeto com o comando 'npm run dev' irá criar na pasta raiz do projeto um arquivo .sqlite, e irá executar um INSERT de alguns dados default em uma das models (TransactionCategory). A secret do JWT está disponível no arquivo nodemon.js como uma variável de ambiente (afim de testes locais ela está setada com um valor padrão, mas pode ser alterada diretamente nesse arquivo)</p>
<p>É importante saber que atualmente o projeto seta a porta 3000 para o localhost, para consumir a API no <a href="https://github.com/calvinsteixeira/free-wallet-frontend">projeto de Front-End</a>, é importante manter essa porta, caso ela tenha seu valor alterado, o <a href="https://github.com/calvinsteixeira/free-wallet-frontend">projeto de Front-End</a> também precisa ter os paths das chamadas alterados.</p>

<h3><b>Features</b></h3>
<ul>
  <li>Adicionar transações pelo seu tipo (crédito ou débito), descrição, valor e data em que foi realizada.</li>
  <li>Alterar transações pela sua descrição, valor e data em que foi realizada.</li>
  <li>Remover transações</li>
  <li>Buscar transações pela sua data</li>
  <li>Visualizar histórico de transações</li>
  <li>Visualizar o valor atual da carteira (diferença entre créditos e débitos, como um balance)</li>
</ul>

<h3><b>Principais tecnologias, técnicas e bibliotecas usadas</b></h3>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>Sqlite</li>
  <li>Sequelize</li>
  <li>JWT</li>
  <li>bcrypt</li>
  <li>Axios</li>
</ul>

<h3><b>Links Extras</b></h3>
// <a href="https://github.com/calvinsteixeira/free-wallet-frontend">Projeto Free Wallet (Back-end API)</a>
