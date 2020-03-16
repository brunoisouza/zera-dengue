$(document).ready(function() {
    bsCustomFileInput.init();
});

var usuario = getUserLocalStorage();

if (usuario == null) {
    location.replace("./index.html");
} else {
    getDadosUsuario(usuario.uid).then(function(snapshot) {
        var dados = snapshot.val();
        $("#nome").val(dados.nome);
        $("#email").val(dados.email);
        $("#cpf").val(dados.cpf);
        $("#rg").val(dados.rg);
        $("#endereco").val(dados.endereco);
        $("#telefone").val(dados.telefone);
        $("#cidade").val(dados.cidade);
        $("#bairro").val(dados.bairro);
        $("#estado").val(dados.estado);
    });

    getDadosDenuncia(usuario.uid).then(function(snapshot) {
        var denuncia = snapshot.val();
        if (denuncia) {
            $("#enderecoOcorrencia").val(denuncia.enderecoOcorrencia);
            if (denuncia && denuncia.arquivoImagemFocoDengue) {
                $("#imagemFocoDengue").attr(
                    "src",
                    denuncia.arquivoImagemFocoDengue
                );
            }
            $("#descricaoOcorrencia").val(denuncia.descricaoOcorrencia);
        }
    });
}

function trocarImagemFocoDengue() {
    var reader = new FileReader();

    reader.onload = function(img) {
        $("#imagemFocoDengue").attr("src", img.target.result);
    };
    reader.readAsDataURL($("#arquivoImagemFocoDengue")[0].files[0]);
}

function SelecionarTabDenuncia() {
    $("#denuncia-tab").click();
}

function SelecionarTabMosquito() {
    $("#mosquito-tab").click();
}

function SelecionarTabSintomas() {
    $("#sintomas-tab").click();
}

function salvarDadosUsuario() {
    var dadosUsuario = {
        nome: $("#nome").val(),
        email: $("#email").val(),
        cpf: $("#cpf").val(),
        rg: $("#rg").val(),
        endereco: $("#endereco").val(),
        telefone: $("#telefone").val(),
        cidade: $("#cidade").val(),
        bairro: $("#bairro").val(),
        estado: $("#estado").val()
    };

    if (usuario == null) {
        location.replace("./index.html");
    } else {
        setDadosUsuario(usuario.uid, dadosUsuario);
        toastr.success("Atualizado com sucesso!", "Dados do usuário");
    }
}

function salvarDenuncia() {
    var file = $("#arquivoImagemFocoDengue")[0].files[0];

    var dadosDenuncia = {
        enderecoOcorrencia: $("#enderecoOcorrencia").val(),
        descricaoOcorrencia: $("#descricaoOcorrencia").val(),
        arquivoImagemFocoDengue: ""
    };

    if (usuario == null) {
        location.replace("./index.html");
    } else {
        var uploadTask = uploadImagemFocoDengue(file);

        uploadTask.on(
            "state_changed",
            function(snapshot) {
                var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                $("#progressUploader").width(progress + "%");
                $("#progressUploader").attr("aria-valuenow", progress);
            },
            function(error) {
                console.log("error", error);
            },
            function() {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(function(downloadURL) {
                        dadosDenuncia.arquivoImagemFocoDengue = downloadURL;
                        setDenuncia(usuario.uid, dadosDenuncia);
                        toastr.success("Atualizada com sucesso!", "Denúcia");
                        $("#progressUploader").width(0 + "%");
                        $("#progressUploader").attr("aria-valuenow", 0);
                    });
            }
        );
    }
}

function sair(){
    removeUserLocalStorage();
    location.replace("./index.html");
}