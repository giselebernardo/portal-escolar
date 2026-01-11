//Banco de Dados Local
let dadosEscola = JSON.parse(localStorage.getItem('banco_dados')) || [];

//Navegação
function navegarPara(idTela) {
    document.querySelectorAll('.tela-secao').forEach(el => el.classList.remove('ativa'));
    document.getElementById(idTela).classList.add('ativa');
}

function voltarInicio() {
    navegarPara('tela-login');
    //Limpa os campos de senha por segurança
    const senhaProf = document.getElementById('senhaProfessor');
    const senhaAluno = document.getElementById('loginAlunoSenha');
    const nomeAluno = document.getElementById('loginAlunoNome');

    if(senhaProf) senhaProf.value = '';
    if(senhaAluno) senhaAluno.value = '';
    if(nomeAluno) nomeAluno.value = '';
}

//Mostra a data na tela de início
const dataHoje = new Date();
const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('dataAtual').innerText = dataHoje.toLocaleDateString('pt-BR', opcoes);

//Lógica do Login de Professor
function entrarComoProfessor() {
    const senhaDigitada = document.getElementById('senhaProfessor').value;
    if (senhaDigitada === "admin123") {
        atualizarTabelaProfessor();
        navegarPara('tela-painel-prof');
    } else {
        alert("Senha Incorreta!");
    }
}

function salvarNota() {
    const nome = document.getElementById('campoNome').value.trim();
    const senhaAluno = document.getElementById('campoSenha').value.trim();
    const disciplina = document.getElementById('campoDisc').value.trim();
    
    const n1 = parseFloat(document.getElementById('campoN1').value);
    const n2 = parseFloat(document.getElementById('campoN2').value);
    const n3 = parseFloat(document.getElementById('campoN3').value);
    const n4 = parseFloat(document.getElementById('campoN4').value);
    const freq = parseInt(document.getElementById('campoFreq').value);

    if (!isNaN(disciplina) && disciplina !== "") {
        alert("O nome da disciplina não pode ser apenas números! Digite o nome da matéria (ex: Matemática).");
        return;
    }

    //Verifica se os campos estão preenchidos corretamente
    if (!nome || !senhaAluno || !disciplina || isNaN(n1) || isNaN(n2) || isNaN(n3) || isNaN(n4) || isNaN(freq)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    //Notas inválidas
    if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10 || n4 < 0 || n4 > 10) {
        alert("As notas devem ser entre 0 e 10!");
        return;
    }

    //Frequência inválida
    if (freq < 0 || freq > 100) {
        alert("A frequência deve ser entre 0% e 100%!");
        return;
    }

    //Verifica se já existe esse aluno e disciplina cadastrado
    const jaExiste = dadosEscola.some(dado => 
        dado.nome.toLowerCase() === nome.toLowerCase() && 
        dado.disciplina.toLowerCase() === disciplina.toLowerCase()
    );
    if (jaExiste) {
        alert(`O aluno(a) ${nome} já possui nota cadastrada em ${disciplina}!\nPara alterar, exclua o registro anterior primeiro.`);
        return;
    }

    //Calcula a média
    const media = ((n1 + n2 + n3 + n4) / 4).toFixed(1);
    
    let situacao = "";
    
    if (freq < 75) {
        situacao = "Reprovado (Falta)";
    } else if (media >= 7) {
        situacao = "Aprovado";
    } else if (media >= 5) {
        situacao = "Recuperação";
    } else {
        situacao = "Reprovado (Nota)";
    }

    const novoRegistro = {
        id: Date.now(),
        nome,
        senha: senhaAluno,
        disciplina, n1, n2, n3, n4, media, freq, situacao
    };

    dadosEscola.push(novoRegistro);
    salvarDadosLocais();
    atualizarTabelaProfessor();

    //Limpa os campos após salvar
    document.getElementById('campoDisc').value = '';
    document.getElementById('campoN1').value = '';
    document.getElementById('campoN2').value = '';
    document.getElementById('campoN3').value = '';
    document.getElementById('campoN4').value = '';
    alert("Nota cadastrada com sucesso!");
}

