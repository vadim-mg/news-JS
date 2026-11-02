import './news.css';
import type { Article } from '../../../types/api';

function qs<T extends Element = HTMLElement>(root: ParentNode, selector: string): T {
    const el = root.querySelector<T>(selector);
    if (!el) {
        throw new Error(`Element not found: ${selector}`);
    }
    return el;
}

class News {
    draw(data: Article[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = qs<HTMLTemplateElement>(document, '#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                qs(newsClone, '.news__item').classList.add('alt');
            }

            qs(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
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

        qs(document, '.news').replaceChildren(fragment);
    }
}

export default News;
