# Fluxo de desenvolvimento dos algoritmos

Vários algoritmos de computação gráfica devem ser impementados para a conclusão
do trabalho, a idéia é organizar o projeto todo como um site em HTML, CSS e JS
puros, portanto uma estrutura de diretórios foi criada para conter os arquivos
do "site". O diretório `html` contém o arquivo `index.html` (página inicial do
site) além das outras páginas organizadas em subdiretórios. A estrutura de 
diretórios do site será parecida com:

```text
site
|___css
|   |___global.css
|
|___html
|   |___index.html
|   |___algorithms
|       |___bresenham.html
|       |___circle.html
|       |___elipse.html
|       |___ ...
|       |___ ...
|       |___ ...
|       |___curves.html
|
|___js
    |___bresenham.js
    |___bezierCurve.js
    |___ ...
    |___ ...
```

## Desenvolvimento das páginas

Toda página deve obedecer a estrutura de diretórios e estar contida no diretório
`./html/algorithms` para todas as páginas HTML que irão mostrar os resultados de
um dos algoritmos.

A página deverá obedecer um template HTML que será através do Github Releases.

A estilização deverá ser padronizada, o arquivo CSS com as definições de classes
e estilo deve ser criado e adicionado ao diretório `css`.

## Desenvolvimento dos algoritmos

Os algoritmos de computação gráfica (como o Bresenham, Curvas de Bezier, etc)
são desenvolvidos em JavaScript e deveram ser colocados em um diretório
específico chamado `js`. Cada algoritmo deve ser implementado em um único
arquivo fonte JavaScript (`.js`).

Deve-se usar funções contrutoras para simular o estilo de programação orientação
a objetos e manter o código padronizado e o mais legível possível. Por exemplo

```js
// priorizar
const x = new Point(2, 3);

// ao invés de 
const x = {x: 2, y: 3}
```

