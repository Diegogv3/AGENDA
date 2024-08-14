banana = 2;
mamao = 2222;
banana = 2131231;
biancaa = 1;

// Executa a função quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de contato pelo ID
    const formContato = document.getElementById('contact-form');
    // Seleciona a lista de contatos pelo ID
    const listaContatos = document.getElementById('contact-list');
    // Seleciona o campo de pesquisa pelo ID
    const inputPesquisa = document.getElementById('search');

    // Carrega os contatos do localStorage ou inicializa com uma lista vazia
    let contatos = JSON.parse(localStorage.getItem('contacts')) || [];

    // Função para salvar os contatos no localStorage
    const salvarContatos = () => {
        localStorage.setItem('contacts', JSON.stringify(contatos));
    };

    // Função para renderizar a lista de contatos na tela
    const renderizarContatos = () => {
        // Limpa a lista de contatos
        listaContatos.innerHTML = '';
        // Itera sobre cada contato na lista
        contatos.forEach((contato, index) => {
            // Cria um elemento de lista para cada contato
            const li = document.createElement('li');
            // Define o HTML do elemento de lista
            li.innerHTML = `
                ${contato.name} - ${contato.phone} - ${contato.email}
                <div>
                    <button class="edit" onclick="editarContato(${index})">Editar</button>
                    <button onclick="excluirContato(${index})">Excluir</button>
                </div>
            `;
            // Adiciona o elemento de lista à lista de contatos
            listaContatos.appendChild(li);
        });
    };

    // Função para resetar o formulário
    const resetarFormulario = () => {
        // Limpa o campo de ID do formulário
        document.getElementById('contact-id').value = '';
        // Limpa o campo de nome do formulário
        document.getElementById('name').value = '';
        // Limpa o campo de telefone do formulário
        document.getElementById('phone').value = '';
        // Limpa o campo de e-mail do formulário
        document.getElementById('email').value = '';
    };

    // Adiciona um listener de evento para o envio do formulário
    formContato.addEventListener('submit', (e) => {
        // Previne o comportamento padrão de submissão do formulário
        e.preventDefault();

        // Obtém o valor do campo de ID do formulário
        const id = document.getElementById('contact-id').value;
        // Obtém o valor do campo de nome do formulário
        const name = document.getElementById('name').value;
        // Obtém o valor do campo de telefone do formulário
        const phone = document.getElementById('phone').value;
        // Obtém o valor do campo de e-mail do formulário
        const email = document.getElementById('email').value;

        // Verifica se um ID está presente (atualização de contato existente)
        if (id) {
            // Atualiza o contato existente
            contatos[id] = { name, phone, email };
        } else {
            // Adiciona um novo contato
            contatos.push({ name, phone, email });
        }

        // Salva os contatos no localStorage
        salvarContatos();
        // Renderiza a lista de contatos novamente
        renderizarContatos();
        // Reseta o formulário
        resetarFormulario();
    });

    // Função para editar um contato
    window.editarContato = (index) => {
        // Obtém o contato a ser editado pelo índice
        const contato = contatos[index];
        // Define o campo de ID do formulário com o índice do contato
        document.getElementById('contact-id').value = index;
        // Preenche o campo de nome do formulário com o valor do contato
        document.getElementById('name').value = contato.name;
        // Preenche o campo de telefone do formulário com o valor do contato
        document.getElementById('phone').value = contato.phone;
        // Preenche o campo de e-mail do formulário com o valor do contato
        document.getElementById('email').value = contato.email;
    };

    // Função para excluir um contato
    window.excluirContato = (index) => {
        // Remove o contato da lista pelo índice
        contatos.splice(index, 1);
        // Salva os contatos no localStorage
        salvarContatos();
        // Renderiza a lista de contatos novamente
        renderizarContatos();
    };

    // Adiciona um listener de evento para o campo de pesquisa
    inputPesquisa.addEventListener('input', (e) => {
        // Obtém o valor digitado no campo de pesquisa e converte para minúsculas
        const valor = e.target.value.toLowerCase();
        // Filtra os contatos que correspondem ao valor da pesquisa
        const contatosFiltrados = contatos.filter(contato => 
            contato.name.toLowerCase().includes(valor) ||
            contato.phone.toLowerCase().includes(valor) ||
            contato.email.toLowerCase().includes(valor)
        );

        // Limpa a lista de contatos
        listaContatos.innerHTML = '';
        // Renderiza apenas os contatos filtrados
        contatosFiltrados.forEach((contato, index) => {
            // Cria um elemento de lista para cada contato filtrado
            const li = document.createElement('li');
            // Define o HTML do elemento de lista
            li.innerHTML = `
                ${contato.name} - ${contato.phone} - ${contato.email}
                <div>
                    <button class="edit" onclick="editarContato(${index})">Editar</button>
                    <button onclick="excluirContato(${index})">Excluir</button>
                </div>
            `;
            // Adiciona o elemento de lista à lista de contatos
            listaContatos.appendChild(li);
        });
    });

    // Renderiza a lista de contatos inicialmente ao carregar a página
    renderizarContatos();
});