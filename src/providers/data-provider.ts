import {
  BaseRecord,
  CreateParams,
  CreateResponse,
  DataProvider,
  DeleteOneParams,
  DeleteOneResponse,
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from '@refinedev/core';
import { userProvider } from './user-provider';

export const dataProvider: DataProvider = {
  getList: async function <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> {
    const res = await userProvider.getActivities();
    switch (resource) {
      case 'activities':
        return {
          data: res as any,
          total: res.length,
        };

      default:
        throw new Error('Function not implemented.');
    }
  },
  getOne: function <TData extends BaseRecord = BaseRecord>(params: GetOneParams): Promise<GetOneResponse<TData>> {
    throw new Error('Function not implemented.');
  },
  create: function <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: CreateParams<TVariables>): Promise<CreateResponse<TData>> {
    throw new Error('Function not implemented.');
  },
  update: function <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> {
    throw new Error('Function not implemented.');
  },
  deleteOne: function <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> {
    throw new Error('Function not implemented.');
  },
  getApiUrl: function (): string {
    throw new Error('Function not implemented.');
  },
};
