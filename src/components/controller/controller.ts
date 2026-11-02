import AppLoader from './appLoader';
import type { ArticlesResponseOk, SourcesResponseOk } from '../../types/api';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponseOk) => void): void {
        super.getResp<SourcesResponseOk>({ endpoint: 'sources' }, callback);
    }

    getNews(e: MouseEvent, callback: (data: ArticlesResponseOk) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        if (!target || !newsContainer) return;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<ArticlesResponseOk>(
                        {
                            endpoint: 'everything',
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
