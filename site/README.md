# Site de apresentação do projeto

Os algoritmos de computação gráfica implementados em JavaScript foram 
organizados para serem apresentados em páginas HTML interativas.
Para abrir o site é necessário clonar esse repositório e abrir os arquivos HTML
localmente no navegador. Sendo assim, siga os seguintes passos:

1. Clonar o repositório:

```console
git clone https://github.com/pinho/matrizes-js.git
cd matrizes-js
```

Ou baixe o repositório em formato `.zip`.

2. Abrir a página inicial:

Pode ser feito abrindo o navegador da sua preferência e navegando até o caminho
do arquivo `index.html` no seu PC, a maioria dos navegadores aceitam no campo de
URL algo como `file://<CAMINHO-PARA-O-ARQUIVO>`, ou mesmo através do terminal, 
usando:

```sh
firefox site/index.html
# ou
google-chrome site/index.html
```

Uma alternativa é usar o pacote `http-server` do Node, e iniciar o site como um
servidor escutando em uma porta.

```sh
# Instalar o http-server (preciser ter o node instalado)
npm install -g http-server

# Iniciar o server
cd matrizes-js
http-server site
```

Agora é só abrir o navegador e acessar `http://localhost:8080` e ser feliz :)

