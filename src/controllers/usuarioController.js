const UsuarioService = require('../Services/UsuarioService');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/UsuarioModel');

//GETALL
exports.getAllUsuarios = async(req,res) =>{
    try{
        
        const usuarios = await UsuarioService.getAllUsuarios();
        res.json(usuarios);
    }catch (error){
        res.status(500).json({mensagem: error.message});
    }
}

//GET usurios/id
exports.getUsuarioByid = async(req, res) =>{
    try{
        const id =  req.params.id
        const usuario = await UsuarioService.getUsuarioByid(id);
        res.json(usuario);

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//PUT
exports.putUsuario = async(req,res) =>{
    try{
        const ret = await UsuarioService.putUsuario(req.body)
        res.status(201).json({ mensagem: 'Usuário atualizado com sucesso', ret });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

//POST
exports.createUsuario = async (req,res) =>{
    try{
        if(await UsuarioService.vereficaUsuario(req.body)){
            return res.status(400).json({ mensagem: 'Usuário já existe' })
        }
        const result = await UsuarioService.createUsuario(req.body);
         // Gerar JWT
        const token = jwt.sign(
        { id: result.insertId},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.status(201).json({ mensagem: 'Usuário registrado com sucesso', token });
    }catch(error){
        res.status(400).json({mensagem: error.message});
    }
}

//DELETE
exports.deleteUsuario = async(req,res) =>{
    try{
        const id = req.params.id;
        const result = UsuarioService.deleteUsuario(id)
        // Verifica se algum registro foi afetado
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Retorna uma mensagem de sucesso
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Login de usuário
exports.login = async (req, res) => {
    try {

        const usuario = await UsuarioService.login(req.body);
        if(!usuario) return res.status(400).json({message:"Senha incorreta"});
      // Gerar JWT
      const token =  jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.status(200).json({ mensagem: 'Login bem-sucedido', token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};
