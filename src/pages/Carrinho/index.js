import styles from "./Carrinho.module.scss";
import Header from "../../components/Header/index";
import { useSelector, useDispatch } from "react-redux";
import Item from "components/Item";
import { resetarCarrinho } from "store/reducers/carrinho";


export default function Carrinho() {
    const dispatch = useDispatch();

    const { carrinho, total } = useSelector(state => {
        let total = 0;
        const regexp = new RegExp(state.busca, 'i');
        const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
            const item = state.itens.find(item => item.id === itemNoCarrinho.id);
            total += (item.preco * itemNoCarrinho.quantidade);
            if (item.titulo.match(regexp)) {
                itens.push({
                    ...item,
                    quantidade: itemNoCarrinho.quantidade,
                });
            }
            return itens;
        }, [])
        return {
            carrinho: carrinhoReduce,
            total,
        };
    })


    return (
        <div>
            <Header
                titulo={"Carrinho de compras"}
                descricao={"Confira os produtos que você selecionou"}
            />

            <div className={styles.carrinho}>
                {carrinho.length > 0 ?

                    <> {carrinho.map(item => <Item key={item.id} {...item} carrinho mostraDesc />)}

                        <div className={styles.total}>
                            <strong> Resumo da compra </strong>
                            <span>Subtotal: {total.toFixed(2)} </span>
                        </div>
                    </> :

                    <div className={styles.carrinhoVazio}>
                        <strong> Você ainda nao adicionou produtos ao seu carrinho </strong>
                        <span>Volte as compras estaremos a disposição</span>
                    </div>
                }
                {carrinho.length > 0
                    ?
                    <>
                        <button
                            className={styles.finalizar}
                            onClick={() => dispatch(resetarCarrinho())}
                        >
                            Finalizar compra
                        </button>
                    </>
                    :

                    <>

                    </>

                }

            </div>

        </div>
    )
}