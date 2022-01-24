var db = openDatabase('dbUsers', '1.0', 'usuarios', 2*1024*1024)

db.transaction(function(tx){
  tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios(ID PRIMARY KEY, name TEXT, email TEXT, senha TEXT)')
})

function redirect() {
  window.location.href= "/src/lista.html"
}

function interestelarRedirect() {
  window.location.href= "/src/interestelar.html"
}

function vinciCodeRedirect() {
  window.location.href= "/src/vinciCode.html"
}

function redirectLogin() {
  window.location.href= "/src/index.html"
}

function redirectSobre() {
  window.location.href= "/src/sobre.html"
}

function redirectCadastro() {
  window.location.href= "/src/cadastro.html"
}

function validarCampos() {
  if(!document.getElementById("name").value) return 'O Campo nome precisa ser preenchido'
  
  if(!document.getElementById("email").value) return 'O Campo Email precisa ser preenchido'

  if(!document.getElementById("password").value) return 'O Campo Senha precisa ser preenchido'

  return null
}

function validarLogin() {
  if(!document.getElementById("emailLogin").value) return 'O Campo Email precisa ser preenchido'

  if(!document.getElementById("passwordLogin").value) return 'O Campo Senha precisa ser preenchido'

  return null
}

async function cadastrar() {
  const messageError = validarCampos()

  if(!messageError) {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    await db.transaction(function(tx){
      tx.executeSql('INSERT INTO usuarios (name, email, senha) VALUES (?,?,?)',[name, email, password])
    })

    redirectLogin()
  } else {
    document.getElementById("alert").innerHTML= messageError;
  }
  
}

async function logar() {
  const email = document.getElementById("emailLogin").value
  const password = document.getElementById("passwordLogin").value
  
  const messageError = validarLogin()

  if(!messageError) {
    try {
      await db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios', [], function(tx, resultado){
          var users = resultado.rows
          for(const user of users) {
            if (user.email == email && user.senha == password) {
              redirect()
            }
          }
        })
      })
    } catch(error) {
      console.log(error)
    }
  } else {
    document.getElementById("alert-logar").innerHTML= messageError;
  }
}