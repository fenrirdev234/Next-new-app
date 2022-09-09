import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout'


export default function Home({ articles }) {
  return (
    <PageLayout
      title="NewsApp-Home"
    >
      <div className={styles.container}>

        {
          articles.length === 0 && <p>No tenemos articulos </p>
        }
        {articles.length > 0 && articles.map((art, index) => {
          return (
            <article key={index}>
              <Image src={art.urlToImage} alt={`Image for the article ${art.title}`}
                width={450}
                height={300}
                layout={"responsive"}
              /* placeholder="blur" */
              />

              <h2>
                {art.title}
              </h2>
              <p>
                {art.description}
              </p>
            </article>
          )
        })}

      </div>
    </PageLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b4c0ffd4b83a47abbc256f60ed330234")

  const { articles } = await response.json()

  return {
    props: {
      articles
    }
  }
}
/* export async function getStaticProps() {
  const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-08-08&sortBy=publishedAt&apiKey=b4c0ffd4b83a47abbc256f60ed330234")

  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }
} */