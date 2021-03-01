import Head from 'next/head'
import Link from 'next/link'
import Login from '../components/Login'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title className='title'>Welcome to Tarot Journal Homepage ✨</title>
      </Head>
    
    
      <main className={styles.main}>
        <div className="max-w-6xl mx-auto px-5 py-24 ">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1  className={styles.title} className=" title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl"> Welcome to Tarot Journal ✨</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-base">
            Keep track of your thoughts and ask any question you want to generate a reading for🔮.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
        </div>
      </div>
  
      </main>

    </div>
  )
}
