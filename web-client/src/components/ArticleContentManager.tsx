import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actions, useAppContext } from '../context/app-context';
import { LOCALE } from '../types';
import Article from '../model/Article';

import './ArticleContentManager.scss';
import { FAKE_ID, FAKE_LIST_ID } from '../model/ArticleInfo';

interface NotificationType {
  type?: string
  message?: string
};

const ArticleContentManager = ({ article }: { article: Article | null }): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [id, setId] = useState(article ? article.id : FAKE_ID);
  const [listId, setListId] = useState(article ? article.articleListId : FAKE_LIST_ID);
  const [locale, setLocale] = useState(article ? article.locale : LOCALE.en);
  const [title, setTitle] = useState(article ? article.title : '');
  const [author, setAuthor] = useState(article ? article.author : '');
  const [createAt, setCreateAt] = useState(article ? article.createAt.toISOString() : new Date().toISOString());
  const [visible, setVisible] = useState(article ? article.visible : true);
  const [content, setContent] = useState(article ? article.content : '');
  const [notification, setNotification] = useState<NotificationType>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setId(article ? article.id : FAKE_ID);
    setListId(state.listId);
    setLocale(article ? article.locale : state.locale);
    setTitle(article ? article.title : '');
    setAuthor(article ? article.author : '');
    setCreateAt(article ? article.createAt.toISOString() : new Date().toISOString());
    setVisible(article ? article.visible : true);
    setContent(article ? article.content : '');
  }, [article]);

  const updateArticle = async (createNewList: boolean): Promise<void> => {
    const payload: any = {
      locale,
      title,
      author,
      createAt,
      visible,
      content
    };
    let method = 'PUT';
    if (!id || id === FAKE_ID) {
      method = 'POST';
    } else {
      payload.id = id;
    }
    if (!listId || listId === FAKE_LIST_ID) {
      method = 'POST';
    } else {
      payload.articleListId = listId;
    }
    if (createNewList) {
      method = 'POST';
      delete payload.id;
      delete payload.articleListId;
    }
    const updateResp = await fetch('/api/admin/article/full', {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.jwt}`
      },
      body: JSON.stringify(payload)
    });
    if (updateResp.status !== 200) {
      navigate('/view-admin/login');
      return;
    }
    setNotification({
      type: 'success',
      message: !id || id === FAKE_ID
        ? `Success, article ${title} has been created!`
        : `Success, article ${title} has been updated!`
    });
  };

  const deleteArticle = async (): Promise<void> => {
    if (!id || id === FAKE_ID) {
      setNotification({
        type: 'warn',
        message: 'Warning, can not delete article without id'
      });
      return;
    }
    const deleteResp = await fetch(`/api/admin/article/full/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.jwt}`
      }
    });
    if (deleteResp.status !== 200) {
      navigate('/view-admin/login');
      return;
    }
    setNotification({
      type: 'success',
      message: `Success, article ${title} has been delete!`
    });
  };

  const uploadFile = async (): Promise<void> => {
    if (fileInputRef.current === null || fileInputRef.current.files === null || fileInputRef.current.files[0] === null) {
      setNotification({
        type: 'warn',
        message: 'can not get file, please select one'
      });
      return;
    }
    const uploadFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', uploadFile);
    try {
      const uploadResp = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.jwt}`
        },
        body: formData
      });
      const uploadRespJson = await uploadResp.json();
      console.log(121, uploadResp, uploadRespJson);
      if (uploadResp.ok) {
        setNotification({
          type: 'success',
          message: `Successfully uploaded file ${uploadFile.name}`
        });
      } else {
        setNotification({
          type: 'warn',
          message: `Failed to upload file ${uploadFile.name}`
        });
      }
    } catch (err) {
      console.log(131, err);
      setNotification({
        type: 'warn',
        message: 'Failed'
      });
    }
  };

  const handleLocaleChange = (value: string): void => {
    setLocale(value as LOCALE);
    dispatch({ type: Actions.UpdateLocale, data: { locale: value } });
  };

  return <div className='article-manager-container right-content-container'>
    <div className='row manage-item'>
      <label htmlFor='id'>ID</label>
      <input id='id' value={id} readOnly disabled/>
    </div>
    <div className='row manage-item'>
      <label htmlFor='list-id'>List ID</label>
      <input id='list-id' value={listId} readOnly disabled/>
    </div>
    <div className='row manage-item'>
      <label htmlFor='locale'>Locale</label>
      <select id='locale' value={locale} onChange={evt => handleLocaleChange(evt.target.value)}>
        {Object.keys(LOCALE).map(l => {
          return <option key={l} value={l}>{l}</option>;
        })}
      </select>
    </div>
    <div className='row manage-item'>
      <label htmlFor='title'>Title</label>
      <input id='title' value={title} onChange={evt => setTitle(evt.target.value)} />
    </div>
    <div className='row manage-item'>
      <label htmlFor='author'>Author</label>
      <input id='title' value={author} onChange={evt => setAuthor(evt.target.value)} />
    </div>
    <div className='row manage-item'>
      <label htmlFor='createAt'>CreateAt</label>
      <input id='createAt' value={createAt} onChange={evt => setCreateAt(evt.target.value)}/>
    </div>
    <div className='row manage-item'>
      <label htmlFor='visible'>Visible</label>
      <input id='visible' type='checkbox' checked={visible} onChange={evt => setVisible(evt.target.checked)}/>
    </div>
    <div className='row manage-item'>
      <label htmlFor='content'>Content</label>
      <textarea id='Content' value={content} onChange={evt => setContent(evt.target.value)} />
    </div>
    <div className='row buttons-container'>
      <button onClick={() => { void updateArticle(false); }}>{!id || id === FAKE_ID ? 'Create' : 'Update'}</button>
      <button onClick={() => { void updateArticle(true); }}>Create New List</button>
      <button onClick={() => { void deleteArticle(); }}>Delete</button>
    </div>
    <div>
      <input type='file' name='file' ref={fileInputRef} />
      <button onClick={() => { void uploadFile(); }}>Upload</button>
    </div>
    <div className='row notifications-container'>
      <p className={notification.type}>{notification.message}</p>
    </div>
  </div>;
};

export default ArticleContentManager;