function atualizarTabelaProfessor() {
    const tbody = document.querySelector('#tabelaProf tbody');
    tbody.innerHTML = '';

    //Ordena por nome
    dadosEscola.sort((a, b) => a.nome.localeCompare(b.nome));
    
    //Total de Alunos
    const listaNomesUnicos = new Set(dadosEscola.map(d => d.nome.trim().toLowerCase()));
    let totalAlunosUnicos = listaNomesUnicos.size;

    //Contagem de Notas/Matérias
    let totalRegistros = dadosEscola.length;
    let notasAprovadas = dadosEscola.filter(d => d.situacao.includes('Aprovado')).length;
    let notasReprovadas = dadosEscola.filter(d => !d.situacao.includes('Aprovado')).length;

    //Atualiza os números no Dashboard
    document.getElementById('statTotal').innerText = totalAlunosUnicos;
    document.getElementById('statAprovados').innerText = notasAprovadas;
    document.getElementById('statReprovados').innerText = notasReprovadas;

    dadosEscola.forEach(dado => {
        let classeEtiqueta = '';
        if (dado.situacao === 'Aprovado') classeEtiqueta = 'etiqueta-aprovado';
        else if (dado.situacao === 'Recuperação') classeEtiqueta = 'etiqueta-recuperacao';
        else classeEtiqueta = 'etiqueta-reprovado';

        tbody.innerHTML += `
            <tr>
                <td>${dado.nome}</td>
                <td style="color:#666; font-size:0.8em;">${dado.senha}</td>
                <td>${dado.disciplina}</td>
                <td>${dado.media}</td>
                <td>${dado.freq}%</td>
                <td><span class="etiqueta ${classeEtiqueta}">${dado.situacao}</span></td>
                <td><button onclick="remover(${dado.id})" style="color:red; cursor:pointer; border:none; background:none;">🗑️</button></td>
            </tr>
        `;
    });
}

//Se o professor digitar um nome que já existe, a senha aparece sozinha
function verificarAlunoExistente() {
    const nomeDigitado = document.getElementById('campoNome').value.trim();
    const alunoExistente = dadosEscola.find(aluno => aluno.nome.toLowerCase() === nomeDigitado.toLowerCase());

    if (alunoExistente) {
        document.getElementById('campoSenha').value = alunoExistente.senha;
        document.getElementById('campoSenha').style.backgroundColor = "#e8f0fe";
    } else {
        document.getElementById('campoSenha').value = '';
        document.getElementById('campoSenha').style.backgroundColor = "white";
    }
}

function remover(id) {
    if(confirm('Excluir este registro?')) {
        dadosEscola = dadosEscola.filter(item => item.id !== id);
        salvarDadosLocais();
        atualizarTabelaProfessor();
    }
}

function limparTudo() {
    if(confirm('ATENÇÃO: Apagar todo o banco de dados?')) {
        dadosEscola = [];
        salvarDadosLocais();
        atualizarTabelaProfessor();
    }
}

//Exportar em forma de planilha para Excel
function exportarExcel() {
    //Cabeçalho da Planilha
    let csv = "Aluno;Senha;Disciplina;Nota 1;Nota 2;Nota 3;Nota 4;Média;Frequência;Situação\n";

    //Ordena por nome antes de exportar
    dadosEscola.sort((a, b) => a.nome.localeCompare(b.nome));

    dadosEscola.forEach(d => {
        csv += `${d.nome};${d.senha};${d.disciplina};${d.n1.toString().replace('.',',')};${d.n2.toString().replace('.',',')};${d.n3.toString().replace('.',',')};${d.n4.toString().replace('.',',')};${d.media.toString().replace('.',',')};${d.freq}%;${d.situacao}\n`;
    });

    //Cria um link invisível para baixar o arquivo
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    link.download = "Relatorio_Notas_Escolares.csv";
    link.click();
}

