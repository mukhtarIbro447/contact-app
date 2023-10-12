export interface ContactState {
  isLoading: boolean;
    data?: ContactData[];
    error?: Error
}

export interface ContactData{
    createdAt: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    birthday: string;
    id: string
}