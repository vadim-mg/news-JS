import News from './news/news';
import Sources from './sources/sources';
import type { Article, Source } from '../../types/api';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: { articles: Article[] }): void {
        this.news.draw(data.articles);
    }

    drawSources(data: { sources: Source[] }): void {
        this.sources.draw(data.sources);
    }
}

export default AppView;
