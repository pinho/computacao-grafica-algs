# Fluxo de desenvolvimento dos algoritmos

- [Diretórios](#Diretórios)
- [Desenvolvimento das páginas](#Desenvolvimento-das-páginas)
- [Desenvolvimento dos algoritmos](#Desenvolvimento-das-algoritmos)

Vários algoritmos de computação gráfica devem ser impementados para a conclusão
do trabalho, a idéia é organizar o projeto todo como um site em HTML, CSS e JS
puros, portanto uma estrutura de diretórios foi criada para conter os arquivos
do "site". O diretório `site` contém o arquivo `index.html` (página inicial do
site) além das outras páginas organizadas em subdiretórios. 

## Diretórios

Os diretórios e suas funções são os seguintes:

* `css`: contém arquivos de estilo em CSS;
* `fonts`: contém arquivos de fontes, como os formatos `.ttf` ou `.otf`;
* `algorithms`: contém as páginas de interação e apresentação do resultado de
algoritmos implementados, as páginas são organizadas em subdiretórios.
* `js`: contém os arquivos de código-fonte JavaScript com as implementações dos
algoritmos de computação gráfica.

A estrutura de diretórios do site deve sempre se manter parecida com:

```raw
site
├── algorithms
│   ├── bresenham
│   │   └── index.html
│   ├── <algoritmoA>
│   │   └── index.html
│   └── <algoritmoB>
│       └── index.html
├── css
│   └── global.css
├── fonts
│   └── Pixelmania.ttf
├── index.html
└── js
    ├── bresenham.js
    ├── <algoritmoA>.js
    ├── <algoritmoB>.js
    ├── <algoritmoC>.js
    └── matrizes.js
```

## Desenvolvimento das páginas

### HTML
Toda página que irá mostrar resultados de algoritmos com a matiz de pixels
deverá obedecer um template HTML para que fiquem padronizadas. 

Toda página deve obedecer a estrutura de diretórios e estar contida no diretório
`./algorithms`. Um subdiretório com o nome do algoritmo deve ser criado e um
arquivo `index.html` deve ser criado dentro dele.

### CSS
A estilização deverá ser padronizada, o arquivo CSS com as definições de classes
e estilo deve ser criado e adicionado ao diretório `css`. Manter os arquivos
HTML com uma quantidade mínima de código CSS nas tags `<style>`.

## Desenvolvimento dos algoritmos

### JS
Os algoritmos de computação gráfica (como o Bresenham, Curvas de Bezier, etc)
são desenvolvidos em JavaScript e deverão ser colocados em um diretório
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

