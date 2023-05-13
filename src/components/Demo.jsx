import { useState, useEffect } from 'react'

import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState ({
    url: '',
    summary: '',
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

      if (articlesFromLocalStorage) {
        setAllArticles(articlesFromLocalStorage)
      }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url});

    if(data?.summary) {
      const newArticle = {...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
   <section>
    <div>
      <form onSubmit={handleSubmit}>
        <img 
          src={linkIcon}
          alt="link_Icon"
        />

        <input 
          type="url"
          placeholder='Enter a URL' 
          value={article.url}
          onChange={(e) => setArticle({... article, url: e.target.value })}
          required
        />

        <button 
          type="submit"
        >
          ↵
        </button>
      </form>   


    </div>

    <div>
      {allArticles.map((item, index) => (
        <div
          key={`link-${index}`}
          onClick={() => setArticle(item)}
        >
          <div onClick={() => handleCopy(item.url)}>
            <img
              src={copy === item.url ? tick : copy}
              alt="copy_icon"
            />
            <p>
              {item.url}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div>
      {isFetching ? (
        <img src={loader} alt="loader"/>)
        : error ? (
          <p>
            Error...
            <br />
            <span>
              {error?.data?.error}
            </span>
          </p>
          )
        : ( article.summary && (
          <div>
            <h2>
              Article Summary
            </h2>
            <div>
              <>{article.summary}</>
            </div>
          </div>
        ))
      }
    </div>
   </section>
  );
}

export default Demo