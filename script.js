function convertMoeda() {
    // Pegar os valores dos campos de entrada    
    const amount = document.getElementById("amount").value;
    const Origem = document.getElementById("Origem").value;
    const Destino = document.getElementById("Destino").value;

    // Verificar se o valor de entrada é válido
    if (!amount || amount <= 0) {
        alert("Valor inválido! Insira um valor válido.");
        return; // Retorna sem fazer a conversão se o valor for inválido
    }

    // Chamada da API para pegar a taxa de câmbio
    const apikey = "104656a2b460825533ec23ca";
    const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${Origem}`;

    // Faz a requisição para a API
    fetch(url)
        .then(response => response.json()) // Processa a resposta JSON
        .then(data => {
            const rate = data.conversion_rates[Destino]; // Acessa a taxa de conversão para o destino

            if (!rate) {
                alert("Moeda de destino inválida!");
                return; // Se a moeda de destino não estiver disponível, retorna
            }

            // Converte o valor
            const convertedAmount = (amount * rate).toFixed(2);

            // Exibe o resultado na tela
            document.getElementById("result").innerText = `Valor convertido: ${convertedAmount} ${Destino}`;
        })
        .catch(error => {
            console.error("Erro ao buscar os dados da API:", error); // Exibe o erro no console
            alert("Erro ao buscar os dados da API. Tente novamente mais tarde."); // Exibe um alerta para o usuário
        });
}

// "const" é usado para declarar variáveis que não serão reatribuídas
// "const rate" é usado para armazenar a taxa de câmbio