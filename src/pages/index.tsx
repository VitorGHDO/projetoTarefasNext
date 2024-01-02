import Image from 'next/image';
import styles from "../styles/home.module.css"
import { Inter } from 'next/font/google';

import heroImg from '../../public/assets/hero.png'
import { GetStaticProps } from 'next';

import { db } from '../services/firebaseConnections'
import {collection, getDocs} from 'firebase/firestore'


const inter = Inter({ subsets: ['latin'] })

interface HomeProps{
  post: number,
  comment: number,
}

export default function Home({post, comment}: HomeProps) {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt='Logo Tarefas'
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{post} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comment} comentários</span>
          </section>
        </div>
      </main>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //Buscar do banco os números e enviar para o componente
  const commentRef = collection (db, "comments")
  const postRef = collection(db, 'tarefas')

  const commentSnapshot = await getDocs(commentRef)
  const postSnapshot = await getDocs(postRef)

  return {
    props: {
      posts: 0,
      post: postSnapshot.size || 0,
      comment: commentSnapshot.size || 0
    },
    revalidate: 60, // será revalidado a cada 60 segundos
  }
}