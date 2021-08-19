import React, {useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
const alanKey = '63c07aa40e13352dceb0628bd7cc27c92e956eca572e1d8b807a3e2338fdd0dc/stage';

const App =() =>{
    const classes = useStyles();
    const [newsArticles,setNewArticles] = useState([]); 
    const [curArticle,setCurArticle] = useState(-1);
    const increment = () =>{
        setCurArticle(curArticle=>curArticle+1);
    }
    useEffect(()=>{
            alanBtn({
                key: alanKey,
                onCommand: ({command,articles,number}) =>{
                    if(command === 'newHeadlines'){
                       setNewArticles(articles);
                       setCurArticle(-1);
                    }
                    if(command === 'highlight'){
                        increment();
                    }
                    else if (command === 'open') {
                        const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                        const article = articles[parsedNumber - 1];
              
                        if (parsedNumber > articles.length) {
                          alanBtn().playText('Please try that again...');
                        } else if (article) {
                          window.open(article.url, '_blank');
                          alanBtn().playText('Opening...');
                        } else {
                          alanBtn().playText('Please try that again...');
                        }
                    }
                }
            })
        },[]);
        return (
            <div>
               <div className={classes.logoContainer}>
                    {newsArticles.length?
                    (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                    </div>
                    ) 
                    :null}
                    <img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
                </div>
               <NewsCards articles={newsArticles} curArticle={curArticle}/>
            </div>
        )
}

export default App