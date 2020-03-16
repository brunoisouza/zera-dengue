function registrarUsuario() {

    var nome = $("#registrarNome").val();
    var email = $("#registrarEmail").val();
    var cpf = $("#registrarCpf").val();
    var senha = $("#registrarSenha").val();

    newUser(email, senha)
    .then(function(result) {
        setDadosUsuario(result.user.uid, {nome: nome, email: email, cpf: cpf, senha: senha})
        .then(function (){
            addUserLocal(result.user);
            location.replace("./zera-dengue.html");
        })
        .catch(function (error){
            console.log("Erro ao registrar novo usuário (setDadosUsuario)", error);
            toastr.error("Erro ao registrar", "Ocorreu um erro ao registrar um novo usuário.");
        });
    })
    .catch(function(error) {
        console.log("Erro ao registrar novo usuário (newUser)", error);
        toastr.error("Falha ao cadastrar", "Ocorreu um erro ao cadastrar o usuário.");
    });
}

function autenticarUsuario() {
    var email = $("#loginEmail").val();
    var senha = $("#loginSenha").val();
    authUser(email, senha)
    .then(function(result) {
        addUserLocal(result.user);
        location.replace("./zera-dengue.html");
    })
    .catch(function(error) {
        console.error("Falha ao autenticar (authUser)", error);
        toastr.error("Falha ao autenticar", "Ocorreu um erro ao autenticar o usuário.");
    });
}

function autenticarFacebook() {
    authFacebook()
    .then(function (result){
        console.log("Facebook result", result);
        setDadosUsuario(result.user.uid, {nome: result.user.displayName, email: result.user.email})
        addUserLocal(result.user);
        location.replace("./zera-dengue.html")       
    }).catch(function(error){
        console.error("Falha ao autenticar (authFacebook)", error);
        toastr.error("Falha ao autenticar", "Ocorreu um erro ao autenticar o usuário.");
    })
}

function autenticarGoogle() {
    authGoogle()
    .then(function (result){
        console.log("Google result", result);
        setDadosUsuario(result.user.uid, {nome: result.user.displayName, email: result.user.email})
        addUserLocal(result.user);
        location.replace("./zera-dengue.html")
    }).catch(function(error){
        console.error("Falha ao autenticar (authGoogle)", error);
        toastr.error("Falha ao autenticar", "Ocorreu um erro ao autenticar o usuário.");
    })    
}

function addUserLocal(user){
    var json = JSON.stringify(user);
    localStorage.setItem('user', json);
}