class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let total = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            const precoItem = this.cardapio[codigo];

            if (!precoItem) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (codigo === 'chantily' && !itens.includes('cafe,1')) {
                return "Item extra não pode ser pedido sem o principal";
            }

            total += precoItem * quantidade;
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2)}`;
    }
}

module.exports = CaixaDaLanchonete;



const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); // Deve imprimir "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1','chantily,1'])); // Deve imprimir "R$ 4,50"
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,5'])); // Deve imprimir "R$ 15,96"

