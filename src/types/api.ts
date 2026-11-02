// Ответы NewsAPI
// https://newsapi.org/docs/endpoints
// https://newsapi.org/docs/errors

export type NewsCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type NewsLanguage =
    'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';

export type NewsCountry =
    | 'ae'
    | 'ar'
    | 'at'
    | 'au'
    | 'be'
    | 'bg'
    | 'br'
    | 'ca'
    | 'ch'
    | 'cn'
    | 'co'
    | 'cu'
    | 'cz'
    | 'de'
    | 'eg'
    | 'fr'
    | 'gb'
    | 'gr'
    | 'hk'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'in'
    | 'it'
    | 'jp'
    | 'kr'
    | 'lt'
    | 'lv'
    | 'ma'
    | 'mx'
    | 'my'
    | 'ng'
    | 'nl'
    | 'no'
    | 'nz'
    | 'ph'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'sa'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'th'
    | 'tr'
    | 'tw'
    | 'ua'
    | 'us'
    | 've'
    | 'za';

/** Источник новостей (endpoint /sources) */
export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: NewsCategory;
    language: NewsLanguage;
    country: NewsCountry;
}

/** Одна статья (endpoint /everything и /top-headlines) */
export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601
    content: string | null;
}

/** Коды ошибок NewsAPI — фиксированный список */
export type ApiErrorCode =
    | 'apiKeyDisabled'
    | 'apiKeyExhausted'
    | 'apiKeyInvalid'
    | 'apiKeyMissing'
    | 'parameterInvalid'
    | 'parametersMissing'
    | 'rateLimited'
    | 'sourcesTooMany'
    | 'sourceDoesNotExist'
    | 'unexpectedError';

/** Успешный ответ /sources */
export interface SourcesResponseOk {
    status: 'ok';
    sources: Source[];
}

/** Успешный ответ /everything и /top-headlines */
export interface ArticlesResponseOk {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

/** Ответ с ошибкой (любой endpoint) */
export interface ApiErrorResponse {
    status: 'error';
    code: ApiErrorCode;
    message: string;
}

/** Полные ответы — discriminated union по status */
export type SourcesResponse = SourcesResponseOk | ApiErrorResponse;
export type ArticlesResponse = ArticlesResponseOk | ApiErrorResponse;
