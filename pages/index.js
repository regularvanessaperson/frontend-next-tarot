import Head from 'next/head'
import Link from 'next/link'
import Login from '../components/Login'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to Tarot Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Tarot Journal Homepage lol
        </h1>

        
          <Link href="/user/food" as={'/user/food'} >
          <a> Yaas the party is food!</a>
        </Link>
        <Link href="/auth/login" as={'/auth/login'} >
          <a>Login</a>
        </Link>
        <Link href="/auth/register" as={'/auth/register'} >
          <a> Register</a>
          {/* <Register /> */}
        </Link>
  
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
