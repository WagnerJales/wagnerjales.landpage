# Pacote: homepage 3D (maquete urbana)

Substitui a homepage de www.wagnerjales.com.br pela cidade 3D. Nada foi enviado ao repositório; este pacote é para você copiar.

## Como aplicar (raiz do repositório wagnerjales.landpage)
1. Copie **todo o conteúdo** desta pasta para a raiz do repositório, aceitando sobrescrever `index.html`, `index-en.html` e `index-es.html`.
2. `git add -A && git commit -m "Homepage 3D" && git push`
3. Aguarde o GitHub Pages publicar (1 a 3 minutos) e teste com Ctrl+F5.

## O que muda
- `index.html`: cidade 3D (3 idiomas no próprio seletor PT/EN/ES, preferência salva no navegador).
- `index-en.html`, `index-es.html`: viram redirecionadores que já abrem a página no idioma certo.
- `assets/`: pasta nova com fotos, logos e portfólio usados pela cidade (não colide com nada existente).
- `index-antigo.html`, `index-en-antigo.html`, `index-es-antigo.html`: cópias das páginas originais, caso queira voltar.
- Links de outras páginas do site (`index.html#sobre`, `#servicos`, `#portfolio`, `#clientes`, `#entrevistas`, `#contato`) abrem o distrito correspondente.

## Para reverter
Renomeie `index-antigo.html` para `index.html` (e os `-en`/`-es` antigos da mesma forma).

## Pendências conhecidas (honestas)
- Blog mostra 9 de ~19 posts; os demais ficam em blog.html (há botão para a página completa).
- Nome do arquivo de foto: usa `assets/perfil.jpg` (a original do site é `perfil.png`).
- Não testado em celular real com GPU; testado em Chromium com WebGL por software.
- O `sitemap.xml` e o JSON-LD não foram revisados para a nova página.
- Sem WebGL, a página cai numa versão simples empilhada, com o mesmo conteúdo.
