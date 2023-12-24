import { GetServerSideProps } from 'next'
import styles from './styles.module.css'
import Head from 'next/head'
import { ChangeEvent, FormEvent, useState } from 'react'

import {getSession} from 'next-auth/react'
import { Textarea } from '../../components/Textarea'
import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'

import {} from '../../services/firebaseConnections'

import {addDoc, collection} from 'firebase/firestore'

export default function Dashboard(){

    const [input, setInput] = useState('')
    const [publicTask, setPublicTask] = useState(false)

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>){
        setPublicTask(event.target.checked)
    }

    function handleRegisterTask(event: FormEvent){
        event.preventDefault(); 

        if(input === '') return;
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa?</h1>

                        <form onSubmit={handleRegisterTask}>
                            <Textarea
                                placeholder='Digite sua tarefa' //só é possível isso por conta do dinamismo do ...rest
                                value={input}
                                onChange={ (event:ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)} //pegando todas as alterações no textarea e armazenando no setInput
                                //          isso é uma tipagem para passar para o event que ele é do textArea
                            />
                            <div className={styles.checkboxArea}>
                                <input 
                                    type="checkbox" 
                                    className={styles.checkbox} 
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
                                <label>Deixar tarefa pública?</label>
                            </div>

                            <button className={styles.button} type='submit'> Registrar </button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas tarefas</h1>
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>PÚBLICO</label>
                            <button className={styles.shareButton}>
                                <FiShare2
                                    size={22}
                                    color='#3183FF'
                                />
                            </button>
                        </div>

                        <div className={styles.taskContent}>
                            <p>Minha primeira tarefa de exemplo</p>
                            <button className={styles.trashButton}>
                                <FaTrash
                                    size={24}
                                    color='#EA3140'
                                />
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

//estamos do lado do servidor, ou seja, renderiza bem antes aqui
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    // console.log(session);

    if(!session?.user){
        //Se não tem usuario, redirecionar para '/'
        return{
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {} //so pra n acusar erro
    }
}