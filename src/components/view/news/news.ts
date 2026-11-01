import './news.css';

function qs<T extends Element = Element>(root: ParentNode, selector: string): T {
    const el = root.querySelector<T>(selector);
    if (!el) {
        throw new Error(`Element not found: ${selector}`);
    }
    return el;
}

class News {
    draw(data) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
            qs<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            qs(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            qs(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            qs(newsClone, '.news__description-title').textContent = item.title;
            qs(newsClone, '.news__description-source').textContent = item.source.name;
            qs(newsClone, '.news__description-content').textContent = item.description;
            qs<HTMLAnchorElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsList = document.querySelector('.news');
        if (!newsList) return;
        newsList.innerHTML = '';
        newsList.appendChild(fragment);
    }
}

export default News;
