<!DOCTYPE html>
<html lang="pt-BR">
<body>

<h1>API em Node.js para Armazenamento de Usuários</h1>

<p>Nesta API, é possível realizar operações de <strong>GET</strong>, <strong>POST</strong>, <strong>PUT</strong> e <strong>DELETE</strong> para gerenciar usuários. Todos os endpoints requerem um <strong>token</strong> de acesso enviado no <strong>header</strong> com o nome <code>authorization</code>.</p>

<hr>

<h2>GET</h2>

<h3>Retornar Todos os Usuários</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios</code></li>
    <li><strong>Requer:</strong> Token no header com o nome <code>authorization</code>.</li>
    <li><strong>Resposta:</strong> Retorna um JSON com a lista de usuários contendo as seguintes propriedades:</li>
</ul>
<pre>
[
    {
        "id": int,
        "nome": "string",
        "email": "string",
        "sobrenome": "string",
        "rua": "string",
        "cidade": "string"
    }
]
</pre>

<h3>Retornar Usuário por ID</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios/:id</code></li>
    <li><strong>Requer:</strong> Token no header com o nome <code>authorization</code>.</li>
    <li><strong>Resposta:</strong> Retorna um JSON com o usuário correspondente ao ID fornecido, seguindo o mesmo formato da resposta anterior.</li>
</ul>

<hr>

<h2>POST</h2>

<h3>Cadastrar Usuário</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios/cadastrar</code></li>
    <li><strong>Requisição:</strong> Deve ser enviado um JSON com as seguintes propriedades:</li>
</ul>
<pre>
{
    "nome": "string",
    "email": "string",
    "sobrenome": "string",
    "senha": "string",
    "rua": "string",
    "cidade": "string"
}
</pre>
<ul>
    <li><strong>Resposta:</strong> Retorna uma mensagem de sucesso e um token para acessar os outros métodos.</li>
</ul>

<h3>Login de Usuário</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios/login</code></li>
    <li><strong>Requisição:</strong> Deve ser enviado um JSON com:</li>
</ul>
<pre>
{
    "sobrenome": "string",
    "senha": "string"
}
</pre>
<ul>
    <li><strong>Resposta:</strong> Retorna uma mensagem de sucesso e um token de acesso.</li>
</ul>

<hr>

<h2>PUT</h2>

<h3>Atualizar Usuário</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios/:id</code></li>
    <li><strong>Requisição:</strong> Enviar um JSON com as seguintes propriedades:</li>
</ul>
<pre>
{
    "nome": "string",
    "email": "string",
    "sobrenome": "string",
    "senha": "string",
    "rua": "string",
    "cidade": "string"
}
</pre>
<ul>
    <li><strong>Requer:</strong> Token no header com o nome <code>authorization</code>.</li>
    <li><strong>Resposta:</strong> Retorna uma mensagem de sucesso.</li>
</ul>

<hr>

<h2>DELETE</h2>

<h3>Deletar Usuário</h3>
<ul>
    <li><strong>Endpoint:</strong> <code>localhost:3000/api/usuarios/:id</code></li>
    <li><strong>Requer:</strong> Token no header com o nome <code>authorization</code>.</li>
    <li><strong>Resposta:</strong> Retorna uma mensagem de sucesso.</li>
</ul>

</body>
</html>
