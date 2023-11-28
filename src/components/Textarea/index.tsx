import styles from './styles.module.css'
import {HTMLProps} from 'react'

export function Textarea({...rest }: HTMLProps<HTMLTextAreaElement>){ //... rest ta tornando o textarea dinamico. pra pegar as informações escritas
    return <textarea className={styles.textarea} {...rest}></textarea>;
}