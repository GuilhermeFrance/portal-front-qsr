export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface RequestRow {
  id: number;
  name: string;
  description: string;
  adress: string;
  typeId: number | null;
  type: Type | null;
  status: Status;
  statusKey: string;
  createdAt: Date;
  client: ClientModel | null;
  clientId: number | undefined;
}
export interface Type {
  id: number;
  name: string;
}
export interface Status {
  id: number;
  key: string;
  name: string;
}
export interface ClientModel {
  id?: number;
  firstName?: string;
  surname?: string;
  email: string;
  cpf?: string;
  password: string;
  badgesKey?: string;
  createdAt?: Date;
  profileUrl?: string;
  profileImageId?: number;
}
