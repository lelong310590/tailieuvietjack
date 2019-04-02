export const BASE_URL = process.env.REACT_APP_API_URL;

export const API_POST_FACEBOOK_LOGIN = BASE_URL + 'auth/login/facebook';
export const API_POST_GOOGLE_LOGIN = BASE_URL + 'auth/login/google';

export const API_LOGIN = BASE_URL + 'auth/login';
export const API_SEND_RESET_PASSWORD_EMAIL = BASE_URL + 'auth/send-reset-email';
export const API_SEND_RESET_PASSWORD = BASE_URL + 'auth/send-reset-password';
export const API_GET_USER = BASE_URL + 'user/profile';
export const API_GET_USER_DOCUMENT = BASE_URL + 'user/document';
export const API_POST_DELETE_DOCUMENT = BASE_URL + 'doc/delete';
export const API_REGISTER = BASE_URL + 'auth/register';
export const API_UPDATE_USER = BASE_URL + 'user/update';

export const API_GET_AUTHOR = BASE_URL + 'user/get-author-info';

export const API_GET_TREE = BASE_URL + 'tree-data';
export const API_GET_TAGCLOUD = BASE_URL + 'tag-cloud';
export const API_GET_TAG_FOOTER = BASE_URL + 'tag/get-tag-by-cat';
export const API_GET_DOCUMENT_BY_TAG = BASE_URL + 'tag/get-document-by-tag';

export const API_GET_CLASS_IN_GRADE = BASE_URL + 'class-via-grade';

export const API_GET_MENU = BASE_URL + 'class/get-all-class';
export const API_GET_CLASSES = BASE_URL + 'class/get';
export const API_GET_SUBJECTS = BASE_URL + 'subject/all-subject';
export const API_GET_SUBJECT_VIA_CLASSES = BASE_URL + 'class/get-subject-via-class';
export const API_GET_LIST_SUBJECT_VIA_CLASSES = BASE_URL + 'class/get-list-subject-via-class';

export const API_GET_CHAPTER = BASE_URL + 'chapter/get';
export const API_GET_LIST_CHAPTER = BASE_URL + 'chapter/get-list-chapter';

export const API_GET_THEMATIC = BASE_URL + 'thematic/get';
export const API_GET_DOC_IN_THEMATIC = BASE_URL + 'thematic/get-document';

export const API_LIST_DOC = BASE_URL + 'doc';
export const API_UPLOAD_DOC = BASE_URL + 'doc/upload';
export const API_GET_AUTOCOMPLETE_TAG = BASE_URL + 'tag/get-autocomplete-tag';
export const API_UPDATE_DOC_AFTER_UPLOAD = BASE_URL + 'doc/update-doc';
export const API_GET_DOC_INFO = BASE_URL + 'doc/get-info';
export const API_GET_LIST_DOC_BY_CAT = BASE_URL + 'doc/get-doc-by-cat';
export const API_GET_DOC_DETAIL = BASE_URL + 'doc/doc-detail';
export const API_GET_RELATED_DOC = BASE_URL + 'doc/get-related-doc';
export const API_GET_MOST_VIEW_BY_WEEK = BASE_URL + 'doc/most-view-by-week';

export const API_GET_DOCUMENT_IN_CAT = BASE_URL + 'class/document-in-class';

export const API_UPDATE_DOC_STATIC = BASE_URL + 'doc/update-static';

export const API_GET_PRICE = BASE_URL + 'get-price';

export const API_GET_HOME_LIST = BASE_URL + 'get-document-by-subject';

export const API_GET_POST = BASE_URL + 'post/get-post-detail';

export const API_DOWNLOAD_DOCUMENT = BASE_URL + 'download';
export const API_GET_FILE_DOWNLOAD = BASE_URL + 'get-downloaded-document';

export const API_POST_REPORT_DOCUMENT = BASE_URL + 'contact/report-document';

// Filterbar
export const API_FILTER_BAR_CLASS = BASE_URL + 'class/get-class-filter-bar';
export const API_FILTER_BAR_DOC_TYPE = BASE_URL + 'doc/type';
export const API_FILTER_BAR_CHAPTER = BASE_URL + 'chapter/get-chapter';
export const API_FILTER_BAR_SUBJECT = BASE_URL + 'subject/get-subject';

export const GET_META_DATA = BASE_URL + 'get-meta-data';
//comment
export const API_GET_COMMENT_LIST = BASE_URL + 'comment/get-comment';
export const API_POST_COMMENT = BASE_URL + 'comment/post-comment';