import styles from './Item.module.scss';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle
} from 'react-icons/ai';
import {
  FaCartPlus
} from 'react-icons/fa';
import { mostraDescricao, mudarFavorito } from 'store/reducers/itens';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho';
import classNames from 'classnames';


const iconeProps = {
  size: 24,
  color: '#041833',
};

const quantidadeProps = {
  size: 32,
  color: "#Ff7102"
}

export default function Item(props) {
  const {
    titulo,
    foto,
    preco,
    descricao,
    favorito,
    id,
    mostra,
    carrinho,
    quantidade,
    mostraDesc
  } = props;
  const dispatch = useDispatch();

  function resolverFavorito() {
    dispatch(mudarFavorito(id));
  }

  function resolverDescricao() {
    setStateMostra(!stateMostra);
    dispatch(mostraDescricao(mostra, id));
  }
  // const isInCarForRemove = useSelector(state => state.carrinho)
  
  function resolverCarrinho() {
    // console.log("console do isCar", isInCarForRemove)
    // console.log("console do filter", isInCarForRemove.filter(item => item.id === id))
    dispatch(mudarCarrinho(id))
  }


  const estaNoCarrinho = useSelector(state => state.carrinho.some(item => item.id === id))


  // const removeLastItemInCar = () => {

  //   if(isInCarForRemove.length > 1 && isInCarForRemove.find(item => item.id)){
  //     return isInCarForRemove.pop()
  //   }
  // }

  const [stateMostra, setStateMostra] = useState(mostra)

  return (
    <div className={classNames(styles.item, {
      [styles.itemNoCarrinho]: carrinho,
    })}>
      <div className={styles['item-imagem']}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={classNames(styles['item-descricao'],
        [styles.itemNoCarrinhoDescricao]
      )}>
        <div className={styles['item-titulo']}>
          <h2>{titulo}</h2>
          {!mostraDesc
            ?
            <>
              <button type="button" onClick={resolverDescricao} className={styles.btnsaiba}>Saiba mais</button>
              {stateMostra ? <p style={{ height: "190px", padding: "10px", marginBottom: "25px" }}>{descricao}</p> : <p style={{ padding: "0" }}>{null}</p>}
            </>
            :
            <>
              <div style={{ padding: "23px" }}>

              </div>
            </>
          }

        </div>
        <div className={styles['item-info']}>
          <div className={styles['item-preco']}>
            R$ {preco.toFixed(2)}
          </div>
          <div className={styles['item-acoes']}>
            {favorito
              ? <AiFillHeart {...iconeProps} color='#ff0000' className={styles['item-acao']} onClick={resolverFavorito} />
              : <AiOutlineHeart {...iconeProps} className={styles['item-acao']} onClick={resolverFavorito} />
            }{carrinho
              ? (
                <div className={styles.quantidade}>
                  quantidade:
                  <AiFillMinusCircle {...quantidadeProps} onClick={() => {
                    if (quantidade >= 1) {
                      dispatch(mudarQuantidade({ id, quantidade: -1 }))
                    }
                  }
                  } />
                  <span>{String(quantidade || 0).padStart(2, "0")}</span>
                  <AiFillPlusCircle {...quantidadeProps} onClick={() => dispatch(mudarQuantidade({ id, quantidade: +1 }))} />
                </div>
              )
              : (
                <FaCartPlus
                  {...iconeProps}
                  color={estaNoCarrinho ? '#1875E8' : iconeProps.color}
                  className={styles['item-acao']}
                  onClick={resolverCarrinho
                    // !estaNoCarrinho ? resolverCarrinho : removeUltimo  

                  }
                />
              )

            }

          </div>
        </div>
      </div>
    </div>
  )
}