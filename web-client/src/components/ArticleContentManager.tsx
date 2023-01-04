import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actions, useAppContext } from '../context/app-context';
import { LOCALE } from '../types';
import Article from '../model/Article';

import { FAKE_ID, FAKE_LIST_ID } from '../model/ArticleInfo';
import { isAccessTokenValid } from '../utils';

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
    const jwt = state.jwt;
    if (!isAccessTokenValid(jwt)) {
      navigate('/view-admin/login');
      return;
    }
    const updateResp = await fetch('/api/admin/article/full', {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
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

  const getNotificationJSX = (notification: NotificationType): JSX.Element => {
    let color = 'text-green-600';
    switch (notification.type) {
      case 'success': {
        color = 'text-green-600';
        break;
      }
      case 'warn': {
        color = 'text-orange-600';
        break;
      }
      case 'error': {
        color = 'text-red-600';
        break;
      }
      default:
        break;
    }
    return <p className={`${color} mx-3`}>{notification.message}</p>;
  };

  const handleLocaleChange = (value: string): void => {
    setLocale(value as LOCALE);
    dispatch({ type: Actions.UpdateLocale, data: { locale: value } });
  };

  const rowBaseClass = 'flex mx-2.5 my-1 align-center';
  const inputBaseClass = `px-1 py-1 text-base text-gray-700 font-normal bg-white bg-clip-padding
    border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
    focus:bg-white focus:border-blue-600 focus:outline-none`;
  const buttonBaseClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-3';

  return <div className='bg-floralwhite w-full article-manager-container'>
    <div className={rowBaseClass}>
      <label htmlFor='id' className='basis-[80px]'>ID</label>
      <input id='id' value={id} className={`w-[calc(100%-120px)] ${inputBaseClass}`} readOnly disabled/>
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='list-id' className='basis-[80px]'>List ID</label>
      <input id='list-id' value={listId} className={`w-[calc(100%-120px)] ${inputBaseClass}`} readOnly disabled/>
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='locale' className='basis-[80px]'>Locale</label>
      <select id='locale' value={locale} className={`w-[calc(100%-120px)] ${inputBaseClass}`} onChange={evt => handleLocaleChange(evt.target.value)}>
        {Object.keys(LOCALE).map(l => {
          return <option key={l} value={l}>{l}</option>;
        })}
      </select>
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='title' className='basis-[80px]'>Title</label>
      <input id='title' value={title} className={`w-[calc(100%-120px)] ${inputBaseClass}`} onChange={evt => setTitle(evt.target.value)} />
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='author' className='basis-[80px]'>Author</label>
      <input id='title' value={author} className={`w-[calc(100%-120px)] ${inputBaseClass}`} onChange={evt => setAuthor(evt.target.value)} />
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='createAt' className='basis-[80px]'>CreateAt</label>
      <input id='createAt' value={createAt} className={`w-[calc(100%-120px)] ${inputBaseClass}`} onChange={evt => setCreateAt(evt.target.value)}/>
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='visible' className='basis-[80px]'>Visible</label>
      <input id='visible' type='checkbox' checked={visible} className={inputBaseClass} onChange={evt => setVisible(evt.target.checked)}/>
    </div>
    <div className={rowBaseClass}>
      <label htmlFor='content' className='basis-[80px]'>Content</label>
      <textarea id='Content' value={content} className={`w-[calc(100%-120px)] h-[400px] ${inputBaseClass}`} onChange={evt => setContent(evt.target.value)} />
    </div>
    <div className={rowBaseClass}>
      <button className={buttonBaseClass} onClick={() => { void updateArticle(true); }}>Create New List</button>
      <button className={buttonBaseClass} onClick={() => { void updateArticle(false); }}>{!id || id === FAKE_ID ? 'Create' : 'Update'}</button>
      <button className={buttonBaseClass} onClick={() => { void deleteArticle(); }}>Delete</button>
    </div>
    <div className={rowBaseClass}>
      <input className={buttonBaseClass} type='file' name='file' ref={fileInputRef} />
      <button className={buttonBaseClass} onClick={() => { void uploadFile(); }}>Upload</button>
    </div>
    <div className={rowBaseClass}>
      {getNotificationJSX(notification)}
    </div>
  </div>;
};

export default ArticleContentManager;
