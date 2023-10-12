import { ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Service from 'api/service';
import { useDispatch, useSelector } from 'redux/store';
import Form from './Form';
import { ContactData } from 'redux/types/contacts';

const ContactCard = () => {
  const [showMore, setShowMore] = useState<string>();
  const [isEdit, setIsEdit] = useState<string>();
  const [isNew, setIsNew] = useState<boolean>(false);
  const dispatch = useDispatch();
  // I could use useState and fetch to get the data instead of redux.
  const { data, isLoading, error } = useSelector((state) => state.contact);
  const [contacts, setContacts] = useState(data);

  useEffect(() => {
    dispatch(Service.getContacts());
  }, []);
  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  const handleShowMore = (id: string) => {
    setShowMore(showMore === id ? undefined : id);
  };
  const handleIsEdit = (id: string) => {
    setIsEdit(isEdit === id ? undefined : id);
    if (isNew) setIsNew(false);
    window.scrollTo(0, 0);
  };
  const createNewContact = () => {
    setIsNew(!isNew);
    if (isEdit) setIsEdit(undefined);
  };

  const handleOnSubmit = async (values: ContactData) => {
    if (isNew) {
      const action = await dispatch(Service.createContact(values));
      if (Service.createContact.fulfilled.match(action)) {
        dispatch(Service.getContacts());
      }
    } else {
      values.id = isEdit || '';
      setIsEdit(undefined);
      const action = await dispatch(Service.updateContact(values));
      if (Service.updateContact.fulfilled.match(action)) {
        dispatch(Service.getContacts());
      }
    }
  };

  const handleDelete = async (id: string) => {
    const action = await dispatch(Service.deleteContact(id));
    if (Service.deleteContact.fulfilled.match(action)) {
      dispatch(Service.getContacts());
    }
  };
  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setContacts(data?.filter((f) => f.name?.toLowerCase().search(e.target.value?.toLowerCase()) > -1));
  }, 1000);

  if (isLoading) return <span>Loading....</span>;

  return (
    <>
      <div className="top">
        <div className="search-container">
          <label htmlFor="search" style={{ marginTop: '6px', marginRight: '8px' }}>
            Search:
          </label>
          <input
            style={{ padding: '8px', minWidth: '150px', width: '100%' }}
            type="text"
            id="search"
            name="Search"
            placeholder="Search"
            onChange={handleSearch}
          />
          <a className="search" style={{ marginTop: '4px' }} data-toggle="tooltip" onClick={() => handleSearch}>
            <i className="p-button material-icons">search</i>
          </a>
        </div>
        <button className="create-button" data-toggle="tooltip" onClick={createNewContact}>
          Create new contact
        </button>
      </div>
      {(isNew || isEdit) && (
        <Form
          onSubmit={handleOnSubmit}
          isNew={isNew}
          contacts={isEdit ? data?.find((p) => p.id === isEdit) : undefined}
        />
      )}

      <section className="section">
        {Array.isArray(contacts) &&
          contacts.map((p) => (
            <article key={p.id}>
              <div className="p-button content" onClick={() => handleShowMore(p.id)}>
                <figure>
                  <img src={p.avatar} alt={p.name} style={{ width: '100%', height: '100%' }} />
                </figure>
                <div className="detail">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <h4>{p.name}</h4>
                      <span className="material-icons"> {`${showMore === p.id ? 'expand_less' : 'expand_more'}`} </span>
                    </div>

                    {showMore === p.id && (
                      <div>
                        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
                          <li>
                            <strong>Created Date: </strong>
                            {new Date(p.createdAt).toLocaleString()}
                          </li>
                          <li>
                            <strong>Email: </strong>
                            {p.email}
                          </li>
                          <li>
                            <strong>Phone: </strong>
                            {p.phone}
                          </li>
                          <li>
                            <strong>Birth date: </strong>
                            {new Date(p.birthday).toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ gap: '5px', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <a className="edit" data-toggle="tooltip" onClick={() => handleIsEdit(p.id)}>
                  <i className="p-button material-icons">edit</i>
                </a>
                <a className="delete" data-toggle="tooltip" onClick={() => handleDelete(p.id)}>
                  <i className="p-button material-icons">delete</i>
                </a>
              </div>
            </article>
          ))}
      </section>
    </>
  );
};

export default ContactCard;
