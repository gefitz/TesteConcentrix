const {db} = require('../confg/db');
const bcrypt = require('bcrypt')
const model = require('../models/UsuarioModel');
const UsuarioModel = require('../models/UsuarioModel');
const { json } = require('sequelize');

exports.getAllUsuarios = async() => {
    const [rows] = await db.query('SELECT id,nome, email, sobrenome, rua, cidade FROM Usuarios');
    return rows;
}

exports.getUsuarioByid = async(id) =>{
    const [rows] = await db.query('SELECT id,nome, email, sobrenome, rua, cidade FROM Usuarios where id = ?',[id]);
    return rows;
}

exports.putUsuario = async(usuario)=>{
    let usuarioModel =new UsuarioModel(usuario);
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(usuario.senha, saltRounds);
    usuario.senhaHash = senhaHash
        // Atualiza os dados do usuário no banco de dados
        const [result] = await db.query(
            `UPDATE Usuarios SET 
              nome = COALESCE(?, nome), 
              email = COALESCE(?, email), 
              senhaHash = COALESCE(?, senhaHash), 
              sobrenome = COALESCE(?, sobrenome), 
              cidade = COALESCE(?, cidade), 
              rua = COALESCE(?, rua) 
            WHERE id = ?`,
            [
                usuarioModel.nome, 
                usuarioModel.email, 
                usuarioModel.senhaHash, 
                usuarioModel.sobrenome, 
                usuarioModel.cidade, 
                usuarioModel.rua, 
                usuarioModel.id
            ]
          );
}

exports.createUsuario = async(usuario) => {

    let usuarioModel = new UsuarioModel(usuario);
    console.log(usuarioModel);
    // Gerar hash da senha com salt incorporado
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(usuarioModel.senha, saltRounds);
    usuarioModel.senhaHash = senhaHash
    // Inserir usuário no banco de dados
    const [result] = await db.query(
      'INSERT INTO Usuarios (nome, email, senhaHash, sobrenome, rua, cidade) ' +
      'VALUES (?, ?, ?, ?, ?, ?)',
      [usuarioModel.nome, usuarioModel.email, usuarioModel.senhaHash, usuarioModel.sobrenome, usuarioModel.rua, usuarioModel.cidade]
    );

    // Retornar o ID inserido e os dados do usuário
    return { id: result.insertId, usuario };
}

exports.deleteUsuario = async(id) =>{
    const result = await db.execute('Delete from Usuarios where id = ?',[id]);
    return result;
}

exports.vereficaUsuario = async(usuario) =>{
    const {nome, email, senha, sobrenome, rua, cidade} = usuario;
    // Verificar se o usuário já existe
    const [existingUser] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return true;
    }
    return false;
}

exports.login = async(login)=>{
    const { email, senha } = login;

      // Busca  usuário
      const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  
      const usuario = usuarios[0];
      // Verificar senha
      const match = await bcrypt.compare(senha, usuario.senhaHash);
      if (!match) {
        return false
      }
      return usuario
}