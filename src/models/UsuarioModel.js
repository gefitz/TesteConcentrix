class UsuarioModel {
    constructor(usuario) {  
      this.id = usuario.id !== undefined ? usuario.id : null;
      this.nome = usuario.nome !== undefined ? usuario.nome : null;
      this.email = usuario.email !== undefined ? usuario.email : null;
      this.senha = usuario.senha !== undefined ? usuario.senha : null;
      this.rua = usuario.rua !== undefined ? usuario.rua : null;
      this.cidade = usuario.cidade !== undefined ? usuario.cidade : null;
      this.senhaHash = usuario.senhaHash !== undefined ? usuario.senhaHash : null;
      this.sobrenome = usuario.sobrenome !== undefined ? usuario.sobrenome : null;
    }
  }

module.exports = UsuarioModel;