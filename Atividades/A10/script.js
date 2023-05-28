function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }

    var soma = 0;
    for (var i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    var resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  function mostrarInstrucoesCampo(campoId, instrucoes) {
    var campo = document.getElementById(campoId);
    var hintElement = document.createElement('span');
    hintElement.className = 'input-hint';
    hintElement.innerHTML = instrucoes;

    campo.parentNode.insertBefore(hintElement, campo.nextSibling);
  }

  function removerInstrucoesCampo(campoId) {
    var campo = document.getElementById(campoId);
    var hintElement = campo.nextSibling;

    if (hintElement && hintElement.className === 'input-hint') {
      campo.parentNode.removeChild(hintElement);
    }
  }

  function validarFormulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var senha = document.getElementById('senha').value;

    if (nome.trim() === '') {
      alert('Por favor, preencha o campo Nome.');
      return false;
    }

    if (email.trim() === '') {
      alert('Por favor, preencha o campo E-mail.');
      return false;
    }

    if (telefone.trim() === '') {
      alert('Por favor, preencha o campo Telefone.');
      return false;
    }

    if (cpf.trim() === '') {
      alert('Por favor, preencha o campo CPF.');
      return false;
    }

    if (!validarCPF(cpf)) {
      document.getElementById('cpf').classList.add('invalid-field');
      alert('CPF inválido!');
      return false;
    }

    if (senha.trim() === '') {
      alert('Por favor, preencha o campo Senha.');
      return false;
    }

    alert('Formulário enviado com sucesso!');
    return true;
  }

