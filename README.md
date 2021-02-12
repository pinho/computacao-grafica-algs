# matrizes-js

Criar e manipular grades de elementos HTML no DOM simulando matrizes de pixels
no navegador usando JavaScript.

## Usage

Crie um arquivo HTML básico e referencie/inclua o arquivo `matrizes.js`.
Crie um elemento no DOM para ser usado como o elemento base para adição dos
elementos de pixels.

```html
<!doctype html>
<html lang="pt-br">
  <head>
    <title>Matrizes.js</title>
  <head>
  <body>
    <div id="root"></div>

    <!-- É sempre uma boa prática adicionar scripts no fim do documento -->
    <script src="matrizes.js"></script>
    <script>
      // Seu código aqui ...
    </script>
  </body>
</html>
```

### Criando uma matriz

Dentro da tag `<script>`, depois da tag que referencia o arquivo `matrizes.js`:

```js
// Cria um elemento "div" no DOM dentro da div#root com display grid e com
// componentes div menores organizado em linhas e colunas. Retorna um objeto
// Matrix que possui uma matriz (array de arrays) com todos os elementos
// menores (do tipo HTMLElement).
const matriz = new Matrix(30, 30, document.getElementById("root"));

// Pinta de preto o elemento div nas coordenadas (x=10, y=10)
matriz.paint(10, 10);
```

---

OBS: Biblioteca em desenvolvimento
