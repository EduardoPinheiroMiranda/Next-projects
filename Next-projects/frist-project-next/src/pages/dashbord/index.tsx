import Head from "next/head";
import styles from "./styles.module.css";


export default function Dashboard(){
    return(
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <h1>Pagina painel</h1>
            <h2>Teste de paginas</h2>
        </div>
    );
}