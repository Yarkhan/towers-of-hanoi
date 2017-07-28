## Candidato: Ronilson Amorim de Sousa
## Teste selecionado: 2(Difícil) - Torres de hanoi

Linguagem Escolhida: NodeJS / Javascript

Dependências:
- NodeJS v8.1.2
- NPM
- Mocha (para testes)
- Browser atualizado (para visualização)


## Rodando o programa
No terminal utilize o comando `npm start`. O programa lerá os dados iniciais das
hastes no arquivo `src/config` e em seguida perguntará para qual haste deve mover
os discos.

Ao concluir, o programa mostrará no console quais os passos necessários para resolver
o quebra cabeça, e salvará uma animação mostrando os passos em `src/view/index.html`,
que você pode abrir no browser para ver a solução sendo executada.

O arquivo de configuração segue o mesmo formato indicado no teste, e vem da seguinte
 maneira:
```
A-4:2
B-
C-3:1
```
## Rodando os testes
Antes de executar os testes é necessário que o Mocha esteja instalado.
Abra um terminal no diretório base e rode o comando `npm install` ou
`yarn install` se o Yarn estiver instalado. Este comando instalará o Mocha para
realizar os testes.

Após isto, basta digitar `npm test` para rodar os testes
