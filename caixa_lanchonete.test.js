
const CaixaDaLanchonete = require('./caixa_lanchonete');

describe('CaixaDaLanchonete', () => {
    let caixa;

    beforeEach(() => {
        caixa = new CaixaDaLanchonete();
    });

    it('calcula o valor da compra corretamente para pagamento em dinheiro', () => {
        const formaDePagamento = 'dinheiro';
        const itens = ['cafe,1', 'sanduiche,2'];
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('R$ 15.20');
    });

    it('calcula o valor da compra corretamente para pagamento com crédito', () => {
        const formaDePagamento = 'credito';
        const itens = ['suco,3', 'combo1,1'];
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('R$ 28.94');
    });

    it('retorna mensagem de forma de pagamento inválida', () => {
        const formaDePagamento = 'cheque'; // Forma de pagamento inválida
        const itens = ['cafe,1'];
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('Forma de pagamento inválida!');
    });

    it('retorna mensagem de item inválido', () => {
        const formaDePagamento = 'debito';
        const itens = ['pizza,2']; // Item não existe no cardápio
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('Item inválido!');
    });

    it('retorna mensagem de quantidade inválida', () => {
        const formaDePagamento = 'credito';
        const itens = ['cafe,0']; // Quantidade inválida
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('Quantidade inválida!');
    });

    it('retorna mensagem de item extra sem o principal', () => {
        const formaDePagamento = 'debito';
        const itens = ['chantily,1']; // Chantily não pode ser pedido sem café
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe('Item extra não pode ser pedido sem o principal');
    });

});
