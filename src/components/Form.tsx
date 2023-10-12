import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ContactData } from 'redux/types/contacts';

interface OwnProps {
  onSubmit: (values: ContactData) => void;
  isNew: boolean;
  contacts?: ContactData;
}
const Form = ({ onSubmit, isNew, contacts }: OwnProps) => {
  const { handleSubmit, register, reset } = useForm<ContactData>({
    defaultValues: contacts,
  });

  useEffect(() => {
    reset(contacts);
  }, [contacts]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <label htmlFor="avatar">Avatar</label>
        <input {...register('avatar')} id="avatar" placeholder="Avatar" />
        <label htmlFor="name">Name</label>
        <input {...register('name')} id="name" placeholder="Name" />
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" placeholder="Email" />
        <label htmlFor="phone">Phone</label>
        <input {...register('phone')} id="phone" placeholder="Phone" />
        <button type="submit">{isNew ? 'Save' : 'Update'}</button>
      </form>
    </div>
  );
};

export default Form;