//Lógica do Login de Aluno
function entrarComoAluno() {
    const nomeInput = document.getElementById('loginAlunoNome').value.trim();
    const senhaInput = document.getElementById('loginAlunoSenha').value.trim();

    if (!nomeInput || !senhaInput) { 
        alert("Digite o nome e senha!");
        return;
    }

    const notasAluno = dadosEscola.filter(item =>
        item.nome.toLowerCase() === nomeInput.toLowerCase() &&
        item.senha === senhaInput
    );

    if (notasAluno.length === 0) {
        alert("Login falhou! Verifique se o nome ou a senha estão corretos.");
        return;
    }

    //Preenche o boletim do aluno
    document.getElementById('nomeAlunoLogado').innerText = notasAluno[0].nome;
    const tbody = document.getElementById('corpoTabelaAluno');
    tbody.innerHTML = '';

    notasAluno.forEach(dado => {
        let classeEtiqueta = '';
        if (dado.situacao === 'Aprovado') classeEtiqueta = 'etiqueta-aprovado';
        else if (dado.situacao === 'Recuperação') classeEtiqueta = 'etiqueta-recuperacao';
        else classeEtiqueta = 'etiqueta-reprovado';

        tbody.innerHTML += `
            <tr>
                <td><b>${dado.disciplina}</b></td>
                <td>${dado.n1}</td>
                <td>${dado.n2}</td>
                <td>${dado.n3}</td>
                <td>${dado.n4}</td>
                <td>${dado.media}</td>
                <td>${dado.freq}%</td>
                <td><span class="etiqueta ${classeEtiqueta}">${dado.situacao}</span></td>
            </tr>
        `;
    });
    navegarPara('tela-painel-aluno');
}

//Exportar boletim de cada aluno
function exportarBoletimAluno() {
    const nomeAluno = document.getElementById('nomeAlunoLogado').innerText;

    const notasAluno = dadosEscola.filter(aluno => 
        aluno.nome.toLowerCase() === nomeAluno.toLowerCase()
    );

    if (notasAluno.length === 0) {
        alert("Erro: Nenhuma nota encontrada para exportar.");
        return;
    }

    let csv = "Disciplina;Nota 1;Nota 2;Nota 3;Nota 4;Média;Frequência;Situação\n";

    notasAluno.forEach(d => {
        csv += `${d.disciplina};${d.n1.toString().replace('.',',')};${d.n2.toString().replace('.',',')};${d.n3.toString().replace('.',',')};${d.n4.toString().replace('.',',')};${d.media.toString().replace('.',',')};${d.freq}%;${d.situacao}\n`;
    });

    const nomeArquivo = `Boletim_${nomeAluno.replace(/\s+/g, '_')}.csv`;

    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    link.download = nomeArquivo;
    link.click();
}

//Função de pesquisa
function filtrarTabela() {
    const termo = document.getElementById('campoBusca').value.toLowerCase();
    const tabela = document.getElementById('tabelaProf');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 1; i < linhas.length; i++) {
        const colunaNome = linhas[i].getElementsByTagName('td')[0]; 
        
        if (colunaNome) {
            const textoNome = colunaNome.textContent || colunaNome.innerText;
            if (textoNome.toLowerCase().indexOf(termo) > -1) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}

//Gerar dados de teste
function gerarDadosTeste() {
    const baseId = Date.now();

    const dadosFicticios = [
        { id: baseId + 1, nome: "Gisele Silva", senha: "123", disciplina: "Matemática", n1: 8, n2: 7, n3: 6, n4: 8, media: "7.3", freq: 90, situacao: "Aprovado" },
        { id: baseId + 2, nome: "Bruno Souza", senha: "123", disciplina: "História", n1: 2, n2: 3, n3: 4, n4: 5, media: "3.5", freq: 80, situacao: "Reprovado (Nota)" },
        { id: baseId + 3, nome: "Carla Dias", senha: "123", disciplina: "Ciências", n1: 6, n2: 6, n3: 5, n4: 6, media: "5.8", freq: 95, situacao: "Recuperação" },
        { id: baseId + 4, nome: "Daniel Rocha", senha: "123", disciplina: "Geografia", n1: 9, n2: 9, n3: 10, n4: 9, media: "9.3", freq: 40, situacao: "Reprovado (Falta)" },
        { id: baseId + 5, nome: "Gisele Silva", senha: "123", disciplina: "Português", n1: 10, n2: 10, n3: 10, n4: 10, media: "10.0", freq: 100, situacao: "Aprovado" }
    ];

    if(confirm("Deseja carregar dados de teste? Isso vai facilitar sua apresentação!")) {
        dadosFicticios.forEach(d => dadosEscola.push(d));
        salvarDadosLocais();
        atualizarTabelaProfessor();
        alert("Dados carregados com sucesso!");
    }
}

function salvarDadosLocais() {
    localStorage.setItem('banco_dados', JSON.stringify(dadosEscola));
}